import { PageToolbar } from "@/components/PageToolbar";
import { Body, Heading, COLORS } from "@daycan/ui";
import { careSheetContainer } from "./CareSheetPage.css";
import { CareSheetList } from "./components/CareSheetList";
import { useCareSheets } from "./hooks/useCareSheet";

export const CareSheetPage = () => {
  const {
    // 데이터 상태
    applicableCareSheets,
    notApplicableCareSheets,

    isLoading,
    error,
    timeLeft,
    hasCheckedApplicableItems,
    hasCheckedNotApplicableItems,

    // 체크 관련 상태
    checkedCareSheetIds,

    // 선택 상태 (각 리스트별)
    isAllSelectedApplicable,
    isIndeterminateApplicable,
    isAllSelectedNotApplicable,
    isIndeterminateNotApplicable,

    // 액션 핸들러
    handleProcessApplicable,
    handleProcessNotApplicable,
    handleApplicableSelectAll,
    handleNotApplicableSelectAll,
    handleItemCheck,
  } = useCareSheets();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className={careSheetContainer}>
        <PageToolbar>
          <Heading>기록지 관리</Heading>
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
      <div className={careSheetContainer}>
        <PageToolbar>
          <Heading>기록지 관리</Heading>
        </PageToolbar>
        <Body type="large" weight={600} color={COLORS.red[500]}>
          에러가 발생했습니다: {error.message}
        </Body>
      </div>
    );
  }

  return (
    <div className={careSheetContainer}>
      <PageToolbar>
        <Heading>기록지 관리</Heading>
      </PageToolbar>

      <Body type="small" weight={400} color={COLORS.gray[600]}>
        작성 필요 상태의 기록지는 매일 자정 작성 지연으로 전환되고 말일이 지나면
        모든 지연된 기록지는 여기서 사라져요.
      </Body>

      {/* 출석 인원 */}
      <CareSheetList
        careSheets={applicableCareSheets.result}
        status="APPLICABLE"
        onProcessItems={handleProcessApplicable}
        timeLeft={timeLeft}
        hasCheckedItems={hasCheckedApplicableItems}
        isAllSelected={isAllSelectedApplicable}
        isIndeterminate={isIndeterminateApplicable}
        onSelectAll={handleApplicableSelectAll}
        checkedCareSheetIds={checkedCareSheetIds}
        onItemCheck={handleItemCheck}
      />

      {/* 결석 인원 */}
      <CareSheetList
        careSheets={notApplicableCareSheets.result}
        status="NOT_APPLICABLE"
        onProcessItems={handleProcessNotApplicable}
        hasCheckedItems={hasCheckedNotApplicableItems}
        isAllSelected={isAllSelectedNotApplicable}
        isIndeterminate={isIndeterminateNotApplicable}
        onSelectAll={handleNotApplicableSelectAll}
        checkedCareSheetIds={checkedCareSheetIds}
        onItemCheck={handleItemCheck}
      />
    </div>
  );
};
