import { Body, COLORS, Icon, type IconProps } from "@daycan/ui";
import { ListItemLayout } from "@/components";
import profileImg from "@/assets/images/profile.png";
import { getGenderText, getStatusInfo } from "../../utils/parser";
import type { TCareSheetListItem } from "@/services/careSheet/types";

interface CareSheetListItemProps {
  careSheet: TCareSheetListItem;
  index: number;
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  isSelectable: boolean;
}

export const CareSheetListItem = ({
  careSheet,
  index,
  isChecked,
  onCheckChange,
  isSelectable,
}: CareSheetListItemProps) => {
  const statusInfo = getStatusInfo(careSheet.status);
  const columns = [
    {
      key: "order",
      content: (
        <Body type="small" weight={500}>
          {index + 1}
        </Body>
      ),
    },
    {
      key: "status",
      content: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Body type="small" weight={500} color={COLORS.gray[800]}>
            {statusInfo.text}
          </Body>
          <Icon
            name={statusInfo.icon as IconProps["name"]}
            width={20}
            height={20}
            color={statusInfo.color}
            stroke={statusInfo.strokeColor}
          />
        </div>
      ),
    },
    {
      key: "recipientName",
      content: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={profileImg}
            alt="프로필"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <Body type="small" weight={600}>
            {careSheet.memberMeta.name}
          </Body>
        </div>
      ),
    },
    {
      key: "birthDate",
      content: (
        <Body type="small" weight={400}>
          {careSheet.memberMeta.birthDate}
        </Body>
      ),
    },
    {
      key: "gender",
      content: (
        <Body type="small" weight={400}>
          {getGenderText(careSheet.memberMeta.gender)}
        </Body>
      ),
    },
    {
      key: "attendance",
      content: (
        <Body
          type="small"
          weight={500}
          color={careSheet.isAttending ? COLORS.green[500] : COLORS.red[500]}
        >
          {careSheet.isAttending ? "출석" : "결석"}
        </Body>
      ),
    },
    {
      key: "writer",
      content: (
        <Body type="small" weight={400}>
          {careSheet.writerName ?? "미작성"}
        </Body>
      ),
    },
  ];

  const gridTemplate = "auto 80px 100px 1fr 120px 80px 100px 120px";

  return (
    <ListItemLayout
      isSelected={isChecked}
      onSelect={isSelectable ? onCheckChange : undefined}
      showCheckbox={true}
      columns={columns}
      gridTemplate={gridTemplate}
      isActive={false}
      isSelectable={isSelectable}
    />
  );
};
