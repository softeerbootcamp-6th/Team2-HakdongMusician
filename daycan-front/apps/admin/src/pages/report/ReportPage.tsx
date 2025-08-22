import { PageToolbar, Filter } from "@/components";
import { reportContainer, reportButtons } from "./ReportPage.css";
import { Button, Heading, Icon, Body, COLORS } from "@daycan/ui";
import { useRef, useMemo } from "react";
import type { FilterItem } from "@/components/Filter";
import { ReportList, ReserveSendModal, ImmediateSendModal } from "./components";
import { useReports } from "./hooks/useReport";
import { SkeletonList } from "@/components/SkeletonList";
import { REPORT_LIST_GRID_TEMPLATE } from "./constants/grid";
import { ReportListHeader } from "./components/ReportListHeader";

/**
 * 전송 완료 리포트 목록용 스켈레톤 UI
 */
const SkeletonReportList = () => {
  return (
    <div>
      <SkeletonList
        title="리포트 전송"
        itemCount={3}
        gridTemplate={REPORT_LIST_GRID_TEMPLATE}
        columnsLength={8}
        containerClassName={reportContainer}
      >
        <ReportListHeader />
      </SkeletonList>
    </div>
  );
};

export const ReportPage = () => {
  const {
    // 데이터 상태
    filteredReports,
    sendedReports,
    isLoading,
    // UI 상태
    selectedStatus,
    resetCounter,
    checkedMemberIds,
    hasCheckedItems,
    isAllSelectedSended,
    isIndeterminateSended,
    handleSelectAllSended,
    isAllSelectedFiltered,
    isIndeterminateFiltered,
    handleSelectAllFiltered,
    // 액션 핸들러
    handleFilterReset,
    handleStatusFilterChange,

    handleImmediateSend,
    handleReserveSend,
    isReserveSendModalOpen,
    isImmediateSendModalOpen,
    setIsReserveSendModalOpen,
    setIsImmediateSendModalOpen,
  } = useReports();

  // 실제로 전송 가능한 항목의 개수 계산
  const sendableCheckedCount = useMemo(() => {
    return Array.from(checkedMemberIds).filter((memberId) =>
      filteredReports.some(
        (report) =>
          report.memberMetaEntry.memberId === memberId &&
          report.status === "REVIEWED"
      )
    ).length;
  }, [checkedMemberIds, filteredReports]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filterItems: FilterItem[] = [
    {
      icon: <Icon name="reset" />,
      onClick: handleFilterReset,
    },
    {
      text: "상태별 필터",
      options: ["검토 완료", "검토 대기", "검토 불가능"],
      onSelect: handleStatusFilterChange,
    },
  ];

  return (
    <div className={reportContainer}>
      <PageToolbar>
        <Heading>리포트 전송</Heading>
        <div className={reportButtons}>
          <Button
            variant="unEmphasized"
            size="fullWidth"
            onClick={() => setIsReserveSendModalOpen(true)}
            disabled={!hasCheckedItems}
          >
            <Icon name="alarm" width={20} height={20} />
            <Body type="medium" weight={600} color={COLORS.gray[700]}>
              예약전송 ({sendableCheckedCount})
            </Body>
          </Button>
          <Button
            variant="primary"
            size="fullWidth"
            onClick={() => setIsImmediateSendModalOpen(true)}
            disabled={!hasCheckedItems}
          >
            <Body type="medium" weight={600} color={COLORS.gray[700]}>
              즉시 전송 ({sendableCheckedCount})
            </Body>
          </Button>
        </div>
      </PageToolbar>

      {/* 리포트 필터 */}
      <Body type="large" weight={600} color={COLORS.gray[700]}>
        전송이 필요한 리포트
        {selectedStatus && (
          <span
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: COLORS.gray[500],
              marginLeft: "8px",
            }}
          >
            ({filteredReports.length}개)
          </span>
        )}
      </Body>

      <Filter resetKey={resetCounter} items={filterItems} ref={dropdownRef} />

      {isLoading ? (
        <SkeletonReportList />
      ) : (
        <ReportList
          reports={filteredReports}
          isAllSelected={isAllSelectedFiltered}
          isIndeterminate={isIndeterminateFiltered}
          onSelectAll={handleSelectAllFiltered}
        />
      )}

      {/* 전송 완료 리포트 */}
      <Body
        type="large"
        weight={600}
        color={COLORS.gray[200]}
        style={{ marginTop: "50px" }}
      >
        전송 완료 리포트
      </Body>

      {isLoading ? (
        <SkeletonReportList />
      ) : (
        <ReportList
          reports={sendedReports}
          showCheckbox={true}
          isAllSelected={isAllSelectedSended}
          isIndeterminate={isIndeterminateSended}
          onSelectAll={handleSelectAllSended}
        />
      )}

      <ReserveSendModal
        isOpen={isReserveSendModalOpen}
        onClose={() => setIsReserveSendModalOpen(false)}
        onSend={handleReserveSend}
      />
      <ImmediateSendModal
        isOpen={isImmediateSendModalOpen}
        onClose={() => setIsImmediateSendModalOpen(false)}
        onSend={handleImmediateSend}
      />
    </div>
  );
};
