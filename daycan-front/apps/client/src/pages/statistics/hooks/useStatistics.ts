import { useState } from "react";

import type { YearMonth, YearMonthDay } from "@/types/date";
import {
  useGetStatisticDataQuery,
  useGetStatisticMonthDataQuery,
} from "@/services/statistic/useStatisticQuery";
import {
  getDateRanges,
  parseSingleMetricToChartData,
  parseSpecificMetricsToChartData,
  calculateRangeViolations,
} from "../utils";

export const useStatistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "1주일" | "1개월" | "6개월"
  >("1주일");
  const [currentOffset, setCurrentOffset] = useState(0);

  // 기간에 따라 다른 데이터 타입 사용
  const is6MonthPeriod = selectedPeriod === "6개월";

  const currentDateRanges = getDateRanges(selectedPeriod, currentOffset);
  const currentDate = currentDateRanges[0];

  // 기간에 따라 다른 API 호출 (조건부 실행)
  const dailyQuery = useGetStatisticDataQuery(
    currentDate.start as YearMonthDay,
    currentDate.end as YearMonthDay,
    !is6MonthPeriod // 6개월이 아닐 때만 실행
  );

  const monthlyQuery = useGetStatisticMonthDataQuery(
    currentDate.start as YearMonth,
    currentDate.end as YearMonth,
    is6MonthPeriod // 6개월일 때만 실행
  );

  // 기간에 따라 적절한 쿼리 결과 사용
  const queryResult = is6MonthPeriod ? monthlyQuery : dailyQuery;

  // 실제 API 데이터 사용
  const resultData = queryResult.data;

  const dailyScoreData = resultData
    ? parseSingleMetricToChartData(resultData, "dailyScoreValues")
    : { data: [], lineNames: [], averages: { dailyScoreValues: 0 } };

  // API 데이터를 여러 차트로 나누어 파싱 (데이터가 있는 경우에만)
  const temperatureData = resultData
    ? parseSingleMetricToChartData(resultData, "temperatureValues")
    : { data: [], lineNames: [], averages: { temperatureValues: 0 } };

  const bloodPressureData = resultData
    ? parseSpecificMetricsToChartData(resultData, [
        "bloodPressureSystolicValues",
        "bloodPressureDiastolicValues",
      ])
    : {
        data: [],
        lineNames: [],
        averages: {
          bloodPressureSystolicValues: 0,
          bloodPressureDiastolicValues: 0,
        },
      };

  const defecationData = resultData
    ? parseSingleMetricToChartData(resultData, "defecationCountValues")
    : { data: [], lineNames: [], averages: { defecationCountValues: 0 } };

  const urinationData = resultData
    ? parseSingleMetricToChartData(resultData, "urinationCountValues")
    : { data: [], lineNames: [], averages: { urinationCountValues: 0 } };

  // 정상 범위 정의
  const normalRanges = {
    temperatureValues: [{ start: 36, end: 37.5 }],
    bloodPressureSystolicValues: [{ start: 90, end: 120 }],
    bloodPressureDiastolicValues: [{ start: 60, end: 80 }],
    defecationCountValues: [{ start: 1, end: 3 }],
    urinationCountValues: [{ start: 3, end: 6 }],
  };

  // 범위 위반 계산 (데이터가 있는 경우에만)
  const temperatureViolations =
    temperatureData.data.length > 0
      ? calculateRangeViolations(
          temperatureData.data,
          "temperatureValues",
          normalRanges.temperatureValues
        )
      : { count: 0, percentage: 0, totalDataPoints: 0 };

  const bloodPressureViolations = {
    systolic:
      bloodPressureData.data.length > 0
        ? calculateRangeViolations(
            bloodPressureData.data,
            "bloodPressureSystolicValues",
            normalRanges.bloodPressureSystolicValues
          )
        : { count: 0, percentage: 0, totalDataPoints: 0 },
    diastolic:
      bloodPressureData.data.length > 0
        ? calculateRangeViolations(
            bloodPressureData.data,
            "bloodPressureDiastolicValues",
            normalRanges.bloodPressureDiastolicValues
          )
        : { count: 0, percentage: 0, totalDataPoints: 0 },
  };

  const defecationViolations =
    defecationData.data.length > 0
      ? calculateRangeViolations(
          defecationData.data,
          "defecationCountValues",
          normalRanges.defecationCountValues
        )
      : { count: 0, percentage: 0, totalDataPoints: 0 };

  const urinationViolations =
    urinationData.data.length > 0
      ? calculateRangeViolations(
          urinationData.data,
          "urinationCountValues",
          normalRanges.urinationCountValues
        )
      : { count: 0, percentage: 0, totalDataPoints: 0 };

  const handlePeriodChange = (value: "1주일" | "1개월" | "6개월") => {
    setSelectedPeriod(value);
    setCurrentOffset(0);
  };

  const handleChevronClick = (direction: "left" | "right") => {
    if (direction === "left") {
      // 이전 기간으로 이동 (과거로)
      setCurrentOffset(currentOffset + 1);
    } else {
      // 다음 기간으로 이동 (미래로, 0까지만)
      setCurrentOffset(Math.max(currentOffset - 1, 0));
    }
  };

  return {
    selectedPeriod,
    currentDate,
    currentDateRanges,
    dailyScoreData,
    temperatureData,
    bloodPressureData,
    defecationData,
    urinationData,
    temperatureViolations,
    bloodPressureViolations,
    defecationViolations,
    urinationViolations,
    normalRanges,
    handlePeriodChange,
    handleChevronClick,
    // 쿼리 상태
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
  };
};
