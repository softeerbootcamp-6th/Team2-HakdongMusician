import { Body, COLORS, Icon } from "@daycan/ui";
import {
  headerContainer,
  cell,
  headerCheckboxWrapper,
} from "./CareSheetListHeader.css";

interface CareSheetListHeaderProps {
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectAll: (checked: boolean) => void;
}

export const CareSheetListHeader = ({
  isAllSelected,
  isIndeterminate,
  onSelectAll,
}: CareSheetListHeaderProps) => {
  return (
    <div className={headerContainer}>
      <div className={cell}>
        <div
          className={headerCheckboxWrapper}
          onClick={() => onSelectAll(!isAllSelected)}
        >
          <Icon
            name={
              isAllSelected
                ? "checked"
                : isIndeterminate
                  ? "unchecked"
                  : "unchecked"
            }
            width={20}
            height={20}
            color={COLORS.gray[300]}
          />
        </div>
      </div>
      <div className={cell}>
        <Body type="small" weight={500} color={COLORS.gray[600]}>
          순서
        </Body>
      </div>
      <div className={cell}>
        <Body type="small" weight={500} color={COLORS.gray[600]}>
          작성 상태
        </Body>
      </div>
      <div
        className={cell}
        style={{
          gap: "8px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <Body type="small" weight={500} color={COLORS.gray[600]}>
          수급자 이름
        </Body>
      </div>
      <div className={cell}>
        <Body type="small" weight={500} color={COLORS.gray[600]}>
          생년월일
        </Body>
      </div>
      <div className={cell}>
        <Body type="small" weight={500} color={COLORS.gray[600]}>
          성별
        </Body>
      </div>
      <div className={cell}>
        <Body type="small" weight={500} color={COLORS.gray[600]}>
          출석 여부
        </Body>
      </div>
      <div className={cell}>
        <Body type="small" weight={500} color={COLORS.gray[600]}>
          작성자
        </Body>
      </div>
    </div>
  );
};
