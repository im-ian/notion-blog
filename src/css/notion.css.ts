import { globalStyle } from "@vanilla-extract/css";

import { vars } from "./vars.css";

/**
 * react-notion-x가 테마 전환 시 텍스트 색을 갱신하지 않는 문제를 덮어쓴다.
 * Notion의 기본 본문 색을 그대로 보존하기 위해 의도적으로 디자인 토큰 대신
 * Notion 원본 값을 사용한다.
 */
globalStyle(".notion", {
  color: "rgb(55, 53, 47)",
  caretColor: "rgb(55, 53, 47)",
});

globalStyle(".dark-mode .notion", {
  color: "rgba(255, 255, 255, 0.9)",
  caretColor: "rgba(255, 255, 255, 0.9)",
});

globalStyle(".notion .notion-quote", {
  fontSize: "unset",
});

globalStyle(".notion-asset-wrapper-video > div", {
  height: "auto !important",
});

/**
 * react-notion-x가 Notion의 table full-width(fit-page-width) 옵션을 지원하지 않고
 * 각 td에 width: 120px 인라인 스타일을 강제로 넣어, 테이블이 항상 좁게 표시된다.
 *
 * table을 display: block으로 바꿔 가로 스크롤 가능한 박스로 만들고,
 * tbody에 display: table + min-width: 100%을 주어 내부는 정상적인 테이블 레이아웃을
 * 유지하면서 콘텐츠가 길어지면 좌우로 스크롤되도록 한다.
 */
globalStyle(".notion-simple-table", {
  display: "block",
  maxWidth: "100%",
  overflowX: "auto",
});

globalStyle(".notion-simple-table > tbody", {
  display: "table",
  width: "auto",
  minWidth: "100%",
});

/**
 * 기본 셀 보더(알파 0.024)가 사실상 보이지 않아 가독성이 떨어지는 문제와
 * 인라인 width: 120px 강제 적용을 동시에 덮어쓴다.
 */
globalStyle(".notion-simple-table td", {
  width: "auto !important",
  borderColor: `${vars.color["gray-200"]} !important`,
});

globalStyle(".dark-mode .notion-simple-table td", {
  borderColor: `${vars.color["gray-700"]} !important`,
});

/**
 * 헤더 행을 배경과 폰트 굵기로 명확히 구분한다.
 */
globalStyle(".notion-simple-table-header-row td", {
  background: `${vars.color["gray-100"]} !important`,
  fontWeight: 600,
});

globalStyle(".dark-mode .notion-simple-table-header-row td", {
  background: `${vars.color["gray-600"]} !important`,
});
