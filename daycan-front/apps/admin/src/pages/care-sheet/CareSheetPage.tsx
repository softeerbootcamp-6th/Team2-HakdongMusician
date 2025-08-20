import { PageToolbar } from "@/components/PageToolbar";
import { Body, Heading, COLORS } from "@daycan/ui";
import { careSheetContainer } from "./CareSheetPage.css";
import { CareSheetList } from "./components/CareSheetList";
import { useCareSheets } from "./hooks/useCareSheet";
import { SkeletonCareSheetList } from "./components/SkeletonCareSheetList";

export const CareSheetPage = () => {
  const {
    applicableCareSheets,
    timeLeft,
    hasCheckedApplicableItems,
    isAllSelectedApplicable,
    isIndeterminateApplicable,
    handleProcessApplicable,
    handleApplicableSelectAll,
    checkedCareSheetIds,
    handleItemCheck,
    notApplicableCareSheets,
    hasCheckedNotApplicableItems,
    isAllSelectedNotApplicable,
    isIndeterminateNotApplicable,
    handleProcessNotApplicable,
    handleNotApplicableSelectAll,
    isLoading,
  } = useCareSheets();

  return (
    <div className={careSheetContainer}>
      <PageToolbar>
        <Heading>기록지 관리</Heading>
      </PageToolbar>

      <Body type="small" weight={400} color={COLORS.gray[600]}>
        작성 필요 상태의 기록지는 매일 자정 작성 지연으로 전환되고 말일이 지나면
        모든 지연된 기록지는 여기서 사라져요.
      </Body>

      {/* 출석 인원 - Suspense로 감싸기 */}
      {isLoading ? (
        <SkeletonCareSheetList
          title="기록지 관리"
          description="출석인원"
          itemCount={3}
        />
      ) : (
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
      )}

      {/* 결석 인원 - Suspense로 감싸기 */}
      {isLoading ? (
        <SkeletonCareSheetList
          title="기록지 관리"
          description="결석인원"
          itemCount={2}
        />
      ) : (
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
      )}
    </div>
  );
};
