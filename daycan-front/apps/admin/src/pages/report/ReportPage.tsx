import { PageToolbar, Filter } from "@/components";
import { reportContainer, reportButtons } from "./ReportPage.css";
import { Button, Heading, Icon, Body, COLORS } from "@daycan/ui";
import { useRef, useMemo } from "react";
import type { FilterItem } from "@/components/Filter";
import { ReportList } from "./components/ReportList/ReportList";
import { mockSendedReports } from "./constants/dummy";
import { useReports } from "./hooks/useReport";

export const ReportPage = () => {
  const {
    // 데이터 상태
    filteredReports,
    isLoading,
    error,

    // UI 상태
    selectedStatus,
    resetCounter,
    checkedReportIds,
    hasCheckedItems,

    // 선택 상태 (각 리스트별)
    isAllSelectedFiltered,
    isIndeterminateFiltered,

    isAllSelectedSended,
    isIndeterminateSended,

    // 액션 핸들러
    handleFilterReset,
    handleStatusFilterChange,
    handleSelectAllFiltered,
    handleSelectAllSended,
    handleImmediateSend,
    handleReserveSend,
  } = useReports();

  // 실제로 전송 가능한 항목의 개수 계산
  const sendableCheckedCount = useMemo(() => {
    return Array.from(checkedReportIds).filter((id) =>
      filteredReports.some(
        (report) => report.id === id && report.status === "REVIEWED"
      )
    ).length;
  }, [checkedReportIds, filteredReports]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className={reportContainer}>
        <PageToolbar>
          <Heading>리포트 전송</Heading>
        </PageToolbar>
        <Body type="large" weight={600} color={COLORS.gray[700]}>
          로딩 중...
        </Body>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className={reportContainer}>
        <PageToolbar>
          <Heading>리포트 전송</Heading>
        </PageToolbar>
        <Body type="large" weight={600} color={COLORS.red[500]}>
          에러가 발생했습니다: {error.message}
        </Body>
      </div>
    );
  }

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
            onClick={handleReserveSend}
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
            onClick={handleImmediateSend}
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

      {/* 전송 전 리포트 목록 */}
      <ReportList
        reports={filteredReports}
        isAllSelected={isAllSelectedFiltered}
        isIndeterminate={isIndeterminateFiltered}
        onSelectAll={handleSelectAllFiltered}
      />

      {/* 전송 완료 리포트 */}
      <Body
        type="large"
        weight={600}
        color={COLORS.gray[700]}
        style={{ marginTop: "50px" }}
      >
        전송 완료 리포트
      </Body>

      {/* 전송 완료 리포트 목록 */}
      <ReportList
        reports={mockSendedReports}
        showCheckbox={true}
        isAllSelected={isAllSelectedSended}
        isIndeterminate={isIndeterminateSended}
        onSelectAll={handleSelectAllSended}
      />
    </div>
  );
};
