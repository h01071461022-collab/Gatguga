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
      - price: 쿠팡에서 직접 본 정확한 가격 (원 단위 숫자). 모르면 null → "가격 조사 중"으로 보여요.
      - priceNote: 그 가격이 어떤 가격인지 (예: "와우 회원가", "쿠폰 적용가"). 없으면 ""
      - image: 상품 사진 파일 경로 (예: "images/products/zinus.jpg"). 아직 없으면 ""로 두면 회색 "사진" 자리가 보여요.
      - flaw: 사기 전에 알아 둘 단점 (쿠팡 1~2점 리뷰 기반, 문장은 요약해서 쓰기)
      - tags: 화면에 작은 태그로 보일 특징들 (배열)
      - folding / easyMove: 접이식인지, 이사하기 쉬운지 (true / false)
      - link: 쿠팡파트너스 링크. 아직 없으면 ""로 비워 두면 "준비 중"으로 보여요.
      - score: 질문 답에 따라 점수를 더하는 규칙. 점수가 높을수록 "나에게 가장 맞음"으로 올라가요.
        예) score: { move: { soon: 4 }, size: { s: 2 } }
        → "1년 안에 이사" 답을 고르면 +4점, "4평 이하" 답을 고르면 +2점
        음수도 가능해요 (예: move: { soon: -3 }). 그 답일 때 순위를 낮추고 싶을 때 씀.
      - checkedAt: 이 상품을 쿠팡에서 마지막으로 확인한 날짜 ("2026-11-19" 형식).
        화면에 "11월 19일 기준"처럼 작게 같이 보여요. 한두 달마다 다시 점검할 때도 이 날짜를 기준으로 봐요.

   같은 category 안에서 점수가 가장 높은 상품이 맨 위에 "나에게 가장 맞음"으로 보이고,
   나머지는 "다른 선택지"로 접혀서 보여요.
   ========================================================= */
const PRODUCTS = [
  {
    id: "zinus",
    category: "매트리스",
    name: "지누스 베이직 메모리폼 매트리스",
    role: "가성비",
    price: 159440, priceNote: "와우 회원가", image: "",
    why: "리뷰 4,700개 이상, 만족 표시 4,000명 이상으로 자취생들이 많이 고르는 메모리폼 매트리스예요.",
    flaw: "옵션(사이즈)별 할인율이 달라 가격이 자주 바뀌어요. 구매 전 최신 가격을 꼭 확인하세요.",
    tags: ["메모리폼", "슈퍼싱글", "15cm", "화이트"],
    folding: false, easyMove: false,
    link: "https://link.coupang.com/a/i2pjrakjJs",
    checkedAt: "2026-11-28",
    score: { move: { stay: 3 }, budget: { low: 1, mid: 2 } }
  },
  {
    id: "quickslip-q3",
    category: "매트리스",
    name: "퀵슬립 Q3 유로탑 매트리스",
    role: "포근함",
    price: 333900, priceNote: "", image: "",
    why: "푹신한 유로탑 타입이라 편안하게 쉬고 싶은 사람에게 어울려요.",
    flaw: "쿠팡 로켓배송이 아닌 판매자(RNC Korea) 상품이라 반품비가 4만 원이에요. 사이즈를 꼭 확인하고 사세요.",
    tags: ["유로탑", "롤팩 배송", "슈퍼싱글", "27cm"],
    folding: false, easyMove: false,
    link: "https://link.coupang.com/a/i2plQpSNCm",
    checkedAt: "2026-11-28",
    score: { move: { stay: 2, soon: -3 }, budget: { mid: 1, high: 3 }, use: { rest: 2 } }
  },
  {
    id: "sensemom",
    category: "매트리스",
    name: "센스맘 뉴 시그니처9 매트리스",
    role: "바닥형",
    price: 129000, priceNote: "", image: "",
    why: "분리형 토퍼와 커버가 포함돼 있고, 한 달에 100명 이상이 구매하는 인기 상품이에요.",
    flaw: "",
    tags: ["분리형 토퍼", "커버 포함", "슈퍼싱글", "12cm", "네이비"],
    folding: false, easyMove: true,
    link: "https://link.coupang.com/a/i2poHOWfiC",
    checkedAt: "2026-11-28",
    score: { budget: { low: 2 }, size: { s: 1 }, move: { soon: 1 } }
  },
  {
    id: "fold-foam",
    category: "매트리스",
    name: "라이프슬립 3단 접이식 매트리스",
    role: "이사용",
    price: 143040, priceNote: "", image: "",
    why: "3단으로 접을 수 있어서 이사할 때 들고 가기 쉬워요. 국내에서 만든 제품이에요.",
    flaw: "두께가 15cm라 접었을 때 부피가 크고 조금 무거울 수 있어요. 재고가 얼마 남지 않았다는 안내가 있으니 품절 전에 확인하세요.",
    tags: ["슈퍼싱글", "15cm", "그레이"],
    folding: true, easyMove: true,
    link: "https://link.coupang.com/a/i2pqAns6o0",
    checkedAt: "2026-11-28",
    score: { move: { soon: 4 }, size: { s: 2 } }
  },
  {
    id: "comet-desk1260",
    category: "책상",
    name: "코멧 멀티 책상 1260",
    role: "넓고 튼튼함",
    price: 27610, priceNote: "", image: "",
    why: "리뷰 28,000개 이상, 만족 표시 2만 명 이상으로 많이 팔리는 철제 프레임 책상이에요. 가로 120cm라 모니터와 책을 같이 올려두기 좋아요.",
    flaw: "가로가 120cm라 4평 이하 좁은 방엔 커 보일 수 있어요. 조립은 직접 해야 해요.",
    tags: ["철제 프레임", "120cm", "블랙"],
    folding: false, easyMove: false,
    link: "https://link.coupang.com/a/i2pwEqjJ7Y",
    checkedAt: "2026-11-28",
    score: { use: { study: 4 }, move: { soon: -2 } }
  },
  {
    id: "furnfeel-foldesk",
    category: "책상",
    name: "가구느낌 베스트 책상 (접이식)",
    role: "이사용 접이식",
    price: 23950, priceNote: "쿠폰 적용가", image: "",
    why: "다리가 접혀서 이사할 때 부피를 줄일 수 있는 책상이에요. 리뷰 4,400개 이상으로 꾸준히 팔리고 있어요.",
    flaw: "다리 부분에 긁힘이나 녹이 보인다는 리뷰가 가끔 있어요. 받으면 먼저 확인하세요.",
    tags: ["접이식", "80cm", "라이트월넛블랙"],
    folding: true, easyMove: true,
    link: "https://link.coupang.com/a/i2pz8VXVtc",
    checkedAt: "2026-11-28",
    score: { move: { soon: 4 }, size: { s: 2 } }
  },
  {
    id: "newworld-chair",
    category: "의자",
    name: "New World 메쉬 사무용 의자",
    role: "기본형",
    price: 28700, priceNote: "할인가 · 12월 2일까지", image: "",
    why: "메쉬 등받이와 팔걸이가 있는 기본형 사무용 의자예요. 조립이 어렵지 않다는 평가가 많아요.",
    flaw: "가끔 흠집이 있는 상품이 온다는 리뷰가 있어요(2건 확인). 받으면 바로 확인하세요. 높이 조절과 바퀴는 없어요.",
    tags: ["메쉬", "고정 다리", "블랙"],
    folding: false, easyMove: false,
    link: "https://link.coupang.com/a/i2pLPaZWfc",
    checkedAt: "2026-11-28",
    score: { use: { rest: 1 }, budget: { low: 1 } }
  },
  {
    id: "takata-chair",
    category: "의자",
    name: "Takata 메쉬 사무용 의자 WY4 (학생용 공부 의자)",
    role: "공부용",
    price: 35900, priceNote: "", image: "",
    why: "학생용 공부 의자로 나온 메쉬 의자예요. 조립이 쉽다는 평가가 많고, 리뷰도 3,500개 이상으로 많이 팔리고 있어요.",
    flaw: "내구성이 아쉽다는 후기가 있어요.",
    tags: ["메쉬", "학생용", "회색", "90x45x58"],
    folding: false, easyMove: false,
    link: "https://link.coupang.com/a/i2qh776swK",
    checkedAt: "2026-11-28",
    score: { use: { study: -2 } }
  },
  {
    id: "comet-drawer3",
    category: "수납장 / 서랍장",
    name: "코멧 슬림서랍장 (3단, 플라스틱)",
    role: "이사용 플라스틱",
    price: 13970, priceNote: "", image: "",
    why: "리뷰 24,000개 이상, 만족 표시 2만 명 이상인 슬림 플라스틱 서랍장이에요. 가볍고 좁은 자리에도 들어가요(31×40×59.9cm).",
    flaw: "5단 투명 옵션에서는 깨짐·내구성 불만이 있었어요. 지금 추천하는 3단 기본형은 다른 옵션이에요.",
    tags: ["플라스틱", "3단", "가벼움", "화이트"],
    folding: false, easyMove: true,
    link: "https://link.coupang.com/a/i2pOFzcsgK",
    checkedAt: "2026-11-28",
    score: { move: { soon: 4 }, budget: { low: 2 } }
  },
  {
    id: "comet-deskstand",
    category: "조명",
    name: "코멧 거실 장스탠드 (책상 조명 겸용)",
    role: "책상 조명 겸용",
    price: 18990, priceNote: "", image: "",
    why: "목이 휘어지는 자바라형이라 책상 조명으로 쓰기 좋아요. 전구가 포함돼 있고 리뷰 4,800개 이상에 평점도 높아요.",
    flaw: "가끔 전구가 빠진 채로 오는 경우가 있어요(1건 확인). 받으면 전구가 들어있는지 먼저 확인하세요.",
    tags: ["장스탠드", "전구 포함", "화이트"],
    folding: false, easyMove: true,
    link: "https://link.coupang.com/a/i2pQNxfWCq",
    checkedAt: "2026-11-28",
    score: { use: { study: 4 } }
  },
  {
    id: "comet-moodstand",
    category: "조명",
    name: "코멧 무드 플로어 장스탠드",
    role: "분위기용",
    price: 24990, priceNote: "", image: "",
    why: "천으로 된 갓이라 빛이 은은하게 퍼져요. 전구(LED)가 포함돼 있고 평점이 높은 편이에요.",
    flaw: "바닥 받침이 찌그러지거나 부품이 빠진 채로 오는 경우가 있어요(각 1건 확인). 밝기 조절 리모컨은 없고 코드로 켜고 꺼요.",
    tags: ["무드등", "전구 포함", "화이트"],
    folding: false, easyMove: true,
    link: "https://link.coupang.com/a/i2pSzxbhaC",
    checkedAt: "2026-11-28",
    score: { use: { rest: 4 } }
  },
  {
    id: "homeplanet-mood",
    category: "조명",
    name: "홈플래닛 충전식 LED 스탠드 무드등 (리모컨 세트)",
    role: "충전식",
    price: 9260, priceNote: "", image: "",
    why: "충전식이라 콘센트 위치에 상관없이 쓸 수 있고, 리모컨으로 밝기를 조절할 수 있어요. 리뷰 3,200개 이상에 평점도 높은 편이에요.",
    flaw: "스위치를 눌러도 바로 꺼지는 불량이 왔다거나, 반품 상품을 다시 보낸 듯한 포장으로 왔다는 후기가 있어요(1건 확인).",
    tags: ["무드등", "충전식", "리모컨 포함", "화이트"],
    folding: false, easyMove: true,
    link: "https://link.coupang.com/a/i2p8W0RvQy",
    checkedAt: "2026-11-28",
    score: { budget: { low: 2 }, use: { rest: 1 } }
  },
  {
    id: "kcy-moodlamp",
    category: "조명",
    name: "케이시조명 LED 밝기조절 패브릭 무드등 (내추럴 우드)",
    role: "밝기조절형",
    price: 14600, priceNote: "", image: "",
    why: "패브릭 갓이라 빛이 부드럽게 퍼지고, 리모컨으로 밝기를 조절할 수 있어요.",
    flaw: "갓이 흔들리고 설명서가 없다는 후기가 있어요.",
    tags: ["무드등", "밝기조절", "리모컨 포함", "내추럴 우드"],
    folding: false, easyMove: true,
    link: "https://link.coupang.com/a/i2qcpqfTpY",
    checkedAt: "2026-11-28",
    score: { use: { rest: 1 } }
  },
  {
    id: "unihome-hanger",
    category: "행거",
    name: "유니홈 28mm 이동식 옷걸이 행거",
    role: "이동식",
    price: 27800, priceNote: "", image: "",
    why: "바퀴가 달려 있어서 옮기기 쉽고, 아래에 선반도 있어서 신발이나 가방을 둘 수 있어요. 리뷰 5,900개 이상, 평점도 높아서 많이 선택하는 행거예요.",
    flaw: "겨울옷을 많이 걸면 휠 수 있다는 후기가 있어요. 무거운 옷은 나눠 거세요.",
    tags: ["이동식", "바퀴", "120cm", "블랙"],
    folding: false, easyMove: true,
    link: "https://link.coupang.com/a/i2p0fJC61s",
    checkedAt: "2026-11-28",
    score: { move: { soon: 4 } }
  },
  {
    id: "raonliving-hanger",
    category: "행거",
    name: "라온리빙 2단 와이드 행거 (천장 고정형)",
    role: "천장 고정형",
    price: 32890, priceNote: "쿠폰 적용가", image: "",
    why: "천장에 단단히 고정하는 방식이라 흔들림 없이 오래 쓸 수 있고, 높이도 조절할 수 있어요. 견고하다는 평가가 많아요.",
    flaw: "천장에 고정하는 방식이라 천장 높이를 먼저 확인하세요. 설치가 힘들다는 후기가 있어요.",
    tags: ["천장 고정형", "32mm", "블랙", "높이 조절"],
    folding: false, easyMove: false,
    link: "https://link.coupang.com/a/i2p5NBWOUS",
    checkedAt: "2026-11-28",
    score: { move: { stay: 4 } }
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

/* 배너·세트카드 사진 (scene.js에서 씀)
   파일 이름을 적으면 images/ 폴더에서 그 사진을 불러와요. 비워 두면("") 지금 그림 그대로예요.
   예: banner: ["banner-1.jpg", "", ""] → 첫 번째 배너만 사진, 나머지는 그림 */
const SCENE_PHOTOS = {
  banner: ["", "", ""],
  sets: { fold: "", desk: "", bed: "", hanger: "" }
};

/* 생활 방식별 예산 비율 (%) — 합이 100
   2-1단계에서 매트리스 실제 가격(13~33만 원)을 보고 매트리스 비중을 올렸어요.
   늘어난 만큼은 수납(아직 가격 모르는 항목 중 상대적으로 급하지 않은 것)에서 가져왔어요. */
const BUDGET_SPLIT = {
  study: { "매트리스": 34, "프레임": 10, "책상": 18, "의자": 17, "수납": 6, "행거": 5, "조명": 10 },
  rest:  { "매트리스": 45, "프레임": 12, "책상": 8,  "의자": 8,  "수납": 9, "행거": 8, "조명": 10 },
  cook:  { "매트리스": 36, "프레임": 10, "책상": 18, "의자": 10, "수납": 14, "행거": 5, "조명": 7 }
};
