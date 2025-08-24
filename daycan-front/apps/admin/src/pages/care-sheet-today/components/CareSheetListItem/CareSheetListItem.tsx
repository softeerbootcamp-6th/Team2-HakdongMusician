import type { TCareSheetListItem } from "@/services/careSheet/types";
import {
  careSheetListItemContainer,
  careSheetListItemProfile,
  careSheetListItemInfoContainer,
  careSheetListItemStatusContainer,
} from "./CareSheetListItem.css";
import { Body, COLORS, Icon, useToast } from "@daycan/ui";
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
  const { showToast } = useToast();
  const handleClickWrittenCareSheet = () => {
    // REVIEWED 상태가 아닐 때만 클릭 가능
    if (todayCareSheet.status !== "REVIEWED") {
      onCareSheetClick(TODAY_DATE, todayCareSheet.memberMeta.memberId);
    } else {
      showToast({
        data: {
          message: "검토 완료된 기록지는 수정 불가합니다.",
          type: "info",
          variant: "mobile",
        },
      });
    }
  };

  // 상태에 따른 문구와 스타일 결정
  const getStatusInfo = () => {
    switch (todayCareSheet.status) {
      case "REVIEWED":
        return {
          text: "검토 완료",
          color: COLORS.gray[400],
          clickable: false,
        };
      case "DONE":
        return {
          text: "수정 하기",
          color: COLORS.green[500],
          clickable: true,
        };
      case "PENDING":
        return {
          text: "작성 중",
          color: COLORS.yellow[500],
          clickable: true,
        };
      case "NOT_APPLICABLE":
        return {
          text: "해당 없음",
          color: COLORS.gray[500],
          clickable: true,
        };
      default:
        return {
          text: "상태 없음",
          color: COLORS.gray[400],
          clickable: false,
        };
    }
  };

  const statusInfo = getStatusInfo();

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
          style={{
            cursor: statusInfo.clickable ? "pointer" : "default",
            opacity: statusInfo.clickable ? 1 : 0.6,
          }}
        >
          <Body type="small" weight={500} color={statusInfo.color}>
            {statusInfo.text}
          </Body>
          {statusInfo.clickable && (
            <Icon
              name={"chevronRight"}
              width={20}
              height={20}
              color={COLORS.gray[50]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
