import { COLORS } from "@daycan/ui";

/**
 * 라인 개수에 따른 색상 배열을 반환
 * @param count 라인 개수
 * @returns 색상 배열
 * @author 홍규진
 */
export const getLineColors = (count: number) => {
  if (count === 1) {
    return [COLORS.gray[700]];
  } else if (count === 2) {
    return [COLORS.blue[500], COLORS.red[500]];
  } else {
    // 3개 이상일 때는 기본 색상들
    return [
      COLORS.blue[500],
      COLORS.red[500],
      COLORS.green[500],
      COLORS.yellow[500],
      COLORS.gray[500],
    ];
  }
};

/**
 * 데이터에서 자동으로 키들을 추출
 * @param data 차트 데이터
 * @param dataKeys 사용자가 지정한 데이터 키들
 * @param xAxisKey x축 키
 * @returns 데이터 키 배열
 * @author 홍규진
 */
export const getDataKeys = (
  data: any[],
  dataKeys?: string[],
  xAxisKey: string = "name"
) => {
  if (dataKeys) return dataKeys;

  if (data.length > 0) {
    const firstItem = data[0];
    // xAxisKey를 제외한 모든 숫자 키들을 추출
    return Object.keys(firstItem).filter(
      (key) => key !== xAxisKey && typeof firstItem[key] === "number"
    );
  }

  return [];
};

/**
 * lineNames가 없으면 자동으로 생성
 * @param data 차트 데이터
 * @param lineNames 사용자가 지정한 라인 이름들
 * @param dataKeys 데이터 키들
 * @param xAxisKey x축 키
 * @returns 라인 이름 배열
 * @author 홍규진
 */
export const getLineNames = (
  data: any[],
  lineNames?: { key: string; value: string }[],
  dataKeys?: string[],
  xAxisKey: string = "name"
) => {
  if (lineNames) return lineNames;

  const keys = getDataKeys(data, dataKeys, xAxisKey);
  return keys.map((key) => ({ key, value: key }));
};
