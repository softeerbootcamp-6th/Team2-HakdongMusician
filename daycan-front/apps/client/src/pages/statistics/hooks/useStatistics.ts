import { useState } from "react";
import { DUMMY_MONTH_API_RESPONSE } from "../constants/dummy";
import {
  getDateRanges,
  parseSingleMetricToChartData,
  parseSpecificMetricsToChartData,
  calculateRangeViolations,
} from "../utils";

export const useStatistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1주일");
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  // result 부분만 추출
  const resultData = DUMMY_MONTH_API_RESPONSE;

  // API 데이터를 여러 차트로 나누어 파싱
  const temperatureData = parseSingleMetricToChartData(
    resultData,
    "temperatureValues"
  );
  const bloodPressureData = parseSpecificMetricsToChartData(resultData, [
    "bloodPressureSystolicValues",
    "bloodPressureDiastolicValues",
  ]);
  const defecationData = parseSingleMetricToChartData(
    resultData,
    "defecationCountValues"
  );
  const urinationData = parseSingleMetricToChartData(
    resultData,
    "urinationCountValues"
  );

  // 정상 범위 정의
  const normalRanges = {
    temperatureValues: [{ start: 36, end: 37.5 }],
    bloodPressureSystolicValues: [{ start: 90, end: 120 }],
    bloodPressureDiastolicValues: [{ start: 60, end: 80 }],
    defecationCountValues: [{ start: 1, end: 3 }],
    urinationCountValues: [{ start: 3, end: 6 }],
  };

  // 범위 위반 계산
  const temperatureViolations = calculateRangeViolations(
    temperatureData.data,
    "temperatureValues",
    normalRanges.temperatureValues
  );

  const bloodPressureViolations = {
    systolic: calculateRangeViolations(
      bloodPressureData.data,
      "bloodPressureSystolicValues",
      normalRanges.bloodPressureSystolicValues
    ),
    diastolic: calculateRangeViolations(
      bloodPressureData.data,
      "bloodPressureDiastolicValues",
      normalRanges.bloodPressureDiastolicValues
    ),
  };

  const defecationViolations = calculateRangeViolations(
    defecationData.data,
    "defecationCountValues",
    normalRanges.defecationCountValues
  );

  const urinationViolations = calculateRangeViolations(
    urinationData.data,
    "urinationCountValues",
    normalRanges.urinationCountValues
  );

  const currentDateRanges = getDateRanges(selectedPeriod);
  const currentDate = currentDateRanges[currentDateIndex];

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    setCurrentDateIndex(0);
  };

  const handleChevronClick = (direction: "left" | "right") => {
    const maxIndex = currentDateRanges.length - 1;
    if (direction === "left") {
      setCurrentDateIndex(
        currentDateIndex > 0 ? currentDateIndex - 1 : maxIndex
      );
    } else {
      setCurrentDateIndex(
        currentDateIndex < maxIndex ? currentDateIndex + 1 : 0
      );
    }
  };

  return {
    selectedPeriod,
    currentDate,
    currentDateRanges,
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
  };
};
