import type { TCareSheetReadResponse } from "@/services/careSheet/types";
import { useGetCareSheetDetailQuery } from "@/services/careSheet/useCareSheetQuery";
import { useGetDocumentListQuery } from "@/services/document/useDocumentQuery";
import type { TReportReadResponse } from "@/services/report/types";
import { useGetReportDetailQuery } from "@/services/report/useReportQuery";
import type { YearMonthDay } from "@/types/date";
import { TODAY_YYYYMM } from "@/utils/dateFormatter";
import { useState } from "react";

export const useHistoryModal = (memberId: number) => {
  const { data: documentList, isLoading: isDocumentListLoading } =
    useGetDocumentListQuery(memberId, TODAY_YYYYMM);
  const [isOpen, setIsOpen] = useState(false);
  const [reportData, setReportData] = useState<TReportReadResponse | null>(
    null
  );
  const [careSheetData, setCareSheetData] =
    useState<TCareSheetReadResponse | null>(null);

  // ===== CareSheet 데이터 조회 함수 =====
  const fetchCareSheetData = (careSheetId: number) => {
    const { data: careSheetData } = useGetCareSheetDetailQuery(careSheetId);

    setCareSheetData(careSheetData ?? null);
  };

  // ===== Report 데이터 조회 함수 =====
  const fetchReportData = (yyyymmdd: YearMonthDay, memberId: number) => {
    const { data: reportData } = useGetReportDetailQuery(
      yyyymmdd,
      memberId,
      true
    );
    setReportData(reportData ?? null);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
