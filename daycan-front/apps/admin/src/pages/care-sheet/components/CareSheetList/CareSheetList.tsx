import { Body, Chip, COLORS } from "@daycan/ui";
import {
  container,
  headerContainer,
  headerButton,
  itemsContainer,
  sectionTitle,
} from "./CareSheetList.css";
import type { TCareSheetListItem } from "@/services/careSheet/types";
import { CareSheetListItem } from "../CareSheetListItem";
import { CareSheetListHeader } from "../CareSheetListHeader";

interface CareSheetListProps {
  careSheets: TCareSheetListItem[];
  status: "NOT_APPLICABLE" | "APPLICABLE";
  onProcessItems?: () => void;
  timeLeft?: string;
  hasCheckedItems: boolean;
  // 전체 선택 상태를 props로 받기
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectAll: (checked: boolean) => void;
  // 체크 관련 상태와 핸들러도 props로 받기
  checkedCareSheetIds: Set<number>;
  onItemCheck: (careSheetId: number, checked: boolean) => void;
}

export const CareSheetList = ({
  careSheets,
  status,
  onProcessItems,
  timeLeft,
  hasCheckedItems,
  isAllSelected,
  isIndeterminate,
  onSelectAll,
  checkedCareSheetIds,
  onItemCheck,
}: CareSheetListProps) => {
  // 상황에 따른 제목과 버튼 텍스트 설정
  const getSectionInfo = () => {
    if (status === "APPLICABLE") {
      return {
        title: "출석인원",
        buttonText: "결석 처리",
        count: careSheets.length,
      };
    } else {
      return {
        title: "결석인원",
        buttonText: "출석 처리",
        count: careSheets.length,
      };
    }
  };

  const sectionInfo = getSectionInfo();

  return (
    <div className={container}>
      {/* 섹션 제목 */}
      <div className={sectionTitle}>
        <Body type="medium" weight={600} color={COLORS.gray[800]}>
          {sectionInfo.title}
        </Body>
        <Chip color="grayDark" round="l">
          {sectionInfo.count}
        </Chip>
      </div>

      <div className={headerContainer}>
        <div
          className={headerButton}
          onClick={onProcessItems}
          style={{
            cursor: hasCheckedItems ? "pointer" : "not-allowed",
          }}
        >
          <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
            {sectionInfo.buttonText}
          </Body>
        </div>
        <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
          {status === "APPLICABLE" ? timeLeft : ""}
        </Body>
      </div>

      {/* 작성 필요 섹션 */}
      <CareSheetListHeader
        isAllSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        onSelectAll={onSelectAll}
        showCheckbox={true}
      />
      <div className={itemsContainer}>
        {careSheets.map((careSheet, index) => {
          // 상태에 따라 선택 가능 여부 결정
          const isSelectable =
            status === "APPLICABLE" ? careSheet.status !== "DONE" : true; // 결석 인원은 모두 선택 가능

          return (
            <CareSheetListItem
              key={careSheet.memberMeta.memberId}
              careSheet={careSheet}
              index={index}
              isChecked={checkedCareSheetIds.has(careSheet.memberMeta.memberId)}
              onCheckChange={(checked) =>
                onItemCheck(careSheet.memberMeta.memberId, checked)
              }
              isSelectable={isSelectable}
            />
          );
        })}
      </div>
    </div>
  );
};
