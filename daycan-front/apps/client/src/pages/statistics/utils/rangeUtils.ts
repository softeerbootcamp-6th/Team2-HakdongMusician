import { type ChartData } from "./dataParser";

export interface NormalRange {
  start: number;
  end: number;
}

export interface RangeViolation {
  count: number;
  percentage: number;
  totalDataPoints: number;
}

/**
 * 특정 메트릭의 정상 범위를 벗어난 횟수를 계산
 * @param data 차트 데이터
 * @param metricKey 메트릭 키
 * @param normalRanges 정상 범위 배열
 * @returns 범위 위반 정보
 * @author 홍규진
 */
export const calculateRangeViolations = (
  data: ChartData[],
  metricKey: string,
  normalRanges: NormalRange[]
): RangeViolation => {
  let violationCount = 0;
  const totalDataPoints = data.length;

  data.forEach((item) => {
    const value = item[metricKey] as number;
    if (typeof value === "number") {
      // 모든 정상 범위를 벗어났는지 확인
      const isInNormalRange = normalRanges.some(
        (range) => value >= range.start && value <= range.end
      );

      if (!isInNormalRange) {
        violationCount++;
      }
    }
  });

  const percentage =
    totalDataPoints > 0
      ? Math.round((violationCount / totalDataPoints) * 100)
      : 0;

  return {
    count: violationCount,
    percentage,
    totalDataPoints,
  };
};

/**
 * 여러 메트릭의 범위 위반을 한번에 계산
 * @param data 차트 데이터
 * @param metricKeys 메트릭 키 배열
 * @param normalRangesMap 각 메트릭별 정상 범위 맵
 * @returns 각 메트릭별 범위 위반 정보
 * @author 홍규진
 */
export const calculateMultipleRangeViolations = (
  data: ChartData[],
  metricKeys: string[],
  normalRangesMap: Record<string, NormalRange[]>
): Record<string, RangeViolation> => {
  const violations: Record<string, RangeViolation> = {};

  metricKeys.forEach((metricKey) => {
    const normalRanges = normalRangesMap[metricKey] || [];
    violations[metricKey] = calculateRangeViolations(
      data,
      metricKey,
      normalRanges
    );
  });

  return violations;
};

/**
 * 범위 위반 정보를 표시용 텍스트로 변환
 * @param violation 범위 위반 정보
 * @returns 표시용 텍스트
 * @author 홍규진
 */
export const formatViolationText = (violation: RangeViolation): string => {
  if (violation.totalDataPoints === 0) return "데이터 없음";

  return `${violation.count}회 (${violation.percentage}%)`;
};
