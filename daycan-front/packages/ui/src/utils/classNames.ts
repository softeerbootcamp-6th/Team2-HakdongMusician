/**
 * 클래스 이름을 조합하는 유틸리티 함수입니다.
 * 문자열 배열을 받아서 빈 문자열을 제외하고 공백으로 구분하여 반환합니다.
 * @author 홍규진
 */
export const classNames = (...classNames: (string | undefined)[]) =>
  classNames.filter(Boolean).join(" ");
