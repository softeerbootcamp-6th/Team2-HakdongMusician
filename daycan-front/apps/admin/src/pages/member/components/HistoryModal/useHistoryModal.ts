import { useGetCareSheetDetailQuery } from "@/services/careSheet/useCareSheetQuery";
import { useGetDocumentListQuery } from "@/services/document/useDocumentQuery";
import { useGetReportDetailQuery } from "@/services/report/useReportQuery";
import type { YearMonth, YearMonthDay } from "@/types/date";
import { useState } from "react";

export const useHistoryModal = (memberId: number, selectedMonth: Date) => {
  const [isOpen, setIsOpen] = useState(false);
  const [careSheetDate, setCareSheetDate] = useState<YearMonthDay | null>(null);
  const [careSheetMemberId, setCareSheetMemberId] = useState<number | null>(
    null
  );
  const [reportDate, setReportDate] = useState<YearMonthDay | null>(null);
  const [reportMemberId, setReportMemberId] = useState<number | null>(null);

  // selectedMonth를 YYYY-MM 형식으로 변환
  const currentMonth: YearMonth =
    `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, "0")}` as YearMonth;

  const { data: documentList, isLoading: isDocumentListLoading } =
    useGetDocumentListQuery(memberId, currentMonth);

  // CareSheet 쿼리 - careSheetId가 설정되었을 때만 실행
  const { data: careSheetData } = useGetCareSheetDetailQuery(
    careSheetDate!,
    careSheetMemberId!,
    !!careSheetDate && !!careSheetMemberId
  );

  // Report 쿼리 - reportDate와 reportMemberId가 설정되었을 때만 실행
  const { data: reportData } = useGetReportDetailQuery(
    reportDate!,
    reportMemberId!,
    !!(reportDate && reportMemberId)
  );

  // ===== CareSheet 데이터 조회 함수 =====
  const fetchCareSheetData = (date: YearMonthDay, memberId: number) => {
    setCareSheetDate(date);
    setCareSheetMemberId(memberId);
  };

  // ===== Report 데이터 조회 함수 =====
  const fetchReportData = (yyyymmdd: YearMonthDay, memberId: number) => {
    setReportDate(yyyymmdd);
    setReportMemberId(memberId);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    // 모달 닫을 때 상태 초기화
    setCareSheetDate(null);
    setCareSheetMemberId(null);
    setReportDate(null);
    setReportMemberId(null);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    documentList,
    isDocumentListLoading,
    careSheetData,
    fetchCareSheetData,
    reportData,
    fetchReportData,
  };
};
