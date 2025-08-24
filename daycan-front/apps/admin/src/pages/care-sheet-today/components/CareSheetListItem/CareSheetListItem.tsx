import type { TCareSheetListItem } from "@/services/careSheet/types";
import {
  careSheetListItemContainer,
  careSheetListItemProfile,
  careSheetListItemInfoContainer,
  careSheetListItemStatusContainer,
} from "./CareSheetListItem.css";
import { Body, COLORS, Icon } from "@daycan/ui";
import type { YearMonthDay } from "@/types/date";
import { TODAY_DATE } from "@/utils/dateFormatter";

interface CareSheetListItemProps {
  todayCareSheet: TCareSheetListItem;
  onCareSheetClick: (date: YearMonthDay, memberId: number) => void;
}

export const CareSheetListItem = ({
  todayCareSheet,
  onCareSheetClick,
}: CareSheetListItemProps) => {
  const handleClickWrittenCareSheet = () => {
    onCareSheetClick(TODAY_DATE, todayCareSheet.memberMeta.memberId);
  };

  return (
    <div className={careSheetListItemContainer}>
      <img
        src={todayCareSheet.memberMeta.avatarUrl}
        alt="프로필"
        className={careSheetListItemProfile}
      />
      <div className={careSheetListItemInfoContainer}>
        <Body type="medium" weight={500} color={COLORS.gray[600]}>
          {todayCareSheet.memberMeta.name}
        </Body>
      </div>
      <div>
        <div
          className={careSheetListItemStatusContainer}
          onClick={handleClickWrittenCareSheet}
        >
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
