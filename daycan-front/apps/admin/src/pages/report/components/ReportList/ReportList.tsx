import { ReportListHeader } from "../ReportListHeader/ReportListHeader";
import { ReportListItem } from "../ReportListItem/ReportListItem";
import { ReportReviewModal } from "../ReportReviewModal/ReportReviewModal";
import { Body, COLORS } from "@daycan/ui";
import { reportListContainer } from "./ReportList.css";
import { useReports } from "../../hooks/useReport";
import { useState } from "react";
import { overlayScroll } from "@/styles/scroll.css.ts";
import type { TReportListItem } from "@/services/report/types";

interface ReportListProps {
  reports?: TReportListItem[];
  showCheckbox?: boolean;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
  onSelectAll?: (checked: boolean) => void;
}

export const ReportList = ({
  reports = [],
  showCheckbox = true,
  isAllSelected = false,
  isIndeterminate = false,
  onSelectAll,
}: ReportListProps) => {
  const { checkedMemberIds, handleCheckChange } = useReports();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  const handleReviewRequest = (memberId: number, reportId: number) => {
    setSelectedMemberId(memberId);
    setSelectedReportId(reportId);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedMemberId(null);
    setSelectedReportId(null);
  };

  // 리포트가 없으면 빈 상태 렌더링
  if (reports.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: COLORS.gray[500],
          backgroundColor: COLORS.white,
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <Body type="medium" weight={500}>
          리포트가 없습니다.
        </Body>
      </div>
    );
  }

  return (
    <div>
      <ReportListHeader
        showCheckbox={showCheckbox}
        isAllSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        onSelectAll={onSelectAll}
      />
      <div className={`${reportListContainer} ${overlayScroll}`}>
        {reports.map((report, index) => {
          const isSelectable = report.status === "REVIEWED";
          const isChecked = checkedMemberIds.has(
            Number(report.memberMetaEntry.memberId)
          );
          return (
            <ReportListItem
              key={report.id}
              report={report}
              index={index}
              isChecked={isChecked}
              onCheckChange={handleCheckChange}
              isSelectable={isSelectable}
              onReviewRequest={handleReviewRequest}
            />
          );
        })}
      </div>
      <ReportReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        memberId={selectedMemberId!}
        reportId={selectedReportId!}
      />
    </div>
  );
};
