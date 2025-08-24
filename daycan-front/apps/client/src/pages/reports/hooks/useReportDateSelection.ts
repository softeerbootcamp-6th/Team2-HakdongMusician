import { useState, useMemo, useEffect } from "react";
import { formatYYYYMM, formatYYYYMMDD } from "@/utils/dateUtils";
import {
  useGetReportQuery,
  useGetReportListQuery,
} from "@/services/report/useReportQuery";

export const useReportDateSelection = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(new Date());

  // 현재 표시 중인 월의 리포트 리스트만 가져오기
  const { data: reportListData } = useGetReportListQuery(
    formatYYYYMM(currentDisplayMonth)
  );

  // 현재 월의 리포트가 있는 날짜들만 추출
  const availableDates = useMemo(() => {
    if (!reportListData?.reportedDates) return [];

    return reportListData.reportedDates
      .map((dateStr) => new Date(dateStr))
      .sort((a, b) => a.getTime() - b.getTime());
  }, [reportListData]);

  // 최초 로딩 시 유효한 날짜 찾기
  useEffect(() => {
    if (availableDates.length > 0) {
      const today = new Date();
      const todayString = today.toDateString();

      // 오늘이 유효한 날인지 확인
      const isTodayValid = availableDates.some(
        (date) => date.toDateString() === todayString
      );

      if (!isTodayValid) {
        // 오늘이 유효하지 않으면 가장 가까운 날 찾기
        const closestDate = availableDates.reduce((closest, current) => {
          const todayTime = today.getTime();
          const closestDiff = Math.abs(closest.getTime() - todayTime);
          const currentDiff = Math.abs(current.getTime() - todayTime);

          return currentDiff < closestDiff ? current : closest;
        });

        setSelectedDate(closestDate);
        setCurrentDisplayMonth(closestDate);
      }
    }
  }, [availableDates]);

  // 현재 선택된 날짜의 리포트 데이터
  const {
    data: reportsData,
    isLoading,
    isError,
  } = useGetReportQuery(formatYYYYMMDD(selectedDate));

  // 캘린더에서 월이 변경될 때 호출
  const handleMonthChange = (date: Date) => {
    setCurrentDisplayMonth(date);
    // selectedDate는 변경하지 않음 - 사용자가 직접 선택하도록 함
  };

  // 캘린더 열기
  const openCalendar = () => {
    setCurrentDisplayMonth(selectedDate);
    setIsCalendarOpen(true);
  };

  // 캘린더 닫기
  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  // 날짜 선택
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // 날짜 확인
  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    closeCalendar();
  };

  return {
    // 상태
    isCalendarOpen,
    selectedDate,
    currentDisplayMonth,
    availableDates,
    reportsData,
    isLoading,
    isError,

    // 액션
    openCalendar,
    closeCalendar,
    handleDateSelect,
    handleDateConfirm,
    handleMonthChange,
  };
};
