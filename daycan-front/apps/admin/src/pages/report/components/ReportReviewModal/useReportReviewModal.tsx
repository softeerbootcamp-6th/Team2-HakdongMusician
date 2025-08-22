import { useState, useEffect } from "react";
import { useGetReportDetailQuery } from "@/services/report/useReportQuery";
import type {
  TReportEditRequest,
  TReportEntry,
  TReportReadResponse,
} from "@/services/report/types";
import { TODAY_DATE } from "@/utils/dateFormatter";
import { useReviewReportMutation } from "@/services/report/useReportMutation";
// import { mockReportDetail } from "../../constants/dummy";

interface UseReviewModalProps {
  reportId: number;
  memberId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const useReportReviewModal = ({
  reportId,
  memberId,
  isOpen,
  onClose,
}: UseReviewModalProps) => {
  const { data: reportDetail, isLoading } = useGetReportDetailQuery(
    TODAY_DATE,
    memberId,
    isOpen
  );
  const { mutate: reviewReport } = useReviewReportMutation();

  // 수정 가능한 데이터 상태
  const [editableData, setEditableData] = useState<TReportEditRequest>({
    reportId,
    mealEntries: [],
    physicalEntries: [],
    cognitiveEntries: [],
    healthEntries: [],
    mealMemo: "",
    healthMemo: "",
    physicalMemo: "",
    cognitiveMemo: "",
  });

  // reportDetail이 변경될 때마다 editableData 초기화
  useEffect(() => {
    if (reportDetail) {
      setEditableData({
        reportId,
        mealEntries: reportDetail.mealEntries || [],
        physicalEntries: reportDetail.physicalEntries || [],
        cognitiveEntries: reportDetail.cognitiveEntries || [],
        healthEntries: reportDetail.healthEntries || [],
        mealMemo: reportDetail.mealCardFooter?.additionalMemo || "",
        healthMemo: reportDetail.healthCardFooter?.additionalMemo || "",
        physicalMemo: reportDetail.physicalCardFooter?.additionalMemo || "",
        cognitiveMemo: reportDetail.cognitiveCardFooter?.additionalMemo || "",
      });
    }
  }, [reportDetail]);

  const handleEntryChange = (
    category:
      | "mealEntries"
      | "physicalEntries"
      | "cognitiveEntries"
      | "healthEntries",
    index: number,
    field: keyof TReportEntry,
    value: string
  ) => {
    setEditableData((prev) => ({
      ...prev,
      [category]: prev[category]?.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      ),
    }));
  };

  const handleMemoChange = (field: string, value: string) => {
    setEditableData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAndClose = () => {
    reviewReport({
      reportId,
      editRequest: editableData,
    });
    onClose();
  };

  // 수정된 데이터로 리포트 객체 생성
  const getUpdatedReportData = (): TReportReadResponse | null => {
    if (!reportDetail) return null;

    // cardFooter 업데이트 헬퍼 함수
    const updateCardFooter = (originalFooter: any, memo: string) => ({
      ...originalFooter,
      additionalMemo: memo,
    });

    return {
      ...reportDetail,
      mealEntries: editableData.mealEntries,
      physicalEntries: editableData.physicalEntries,
      cognitiveEntries: editableData.cognitiveEntries,
      healthEntries: editableData.healthEntries,
      mealCardFooter: updateCardFooter(
        reportDetail.mealCardFooter,
        editableData.mealMemo
      ),
      healthCardFooter: updateCardFooter(
        reportDetail.healthCardFooter,
        editableData.healthMemo
      ),
      physicalCardFooter: updateCardFooter(
        reportDetail.physicalCardFooter,
        editableData.physicalMemo
      ),
      cognitiveCardFooter: updateCardFooter(
        reportDetail.cognitiveCardFooter,
        editableData.cognitiveMemo
      ),
    };
  };

  return {
    reportDetail,
    isLoading,
    editableData,
    handleEntryChange,
    handleMemoChange,
    handleSaveAndClose,
    getUpdatedReportData,
  };
};
