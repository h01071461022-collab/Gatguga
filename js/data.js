/* =========================================================
   data.js — 상품, 가구 종류, 추천 규칙, 예산 비율
   이 파일만 고쳐도 사이트에 바로 반영돼요. (화면 코드는 건드릴 필요 없음)

   [상품 추가하는 법]
   1. 아래 PRODUCTS 배열에 상품 하나를 { } 형태로 추가하세요.
   2. 꼭 채워야 하는 값
      - id: 다른 상품과 겹치지 않는 영문 이름 (예: "zinus2")
      - category: CATEGORIES에 있는 이름과 똑같이 써야 해요 (예: "매트리스")
      - name: 화면에 보일 상품 이름
      - why: 이 상품을 추천하는 이유 (리뷰를 요약해서 쓰기, 그대로 복사하지 않기)
   3. 상황에 맞게 채우는 값 (몰라도 되는 건 비워 두면 돼요)
      - role: "다른 선택지"로 보일 때 붙는 이름 (예: "가성비", "이사용")
      - priceMin / priceMax: 가격대, 만 원 단위 숫자. 모르면 둘 다 null
      - flaw: 사기 전에 알아 둘 단점 (쿠팡 1~2점 리뷰 기반, 문장은 요약해서 쓰기)
      - tags: 화면에 작은 태그로 보일 특징들 (배열)
      - folding / easyMove: 접이식인지, 이사하기 쉬운지 (true / false)
      - link: 쿠팡파트너스 링크. 아직 없으면 ""로 비워 두면 "준비 중"으로 보여요.
      - score: 질문 답에 따라 점수를 더하는 규칙. 점수가 높을수록 "나에게 가장 맞음"으로 올라가요.
        예) score: { move: { soon: 4 }, size: { s: 2 } }
        → "1년 안에 이사" 답을 고르면 +4점, "4평 이하" 답을 고르면 +2점
        음수도 가능해요 (예: move: { soon: -3 }). 그 답일 때 순위를 낮추고 싶을 때 씀.
      - checkedAt: 이 상품을 쿠팡에서 마지막으로 확인한 날짜 ("2026-11-19" 형식).
        화면에는 안 보이고, 한두 달마다 다시 점검할 때 "언제 봤더라" 확인용으로만 써요.

   같은 category 안에서 점수가 가장 높은 상품이 맨 위에 "나에게 가장 맞음"으로 보이고,
   나머지는 "다른 선택지"로 접혀서 보여요.
   ========================================================= */
const PRODUCTS = [
  {
    id: "zinus",
    category: "매트리스",
    name: "지누스 베이직 메모리폼 매트리스",
    role: "가성비",
    priceMin: 15, priceMax: 16,
    why: "리뷰 4,700개 이상, 만족 표시 4,000명 이상으로 자취생들이 많이 고르는 메모리폼 매트리스예요.",
    flaw: "옵션(사이즈)별 할인율이 달라 가격이 자주 바뀌어요. 구매 전 최신 가격을 꼭 확인하세요.",
    tags: ["메모리폼"],
    folding: false, easyMove: false,
    link: "",
    checkedAt: "2026-11-19",
    score: { move: { stay: 3 }, budget: { low: 1, mid: 2 } }
  },
  {
    id: "quickslip-q3",
    category: "매트리스",
    name: "퀵슬립 Q3 유로탑 매트리스",
    role: "포근함",
    priceMin: 33, priceMax: 33,
    why: "푹신한 유로탑 타입이라 편안하게 쉬고 싶은 사람에게 어울려요.",
    flaw: "쿠팡 로켓배송이 아닌 판매자(RNC Korea) 상품이라 반품비가 4만 원이에요. 사이즈를 꼭 확인하고 사세요.",
    tags: ["유로탑", "롤팩 배송"],
    folding: false, easyMove: false,
    link: "",
    checkedAt: "2026-11-19",
    score: { move: { stay: 2, soon: -3 }, budget: { mid: 1, high: 3 }, use: { rest: 2 } }
  },
  {
    id: "sensemom",
    category: "매트리스",
    name: "센스맘 뉴 시그니처9 매트리스",
    role: "바닥형",
    priceMin: 13, priceMax: 13,
    why: "분리형 토퍼와 커버가 포함돼 있고, 한 달에 100명 이상이 구매하는 인기 상품이에요.",
    flaw: "",
    tags: ["분리형 토퍼", "커버 포함"],
    folding: false, easyMove: true,
    link: "",
    checkedAt: "2026-11-19",
    score: { budget: { low: 2 }, size: { s: 1 }, move: { soon: 1 } }
  },
  {
    id: "fold-foam",
    category: "매트리스",
    name: "라이프슬립 3단 접이식 매트리스",
    role: "이사용",
    priceMin: 14, priceMax: 14,
    why: "3단으로 접을 수 있어서 이사할 때 들고 가기 쉬워요. 국내에서 만든 제품이에요.",
    flaw: "두께가 15cm라 접었을 때 부피가 크고 조금 무거울 수 있어요. 재고가 얼마 남지 않았다는 안내가 있으니 품절 전에 확인하세요.",
    tags: [],
    folding: true, easyMove: true,
    link: "",
    checkedAt: "2026-11-19",
    score: { move: { soon: 4 }, size: { s: 2 } }
  }
];

/* 가구 종류: 순서, 첫날 필요 여부 */
const CATEGORIES = [
  { key: "매트리스",        budgetKey: "매트리스", firstDay: true },
  { key: "침대 프레임 / 깔판", budgetKey: "프레임",  firstDay: true },
  { key: "조명",            budgetKey: "조명",    firstDay: true },
  { key: "행거",            budgetKey: "행거",    firstDay: true },
  { key: "책상",            budgetKey: "책상",    firstDay: false },
  { key: "의자",            budgetKey: "의자",    firstDay: false },
  { key: "수납장 / 서랍장",   budgetKey: "수납",    firstDay: false }
];

/* =========================================================
   추천 규칙에 쓰는 문구
   ========================================================= */
const LABELS = {
  size:   { s: "4평 이하", m: "5~6평", l: "7평 이상", unknown: "방 크기 모름" },
  budget: { low: "30만 원 이하", mid: "30~70만 원", high: "70만 원 이상" },
  use:    { study: "공부·작업", rest: "쉬기·영상", cook: "요리·손님" },
  move:   { soon: "1년 안에 이사", stay: "2년 이상 거주" }
};

/* 답을 "왜 이걸 골랐는지" 문장에 쓸 때 */
const REASON = {
  move:   { soon: "1년 안에 이사할 수도 있다고 해서", stay: "2년 이상 살 거라서" },
  budget: { low: "예산이 30만 원 이하라서", mid: "예산이 30~70만 원이라서", high: "예산에 여유가 있어서" },
  size:   { s: "방이 4평 이하라서", m: "방이 5~6평이라서", l: "방이 7평 이상이라서", unknown: "방 크기를 아직 몰라서" },
  use:    { study: "방에서 주로 공부해서", rest: "방에서 주로 쉬어서", cook: "요리하고 손님도 와서" }
};

/* 예산 배분에 쓸 대표 금액 (만 원) */
const BUDGET_AMOUNT = { low: 25, mid: 50, high: 90 };

/* 생활 방식별 예산 비율 (%) — 합이 100
   2-1단계에서 매트리스 실제 가격(13~33만 원)을 보고 매트리스 비중을 올렸어요.
   늘어난 만큼은 수납(아직 가격 모르는 항목 중 상대적으로 급하지 않은 것)에서 가져왔어요. */
const BUDGET_SPLIT = {
  study: { "매트리스": 34, "프레임": 10, "책상": 18, "의자": 17, "수납": 6, "행거": 5, "조명": 10 },
  rest:  { "매트리스": 45, "프레임": 12, "책상": 8,  "의자": 8,  "수납": 9, "행거": 8, "조명": 10 },
  cook:  { "매트리스": 36, "프레임": 10, "책상": 18, "의자": 10, "수납": 14, "행거": 5, "조명": 7 }
};
