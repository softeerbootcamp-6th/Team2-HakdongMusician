import { Button, COLORS, Icon } from "@daycan/ui";
import {
  memberDataItemDetailContainer,
  memberDataItemDetailContent,
  memberDataItemDetailCardContainer,
  memberDataItemDetailButtonContainer,
  memberDataItemDetailTopButton,
  memberDataItemDetailBottomButton,
} from "./MemberDataItemDetail.css";

interface MemberDataItemDetailProps {
  detailCard?: React.ReactNode;
}

export const MemberDataItemDetail = ({
  detailCard,
}: MemberDataItemDetailProps) => {
  return (
    <div className={memberDataItemDetailContainer}>
      <div className={memberDataItemDetailContent}>
        <div className={memberDataItemDetailCardContainer}>{detailCard}</div>

        <div className={memberDataItemDetailButtonContainer}>
          <div className={memberDataItemDetailTopButton}>
            <Button
              size="fullWidth"
              style={{ backgroundColor: COLORS.gray[600], color: COLORS.white }}
            >
              기록지 및 리포트 내역
              <Icon
                name="arrowRight"
                stroke="currentColor"
                color={COLORS.gray[600]}
              />
            </Button>
          </div>
          <div className={memberDataItemDetailBottomButton}>
            <Button
              size="small"
              style={{
                backgroundColor: COLORS.green[500],
                color: COLORS.green[200],
                width: "58px",
                height: "32px",
              }}
            >
              수정
            </Button>
            <Button
              variant="error"
              size="small"
              style={{ width: "58px", height: "32px" }}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
