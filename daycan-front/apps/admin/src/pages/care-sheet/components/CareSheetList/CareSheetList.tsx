import { Body, Chip, COLORS } from "@daycan/ui";
import {
  container,
  headerContainer,
  headerButton,
  itemsContainer,
  sectionTitle,
} from "./CareSheetList.css";
import type { CareSheetListItemType } from "../../constants/dummy";
import { CareSheetListItem } from "../CareSheetListItem";
import { CareSheetListHeader } from "../CareSheetListHeader";
import { useCareSheet } from "../../hooks/useCareSheet";

interface CareSheetListProps {
  careSheets: CareSheetListItemType;
  status: "NOT_APPLICABLE" | "APPLICABLE";
  onProcessItems?: (checkedIds: number[]) => void;
}

export const CareSheetList = ({
  careSheets,
  status,
  onProcessItems,
}: CareSheetListProps) => {
  const {
    timeLeft,
    filteredCareSheets,
    isCheckedItems,
    isAllSelected,
    isIndeterminate,
    hasCheckedItems,
    handleSelectAll,
    handleItemCheck,
    getCheckedIds,
  } = useCareSheet({ careSheets, status });

  // 처리 버튼 클릭 시 체크된 ID들 수집해서 전달
  const handleProcessClick = () => {
    if (onProcessItems && hasCheckedItems) {
      const checkedIds = getCheckedIds();
      onProcessItems(checkedIds);
    }
  };

  // 상황에 따른 제목과 버튼 텍스트 설정
  const getSectionInfo = () => {
    if (status === "APPLICABLE") {
      return {
        title: "출석인원",
        buttonText: "결석 처리",
        count: filteredCareSheets.length,
      };
    } else {
      return {
        title: "결석인원",
        buttonText: "출석 처리",
        count: filteredCareSheets.length,
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
          onClick={handleProcessClick}
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
        onSelectAll={handleSelectAll}
      />
      <div className={itemsContainer}>
        {filteredCareSheets.map((careSheet, index) => (
          <CareSheetListItem
            key={careSheet.careSheetId}
            careSheet={careSheet}
            index={index}
            isChecked={isCheckedItems.has(careSheet.careSheetId)}
            onCheckChange={(checked) =>
              handleItemCheck(careSheet.careSheetId, checked)
            }
          />
        ))}
      </div>
    </div>
  );
};
