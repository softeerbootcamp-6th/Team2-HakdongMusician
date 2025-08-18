import { formatYYYYMMDD } from "@/utils/dateUtils";
import { useGetReportQuery } from "@/services/report/useReportQuery";

export const useDailyReport = () => {
  const {
    data: reportData,
    isLoading,
    isError,
  } = useGetReportQuery(formatYYYYMMDD(new Date()));

  // 데이터 파싱 헬퍼 함수들
  const getMealCardData = () => {
    return reportData?.fullReportDto.mealEntries.map((entry) => ({
      key: entry.key,
      value: entry.value,
      warningDescription: entry.warning || undefined,
      additionalInfo: entry.additionalInfo || undefined,
    }));
  };

  const getHealthCheckCardData = () => {
    return reportData?.fullReportDto.healthEntries.map((entry) => ({
      key: entry.key,
      value: entry.value,
      warningDescription: entry.warning || undefined,
      additionalInfo: entry.additionalInfo || undefined,
    }));
  };

  const getHealthImproveCardData = () => {
    return reportData?.fullReportDto.physicalEntries.map((entry) => ({
      key: entry.key,
      value: entry.value,
      specificDescription: entry.additionalInfo,
      additionalInfo: entry.additionalInfo || undefined,
    }));
  };

  const getCognitiveCardData = () => {
    return reportData?.fullReportDto.cognitiveEntries.map((entry) => ({
      key: entry.key,
      value: entry.value,
      specificDescription: entry.additionalInfo,
      additionalInfo: entry.additionalInfo || undefined,
    }));
  };

  // 개별 신체 건강 개선 카드 데이터
  const getIndividualHealthImproveCards = () => {
    return (
      reportData?.fullReportDto.physicalEntries.map((entry, index) => ({
        id: `physical-${index}`,
        data: [
          {
            key: entry.key,
            value: entry.value,
            specificDescription: entry.additionalInfo,
            additionalInfo: entry.additionalInfo || undefined,
          },
        ],
      })) ?? []
    );
  };

  // 개별 인지능력 카드 데이터
  const getIndividualCognitiveCards = () => {
    return (
      reportData?.fullReportDto.cognitiveEntries.map((entry, index) => ({
        id: `cognitive-${index}`,
        data: [
          {
            key: entry.key,
            value: entry.value,
            specificDescription: entry.additionalInfo,
          },
        ],
      })) ?? []
    );
  };

  const getHealthIndexCardData = () => {
    return [
      { title: "식사", value: reportData?.fullReportDto.mealScore ?? 0 },
      { title: "건강", value: reportData?.fullReportDto.healthScore ?? 0 },
      { title: "신체", value: reportData?.fullReportDto.physicalScore ?? 0 },
      { title: "인지", value: reportData?.fullReportDto.cognitiveScore ?? 0 },
    ];
  };

  const getHealthIndexChangeAmount = () => {
    return reportData?.fullReportDto.changeAmount ?? 0;
  };

  const getHealthIndexTotalScore = () => {
    return reportData?.fullReportDto.totalScore ?? 0;
  };

  // 각 카드의 footer 데이터
  const getMealCardFooter = () => ({
    score: reportData?.fullReportDto.mealCardFooter?.score ?? 15,
    memo: reportData?.fullReportDto.mealCardFooter?.additionalMemo ?? "",
  });

  const getHealthCardFooter = () => ({
    score: reportData?.fullReportDto.healthCardFooter?.score ?? 15,
    memo: reportData?.fullReportDto.healthCardFooter?.additionalMemo ?? "",
  });

  const getPhysicalCardFooter = () => ({
    score: reportData?.fullReportDto.physicalCardFooter?.score ?? 15,
    memo: reportData?.fullReportDto.physicalCardFooter?.additionalMemo ?? "",
  });

  const getCognitiveCardFooter = () => ({
    score: reportData?.fullReportDto.cognitiveCardFooter?.score ?? 15,
    memo: reportData?.fullReportDto.cognitiveCardFooter?.additionalMemo ?? "",
  });

  return {
    // 상태
    reportData,
    isLoading,
    isError,
    // 파싱된 데이터
    getMealCardData,
    getHealthCheckCardData,
    getHealthImproveCardData,
    getCognitiveCardData,
    getHealthIndexCardData,
    getHealthIndexTotalScore,
    getHealthIndexChangeAmount,
    // 개별 카드 데이터
    getIndividualHealthImproveCards,
    getIndividualCognitiveCards,

    // Footer 데이터
    getMealCardFooter,
    getHealthCardFooter,
    getPhysicalCardFooter,
    getCognitiveCardFooter,
  };
};
