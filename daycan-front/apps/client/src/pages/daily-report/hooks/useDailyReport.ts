import { useState, useEffect } from "react";
import { DUMMY_REPORT_DATA, DUMMY_REPORT_DATA_2 } from "../constants/dummy";
import type { TReport } from "@/services/report/types";

export const useDailyReport = () => {
  const [reportData, setReportData] = useState<TReport>(DUMMY_REPORT_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 더미 데이터를 시뮬레이션하는 함수
  const fetchReportData = async (date: Date) => {
    setIsLoading(true);
    setError(null);

    try {
      // 실제 API 호출을 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 200));

      // 날짜에 따라 다른 데이터 반환 (예시)
      const day = date.getDate();
      if (day % 2 === 0) {
        setReportData(DUMMY_REPORT_DATA); // 좋은 컨디션
      } else {
        setReportData(DUMMY_REPORT_DATA_2); // 컨디션 저하
      }
    } catch (err) {
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 날짜 변경 시 데이터 새로고침
  const refreshData = (date: Date) => {
    fetchReportData(date);
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchReportData(new Date());
  }, []);

  // 데이터 파싱 헬퍼 함수들
  const getMealCardData = () => {
    return reportData.mealEntries.map((entry) => ({
      key: entry.key,
      value: entry.value,
      warningDescription: entry.warning || undefined,
    }));
  };

  const getHealthCheckCardData = () => {
    return reportData.healthEntries.map((entry) => ({
      key: entry.key,
      value: entry.value,
    }));
  };

  const getHealthImproveCardData = () => {
    return reportData.physicalEntries.map((entry) => ({
      key: entry.key,
      value: entry.value,
    }));
  };

  const getCognitiveCardData = () => {
    return reportData.cognitiveEntries.map((entry) => ({
      key: entry.key,
      value: entry.value,
      specificDescription: entry.additionalInfo,
    }));
  };

  const getHealthIndexCardData = () => {
    return [
      { title: "식사", value: reportData.mealScore },
      { title: "건강", value: reportData.healthScore },
      { title: "신체", value: reportData.physicalScore },
      { title: "인지", value: reportData.cognitiveScore },
    ];
  };

  const getHealthIndexDescription = () => {
    const changeAmount = reportData.changeAmount;

    if (changeAmount > 0) {
      return `${changeAmount}점 올랐어요! 정말 대단해요! 🎉`;
    } else if (changeAmount < 0) {
      return `${Math.abs(changeAmount)}점 내려갔어요. 컨디션을 체크해보세요.`;
    } else {
      return "동일한 점수를 유지하고 있어요.";
    }
  };

  // 각 카드의 footer 데이터
  const getMealCardFooter = () => ({
    score: reportData.mealCardFooter.score,
    memo: reportData.mealCardFooter.additionalMemo,
  });

  const getHealthCardFooter = () => ({
    score: reportData.healthCardFooter.score,
    memo: reportData.healthCardFooter.additionalMemo,
  });

  const getPhysicalCardFooter = () => ({
    score: reportData.physicalCardFooter.score,
    memo: reportData.physicalCardFooter.additionalMemo,
  });

  const getCognitiveCardFooter = () => ({
    score: reportData.CognitiveCardFooter.score,
    memo: reportData.CognitiveCardFooter.additionalMemo,
  });

  return {
    // 상태
    reportData,
    isLoading,
    error,

    // 액션
    refreshData,

    // 파싱된 데이터
    getMealCardData,
    getHealthCheckCardData,
    getHealthImproveCardData,
    getCognitiveCardData,
    getHealthIndexCardData,
    getHealthIndexDescription,

    // Footer 데이터
    getMealCardFooter,
    getHealthCardFooter,
    getPhysicalCardFooter,
    getCognitiveCardFooter,
  };
};
