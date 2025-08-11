import { Body, COLORS, Icon, type IconProps } from "@daycan/ui";
import {
  itemContainer,
  cell,
  itemProfileImage,
  itemStatusChip,
  itemCheckboxWrapper,
} from "./CareSheetListItem.css";
import profileImg from "@/assets/images/profile.png";
import type { CareSheetListItemType } from "../../constants/dummy";

type CareSheetItemType = CareSheetListItemType["result"][0];

interface CareSheetListItemProps {
  careSheet: CareSheetItemType;
  index: number;
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}

const getStatusInfo = (status: string) => {
  switch (status) {
    case "SHEET_PENDING":
      return {
        text: "작성 필요",
        icon: "warningFilled",
        color: COLORS.yellow[500],
      };
    case "SHEET_DONE":
      return {
        text: "작성 완료",
        icon: "circleCheck",
        color: COLORS.blue[500],
      };
    case "NOT_APPLICABLE":
      return {
        text: "작성 불가",
        icon: "info",
        color: COLORS.gray[600],
      };
    default:
      return {
        text: "예외 처리",
        icon: "info",
        color: COLORS.gray[600],
      };
  }
};

const getGenderText = (gender: string) => {
  return gender === "FEMALE" ? "여" : "남";
};

export const CareSheetListItem = ({
  careSheet,
  index,
  isChecked,
  onCheckChange,
}: CareSheetListItemProps) => {
  const statusInfo = getStatusInfo(careSheet.status);
  const isDisabled = careSheet.status === "SHEET_DONE";

  return (
    <div className={itemContainer}>
      {/* 체크박스 */}
      <div className={cell}>
        <div
          className={itemCheckboxWrapper}
          onClick={() => !isDisabled && onCheckChange(!isChecked)}
          style={{
            cursor: isDisabled ? "not-allowed" : "pointer",
            opacity: isDisabled ? 0.5 : 1,
          }}
        >
          <Icon
            name={
              isDisabled ? "unchecked" : isChecked ? "checked" : "unchecked"
            }
            width={20}
            height={20}
            color={isDisabled ? COLORS.gray[300] : COLORS.gray[100]}
          />
        </div>
      </div>

      {/* 순서 */}
      <div className={cell}>
        <Body type="small" weight={500}>
          {index + 1}
        </Body>
      </div>

      {/* 작성 상태 */}
      <div className={cell}>
        <div className={itemStatusChip}>
          <Body type="small" weight={500} color={COLORS.gray[800]}>
            {statusInfo.text}
          </Body>
          <Icon
            name={statusInfo.icon as IconProps["name"]}
            width={20}
            height={20}
            color={statusInfo.color}
          />
        </div>
      </div>

      {/* 수급자 이름 */}
      <div
        className={cell}
        style={{
          gap: "8px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <img src={profileImg} alt="프로필" className={itemProfileImage} />
        <Body type="small" weight={600}>
          {careSheet.memberMeta.name}
        </Body>
      </div>

      {/* 생년월일 */}
      <div className={cell}>
        <Body type="small" weight={400}>
          {careSheet.memberMeta.birthDate}
        </Body>
      </div>

      {/* 성별 */}
      <div className={cell}>
        <Body type="small" weight={400}>
          {getGenderText(careSheet.memberMeta.gender)}
        </Body>
      </div>

      {/* 출석 여부 */}
      <div className={cell}>
        <Body
          type="small"
          weight={500}
          color={careSheet.isAttending ? COLORS.green[500] : COLORS.red[500]}
        >
          {careSheet.isAttending ? "출석" : "결석"}
        </Body>
      </div>

      {/* 작성자 */}
      <div className={cell}>
        <Body type="small" weight={400}>
          {careSheet.writerName}
        </Body>
      </div>
    </div>
  );
};
