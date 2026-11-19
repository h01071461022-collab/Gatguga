/* =========================================================
   app.js — 화면 전환, 설문, 결과 계산, 공유
   PRODUCTS / CATEGORIES / LABELS 등은 data.js에 있어요.
   ========================================================= */
const $ = id => document.getElementById(id);
const form = $("quiz");
const QUESTIONS = ["size", "budget", "use", "move"];

/* 추천 매트리스 크기 */
function bedSize(a) {
  if (a.size === "s") return { value: "싱글", sub: "폭 약 100cm" };
  if (a.size === "unknown") return { value: "슈퍼싱글", sub: "방을 재 보고 확정" };
  return { value: "슈퍼싱글", sub: "폭 약 110cm" };
}

/* 공부 위주면 책상·의자도 첫날로, 아니면 나중으로 */
function isFirstDay(cat, a) {
  if (a.use === "study" && (cat.key === "책상" || cat.key === "의자")) return true;
  return cat.firstDay;
}

function scoreOf(p, a) {
  let s = 0;
  for (const [q, table] of Object.entries(p.score || {})) s += table[a[q]] || 0;
  return s;
}

/* 이 상품을 고른 이유: 점수를 가장 많이 준 답 1~2개 */
function becauseOf(p, a) {
  const parts = Object.entries(p.score || {})
    .map(([q, table]) => ({ q, pts: table[a[q]] || 0 }))
    .filter(x => x.pts > 0)
    .sort((x, y) => y.pts - x.pts)
    .slice(0, 2)
    .map(x => REASON[x.q][a[x.q]]);
  return parts.length ? parts.join(", ") : "가장 무난한 선택이라서";
}

function picksFor(category, a) {
  return PRODUCTS
    .filter(p => p.category === category)
    .map(p => Object.assign({}, p, { s: scoreOf(p, a) }))
    .sort((x, y) => y.s - x.s);
}

function priceText(p) {
  if (p.priceMin == null) return "가격 조사 중";
  return p.priceMin === p.priceMax ? `약 ${p.priceMin}만 원` : `${p.priceMin}~${p.priceMax}만 원`;
}

function slotHTML(cat, a, total) {
  const alloc = Math.round(total * BUDGET_SPLIT[a.use][cat.budgetKey] / 100);
  const head = `
    <div class="slot-head">
      <span class="cat">${cat.key}</span>
      <span class="alloc">배정 예산 <b>${alloc}만 원</b></span>
    </div>`;

  const list = picksFor(cat.key, a);
  if (list.length === 0) {
    return `<div class="slot pending">${head}
      <div class="pick">검증한 상품을 준비하고 있어요. 지금 직접 찾는다면 ${alloc}만 원 안에서 리뷰 많은 상품부터 보세요.</div>
    </div>`;
  }

  const [best, ...rest] = list;
  const over = best.priceMin != null && best.priceMin > alloc;
  const tags = [
    best.folding ? '<span class="tag ok">접이식</span>' : "",
    best.easyMove ? '<span class="tag ok">이사 쉬움</span>' : "",
    ...best.tags.map(t => `<span class="tag">${t}</span>`)
  ].join("");

  const alts = rest.slice(0, 2).map(p => `
    <div class="alt">
      <div>
        <div class="role">${p.role} 대안</div>
        <div class="name">${p.name}</div>
        <div class="why">${priceText(p)} · ${p.why}</div>
      </div>
      <a href="${p.link || "#"}" class="${p.link ? "" : "disabled"}" target="_blank" rel="sponsored noopener">${p.link ? "보기" : "준비 중"}</a>
    </div>`).join("");

  return `<div class="slot">${head}
    <div class="pick">
      <div class="pick-top">
        <div class="thumb">사진</div>
        <div>
          <span class="badge">나에게 가장 맞음</span>
          <h4>${best.name}</h4>
          <div class="price">${priceText(best)}${over ? ` · <span class="price-warn">배정 예산보다 조금 높아요</span>` : ""}</div>
        </div>
      </div>
      <p class="because"><b>${becauseOf(best, a)}</b> 골랐어요. ${best.why}</p>
      ${tags ? `<div class="tags">${tags}</div>` : ""}
      ${best.flaw ? `<p class="flaw"><b>알고 사세요:</b> ${best.flaw}</p>` : ""}
      <a class="go ${best.link ? "" : "disabled"}" href="${best.link || "#"}" target="_blank" rel="sponsored noopener">
        ${best.link ? "쿠팡에서 가격 보기" : "링크 준비 중"}
      </a>
    </div>
    ${alts ? `<details class="alts"><summary>다른 선택지 ${rest.slice(0, 2).length}개</summary>${alts}</details>` : ""}
  </div>`;
}

function render(a) {
  const total = BUDGET_AMOUNT[a.budget];
  const split = BUDGET_SPLIT[a.use];

  // 1. 머리말
  $("heroTitle").textContent =
    `${LABELS.size[a.size]} 방에서 ${LABELS.use[a.use].split("·")[0]} 위주로 지낼 당신을 위한 세트`;
  $("chips").innerHTML =
    QUESTIONS.map(q => `<span class="chip">${LABELS[q][a[q]]}</span>`).join("") +
    `<button type="button" class="chip-edit" id="chipEdit">답 바꾸기</button>`;
  $("chipEdit").addEventListener("click", showQuiz);

  // 2. 핵심 숫자
  const first = CATEGORIES.filter(c => isFirstDay(c, a));
  const later = CATEGORIES.filter(c => !isFirstDay(c, a));
  const bed = bedSize(a);
  const sumOf = cats => cats.reduce((s, c) => s + Math.round(total * split[c.budgetKey] / 100), 0);

  $("stats").innerHTML = `
    <div class="stat"><div class="label">추천 매트리스</div><div class="value">${bed.value}</div><div class="sub">${bed.sub}</div></div>
    <div class="stat"><div class="label">총예산 (예시)</div><div class="value">${total}만 원</div><div class="sub">${LABELS.budget[a.budget]}</div></div>
    <div class="stat"><div class="label">첫날 살 것</div><div class="value">${first.length}개</div><div class="sub">약 ${sumOf(first)}만 원</div></div>`;

  // 3. 세트
  $("firstSum").textContent = `약 ${sumOf(first)}만 원`;
  $("laterSum").textContent = `약 ${sumOf(later)}만 원`;
  $("firstSlots").innerHTML = first.map(c => slotHTML(c, a, total)).join("");
  $("laterSlots").innerHTML = later.map(c => slotHTML(c, a, total)).join("");
}

/* ---------- 화면 전환 ---------- */
function showResult(a) {
  render(a);
  form.style.display = "none";
  $("result").classList.add("show");
  document.body.classList.add("has-result");
  // 주소에 답 저장 (파일로 열었을 때 막는 브라우저가 있어서 실패해도 넘어가요)
  try {
    const qs = QUESTIONS.map(q => q + "=" + encodeURIComponent(a[q])).join("&");
    history.replaceState(null, "", "?" + qs);
  } catch (err) { /* 무시 */ }
  window.scrollTo(0, 0);
}

function showQuiz() {
  $("result").classList.remove("show");
  document.body.classList.remove("has-result");
  form.style.display = "block";
  $("find").scrollIntoView();
}

/* 고른 답 읽기 */
function currentAnswers() {
  const a = {};
  QUESTIONS.forEach(q => {
    const checked = form.querySelector('input[name="' + q + '"]:checked');
    if (checked) a[q] = checked.value;
  });
  return a;
}

/* 고른 보기 색칠 + 버튼 상태 */
function refreshForm() {
  form.querySelectorAll(".options label").forEach(label => {
    const input = label.querySelector("input");
    label.classList.toggle("selected", input.checked);
  });
  const a = currentAnswers();
  const left = QUESTIONS.filter(q => !a[q]).length;
  $("submitBtn").classList.toggle("waiting", left > 0);
  if (left === 0) $("formMsg").textContent = "";
  QUESTIONS.forEach(q => {
    if (a[q]) form.querySelector('input[name="' + q + '"]').closest(".question").classList.remove("missing");
  });
}

form.addEventListener("change", refreshForm);
form.addEventListener("click", () => setTimeout(refreshForm, 0));

/* 양식 제출은 미리보기 창 등에서 막힐 수 있어서 버튼 클릭으로 직접 처리해요 */
form.addEventListener("submit", e => e.preventDefault());
$("submitBtn").addEventListener("click", () => {
  const a = currentAnswers();
  const missing = QUESTIONS.filter(q => !a[q]);
  if (missing.length > 0) {
    // 안 고른 질문 표시하고 거기로 이동
    missing.forEach(q => form.querySelector('input[name="' + q + '"]').closest(".question").classList.add("missing"));
    $("formMsg").textContent = "아직 안 고른 질문이 " + missing.length + "개 있어요.";
    form.querySelector('input[name="' + missing[0] + '"]').closest(".question").scrollIntoView({ block: "center" });
    return;
  }
  showResult(a);
});

$("editBtn").addEventListener("click", showQuiz);

/* ---------- 공유 ---------- */
$("shareBtn").addEventListener("click", async () => {
  const url = location.href;
  const text = "갖구가에서 만든 내 첫 자취방 가구 계획서예요.";
  try {
    if (navigator.share) {
      await navigator.share({ title: "갖구가 구매 계획서", text, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    $("toast").textContent = "링크를 복사했어요. 카톡에 붙여 넣으세요.";
  } catch (err) {
    $("toast").textContent = "복사가 안 되면 주소창의 링크를 직접 복사해 주세요.";
  }
});

/* ---------- 홈 화면: 배너 넘기기 ---------- */
let slideIdx = 0;
const slides = document.querySelectorAll(".slide");
function goSlide(n) {
  slides[slideIdx].classList.remove("on");
  slideIdx = (n + slides.length) % slides.length;
  slides[slideIdx].classList.add("on");
  $("slideNum").textContent = (slideIdx + 1) + " / " + slides.length;
}
$("prevSlide").addEventListener("click", () => goSlide(slideIdx - 1));
$("nextSlide").addEventListener("click", () => goSlide(slideIdx + 1));
setInterval(() => { if (!document.body.classList.contains("has-result")) goSlide(slideIdx + 1); }, 6000);

/* ---------- 메뉴, 버튼 이동 ---------- */
function goTo(where) {
  if (where === "home") { showQuiz(); window.scrollTo(0, 0); return; }
  if (document.body.classList.contains("has-result") && where !== "how") showQuiz();
  const target = where === "how" ? $("how") : $(where);
  if (where === "how") target.open = true;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
document.querySelectorAll("[data-go]").forEach(el => {
  el.addEventListener("click", () => goTo(el.dataset.go));
});

/* 상황별 세트 → 바로 결과 */
document.querySelectorAll(".set-card").forEach(card => {
  card.addEventListener("click", () => {
    const a = {};
    card.dataset.preset.split("&").forEach(pair => { const kv = pair.split("="); a[kv[0]] = kv[1]; });
    QUESTIONS.forEach(q => {
      const input = form.querySelector('input[name="' + q + '"][value="' + a[q] + '"]');
      if (input) input.checked = true;
    });
    refreshForm();
    showResult(a);
  });
});

/* ---------- 링크로 들어왔을 때: 답이 주소에 있으면 바로 결과 ---------- */
(function initFromURL() {
  const params = new URLSearchParams(location.search);
  const a = {};
  for (const q of QUESTIONS) {
    const v = params.get(q);
    if (!v || !(v in LABELS[q])) return;
    a[q] = v;
    const input = form.querySelector(`input[name="${q}"][value="${v}"]`);
    if (input) input.checked = true;
  }
  refreshForm();
  showResult(a);
})();
refreshForm();
