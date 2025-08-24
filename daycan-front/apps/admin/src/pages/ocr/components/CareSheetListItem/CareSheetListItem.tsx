import type { TCareSheetListItem } from "@/services/careSheet/types";
import {
  careSheetListItemContainer,
  careSheetListItemProfile,
  careSheetListItemInfoContainer,
  careSheetListItemStatusContainer,
} from "./CareSheetListItem.css";
import { Body, COLORS, Icon } from "@daycan/ui";

interface CareSheetListItemProps {
  careSheet: TCareSheetListItem;
}

export const CareSheetListItem = ({ careSheet }: CareSheetListItemProps) => {
  return (
    <div className={careSheetListItemContainer}>
      <img
        src={careSheet.memberMeta.avatarUrl}
        alt="프로필"
        className={careSheetListItemProfile}
      />
      <div className={careSheetListItemInfoContainer}>
        <Body type="medium" weight={500} color={COLORS.gray[600]}>
          {careSheet.memberMeta.name}
        </Body>
      </div>
      <div>
        <div className={careSheetListItemStatusContainer}>
          <Body type="small" weight={500} color={COLORS.gray[600]}>
            기록지 보러 가기
          </Body>
          <Icon
            name={"chevronRight"}
            width={20}
            height={20}
            color={COLORS.gray[50]}
            stroke={COLORS.white}
          />
        </div>
      </div>
    </div>
  );
};
