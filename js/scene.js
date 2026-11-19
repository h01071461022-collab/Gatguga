/* =========================================================
   scene.js — 배너와 카드에 들어가는 임시 그림(SVG) 그리는 코드
   진짜 사진이 준비되면 scene() 호출 대신 <img>로 바꾸면 돼요. (3단계)
   ========================================================= */
const SCENE_COLORS = {
  fold:   { wall: "#e9dfd0", floor: "#c9b49a", accent: "#c9774a" },
  desk:   { wall: "#dfe3dc", floor: "#b9a48a", accent: "#7f9a86" },
  bed:    { wall: "#ece4d8", floor: "#bfa58a", accent: "#b9876a" },
  hanger: { wall: "#e7ddd6", floor: "#c4ad95", accent: "#8f8fb0" }
};

function scene(kind, W, H, x0) {
  const c = SCENE_COLORS[kind];
  const fy = H * 0.72;                       // 바닥 높이
  const u = H / 100;                         // 기준 단위
  const out = [];
  out.push(`<rect width="${W}" height="${H}" fill="${c.wall}"/>`);
  out.push(`<rect y="${fy}" width="${W}" height="${H - fy}" fill="${c.floor}"/>`);
  out.push(`<rect y="${fy - u}" width="${W}" height="${u}" fill="#fff" opacity=".6"/>`);
  // 창문과 햇빛
  const wx = x0 + 34 * u, wy = 10 * u, ww = 26 * u, wh = 40 * u;
  out.push(`<polygon points="${wx},${wy + wh} ${wx + ww},${wy + wh} ${wx + ww + 18 * u},${H} ${wx - 22 * u},${H}" fill="#fff" opacity=".18"/>`);
  out.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#f7f4ee" stroke="#fff" stroke-width="${1.5 * u}"/>`);
  out.push(`<rect x="${wx + ww / 2 - .4 * u}" y="${wy}" width="${.8 * u}" height="${wh}" fill="#fff"/>`);
  out.push(`<rect x="${wx}" y="${wy + wh / 2 - .4 * u}" width="${ww}" height="${.8 * u}" fill="#fff"/>`);
  // 러그
  out.push(`<ellipse cx="${x0 + 30 * u}" cy="${fy + 14 * u}" rx="${34 * u}" ry="${6 * u}" fill="#fff" opacity=".35"/>`);
  // 화분
  const px = x0 + 70 * u;
  out.push(`<rect x="${px}" y="${fy - 8 * u}" width="${7 * u}" height="${8 * u}" rx="${u}" fill="#a77b5c"/>`);
  out.push(`<ellipse cx="${px + 3.5 * u}" cy="${fy - 14 * u}" rx="${6 * u}" ry="${8 * u}" fill="#7f9a76"/>`);

  if (kind === "bed") {
    out.push(`<rect x="${x0}" y="${fy - 34 * u}" width="${4 * u}" height="${34 * u}" rx="${u}" fill="#f4efe7"/>`);
    out.push(`<rect x="${x0}" y="${fy - 12 * u}" width="${52 * u}" height="${12 * u}" rx="${u}" fill="#f4efe7"/>`);
    out.push(`<rect x="${x0 + 2 * u}" y="${fy - 18 * u}" width="${49 * u}" height="${7 * u}" rx="${2 * u}" fill="#fff"/>`);
    out.push(`<rect x="${x0 + 5 * u}" y="${fy - 23 * u}" width="${12 * u}" height="${6 * u}" rx="${2.5 * u}" fill="#fff" stroke="#e5ddd0"/>`);
    out.push(`<rect x="${x0 + 22 * u}" y="${fy - 19 * u}" width="${30 * u}" height="${9 * u}" rx="${2 * u}" fill="${c.accent}" opacity=".85"/>`);
    out.push(`<line x1="${x0 + 58 * u}" y1="${fy}" x2="${x0 + 58 * u}" y2="${fy - 38 * u}" stroke="#5b5046" stroke-width="${.8 * u}"/>`);
    out.push(`<path d="M${x0 + 53 * u},${fy - 38 * u} h${10 * u} l${-2 * u},${-7 * u} h${-6 * u} z" fill="#f2e6cf"/>`);
  }
  if (kind === "fold") {
    for (let i = 0; i < 3; i++) {
      out.push(`<rect x="${x0 + 4 * u}" y="${fy - (i + 1) * 6 * u}" width="${30 * u}" height="${6 * u}" rx="${2 * u}" fill="${i === 1 ? c.accent : "#fbf8f3"}" stroke="#e2d8ca"/>`);
    }
    out.push(`<ellipse cx="${x0 + 46 * u}" cy="${fy - 3 * u}" rx="${9 * u}" ry="${3.5 * u}" fill="${c.accent}" opacity=".7"/>`);
    out.push(`<rect x="${x0 + 40 * u}" y="${fy - 12 * u}" width="${22 * u}" height="${2 * u}" rx="${u}" fill="#d9c7ae"/>`);
    out.push(`<rect x="${x0 + 42 * u}" y="${fy - 10 * u}" width="${1.5 * u}" height="${10 * u}" fill="#c4b096"/>`);
    out.push(`<rect x="${x0 + 58.5 * u}" y="${fy - 10 * u}" width="${1.5 * u}" height="${10 * u}" fill="#c4b096"/>`);
  }
  if (kind === "desk") {
    out.push(`<rect x="${x0}" y="${fy - 22 * u}" width="${44 * u}" height="${2.5 * u}" fill="#f4efe7"/>`);
    out.push(`<rect x="${x0 + 2 * u}" y="${fy - 20 * u}" width="${1.5 * u}" height="${20 * u}" fill="#d9cdbd"/>`);
    out.push(`<rect x="${x0 + 40 * u}" y="${fy - 20 * u}" width="${1.5 * u}" height="${20 * u}" fill="#d9cdbd"/>`);
    out.push(`<rect x="${x0 + 8 * u}" y="${fy - 36 * u}" width="${18 * u}" height="${12 * u}" rx="${u}" fill="#3c3631"/>`);
    out.push(`<rect x="${x0 + 16 * u}" y="${fy - 24 * u}" width="${2 * u}" height="${2 * u}" fill="#3c3631"/>`);
    out.push(`<path d="M${x0 + 34 * u},${fy - 22 * u} v${-12 * u} l${4 * u},${-3 * u}" stroke="#5b5046" stroke-width="${.8 * u}" fill="none"/>`);
    out.push(`<path d="M${x0 + 36 * u},${fy - 37 * u} l${6 * u},${3 * u} l${-3 * u},${4 * u} z" fill="${c.accent}"/>`);
    out.push(`<rect x="${x0 + 46 * u}" y="${fy - 26 * u}" width="${12 * u}" height="${12 * u}" rx="${2 * u}" fill="${c.accent}"/>`);
    out.push(`<rect x="${x0 + 46 * u}" y="${fy - 14 * u}" width="${14 * u}" height="${3 * u}" rx="${u}" fill="${c.accent}"/>`);
    out.push(`<rect x="${x0 + 52 * u}" y="${fy - 11 * u}" width="${1.5 * u}" height="${9 * u}" fill="#5b5046"/>`);
    out.push(`<rect x="${x0 + 47 * u}" y="${fy - 2 * u}" width="${12 * u}" height="${1.2 * u}" rx="${.6 * u}" fill="#5b5046"/>`);
  }
  if (kind === "hanger") {
    out.push(`<rect x="${x0 + 2 * u}" y="${fy - 40 * u}" width="${1.5 * u}" height="${40 * u}" fill="#5b5046"/>`);
    out.push(`<rect x="${x0 + 44 * u}" y="${fy - 40 * u}" width="${1.5 * u}" height="${40 * u}" fill="#5b5046"/>`);
    out.push(`<rect x="${x0 + 2 * u}" y="${fy - 40 * u}" width="${43.5 * u}" height="${1.2 * u}" fill="#5b5046"/>`);
    const cols = ["#f4efe7", c.accent, "#d9c7ae", "#6f7f8f", "#fbf8f3", c.accent];
    cols.forEach((col, i) => {
      const cx = x0 + (7 + i * 6.5) * u;
      out.push(`<path d="M${cx},${fy - 38 * u} l${-3 * u},${3 * u} v${(16 + (i % 3) * 4) * u} h${6 * u} v${-(16 + (i % 3) * 4) * u} z" fill="${col}" stroke="#e2d8ca"/>`);
    });
    out.push(`<rect x="${x0 + 4 * u}" y="${fy - 6 * u}" width="${40 * u}" height="${6 * u}" rx="${u}" fill="#fbf8f3" stroke="#e2d8ca"/>`);
  }
  return out.join("");
}

function sceneSVG(kind, W, H, x0, cls) {
  return `<svg class="${cls || ""}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${scene(kind, W, H, x0)}</svg>`;
}

// 배너 그림
document.querySelectorAll(".slide").forEach(sl => {
  sl.insertAdjacentHTML("afterbegin", sceneSVG(sl.dataset.scene, 1600, 640, 820, "scene") + '<div class="shade"></div>');
});
// 세트 카드 그림
document.querySelectorAll(".set-card").forEach(card => {
  card.insertAdjacentHTML("afterbegin", sceneSVG(card.dataset.scene, 400, 300, 60));
});
