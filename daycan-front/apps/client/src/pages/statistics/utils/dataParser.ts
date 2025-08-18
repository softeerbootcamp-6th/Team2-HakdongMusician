/**
 * 데이터 파싱을 위한 인터페이스입니다.
 * 현재 명세가 최종으로 나오지 않아 임시로 구현해두었습니다.
 * @author 홍규진
 */

export interface ResultData {
  [key: string]: {
    values: {
      [dateKey: string]: number;
    };
    average: number;
  };
}

export interface ChartData {
  name: string;
  [key: string]: number | string;
}

export interface ParsedChartData {
  data: ChartData[];
  lineNames: { key: string; value: string }[];
  averages: { [key: string]: number };
}

/**
 * result 데이터를 차트 데이터로 변환하는 함수
 * @param resultData result 부분의 데이터
 * @returns 파싱된 차트 데이터
 */
export const parseResultDataToChartData = (
  resultData: ResultData
): ParsedChartData => {
  const lineNames: { key: string; value: string }[] = [];
  const averages: { [key: string]: number } = {};

  // 모든 날짜 키들을 수집
  const allDateKeys = new Set<string>();

  // 각 메트릭의 데이터를 처리
  Object.entries(resultData).forEach(([metricKey, metricData]) => {
    // 메트릭 이름을 사람이 읽기 쉽게 변환
    const readableName = convertMetricKeyToReadableName(metricKey);
    lineNames.push({ key: metricKey, value: readableName });
    averages[metricKey] = metricData.average;

    // 날짜 키들을 수집
    Object.keys(metricData.values).forEach((dateKey) => {
      allDateKeys.add(dateKey);
    });
  });

  // 날짜 키들을 정렬
  const sortedDateKeys = Array.from(allDateKeys).sort();

  // 차트 데이터 생성
  const data: ChartData[] = sortedDateKeys.map((dateKey) => {
    const chartItem: ChartData = { name: dateKey };

    // 각 메트릭의 값을 추가
    lineNames.forEach(({ key }) => {
      const metricData = resultData[key];
      chartItem[key] = metricData.values[dateKey] || 0;
    });

    return chartItem;
  });

  return {
    data,
    lineNames,
    averages,
  };
};

/**
 * 특정 메트릭들만 선택해서 차트 데이터로 변환
 * @author 홍규진
 */
export const parseSpecificMetricsToChartData = (
  resultData: ResultData,
  metricKeys: string[]
): ParsedChartData => {
  const lineNames: { key: string; value: string }[] = [];
  const averages: { [key: string]: number } = {};

  // 모든 날짜 키들을 수집
  const allDateKeys = new Set<string>();

  // 선택된 메트릭들만 처리
  metricKeys.forEach((metricKey) => {
    if (resultData[metricKey]) {
      const metricData = resultData[metricKey];
      const readableName = convertMetricKeyToReadableName(metricKey);
      lineNames.push({ key: metricKey, value: readableName });
      averages[metricKey] = metricData.average;

      // 날짜 키들을 수집
      Object.keys(metricData.values).forEach((dateKey) => {
        allDateKeys.add(dateKey);
      });
    }
  });

  // 날짜 키들을 정렬
  const sortedDateKeys = Array.from(allDateKeys).sort();

  // 차트 데이터 생성
  const data: ChartData[] = sortedDateKeys.map((dateKey) => {
    const chartItem: ChartData = { name: dateKey };

    // 선택된 메트릭들의 값만 추가
    lineNames.forEach(({ key }) => {
      const metricData = resultData[key];
      chartItem[key] = metricData.values[dateKey] || 0;
    });

    return chartItem;
  });

  return {
    data,
    lineNames,
    averages,
  };
};

/**
 * 단일 메트릭을 차트 데이터로 변환 (key 값을 통해서 파싱)
 * @author 홍규진
 */
export const parseSingleMetricToChartData = (
  resultData: ResultData,
  metricKey: string
): ParsedChartData => {
  return parseSpecificMetricsToChartData(resultData, [metricKey]);
};

/**
 * 메트릭 키를 사람이 읽기 쉬운 이름으로 변환
 * @author 홍규진
 */
const convertMetricKeyToReadableName = (metricKey: string): string => {
  const nameMap: { [key: string]: string } = {
    temperatureValues: "체온",
    bloodPressureSystolicValues: "수축기 혈압",
    bloodPressureDiastolicValues: "이완기 혈압",
    defecationCountValues: "대변 횟수",
    urinationCountValues: "소변 횟수",
  };

  return nameMap[metricKey] || metricKey;
};

/**
 * 평균값들을 문자열로 포맷팅 (소수점 1자리)
 * 여러 데이터마다 단위가 다르므로 따로 포맷팅(혈압은 두가지 다 중요하므로 따로 포맷팅)
 * undefined/null 값은 0으로 처리
 * @author 홍규진
 */
export const formatAveragesToString = (
  averages: { [key: string]: number },
  unit?: string
): string => {
  const formattedValues = Object.entries(averages).map(([_, value]) => {
    const safeValue = typeof value === "number" && !isNaN(value) ? value : 0;
    return `${safeValue.toFixed(1)}${unit ? ` ${unit}` : ""}`;
  });

  return `• ${formattedValues.join(" / ")}`;
};

/**
 * 단일 메트릭의 평균값을 문자열로 포맷팅 (소수점 1자리)
 * 여러 데이터마다 단위가 다르므로 따로 포맷팅(체온, 혈압, 회)
 * undefined/null 값은 0으로 처리
 * @author 홍규진
 */
export const formatSingleAverageToString = (
  average: number | undefined | null,
  unit?: string
): string => {
  const safeValue =
    typeof average === "number" && !isNaN(average) ? average : 0;
  return `${safeValue.toFixed(1)}${unit ? ` ${unit}` : ""}`;
};
