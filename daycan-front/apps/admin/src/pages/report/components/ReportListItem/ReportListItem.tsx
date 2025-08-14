import { Body, Button, COLORS, Icon, type IconProps } from "@daycan/ui";
import { ListItemLayout } from "@/components";
import {
  getGenderText,
  getStatusInfo,
  getButtonInfo,
} from "../../utils/parser";
import { REPORT_LIST_GRID_TEMPLATE } from "../../constants/grid";

export type ReportListItemType = {
  id: number;
  memberMetaEntry: {
    memberId: string;
    name: string;
    birthDate: string;
    gender: "FEMALE" | "MALE";
  };
  guardianMetaEntry: {
    guardianName: string;
    guardianContact: string;
  };
  status:
    | "NOT_APPLICABLE"
    | "PENDING"
    | "CREATED"
    | "REVIEWED"
    | "SENDING"
    | "RESERVED"
    | "DONE";
};

interface ReportListItemProps {
  report: ReportListItemType;
  index: number;
  isChecked: boolean;
  onCheckChange: (id: number, checked: boolean) => void;
  isSelectable: boolean;
}

export const ReportListItem = ({
  report,
  index,
  isChecked,
  onCheckChange,
  isSelectable,
}: ReportListItemProps) => {
  const statusInfo = getStatusInfo(report.status);

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
        <Body type="small" weight={500}>
          {report.memberMetaEntry.name}
        </Body>
      ),
    },
    {
      key: "birthDate",
      content: (
        <Body type="small" weight={400}>
          {report.memberMetaEntry.birthDate}
        </Body>
      ),
    },
    {
      key: "gender",
      content: (
        <Body type="small" weight={400}>
          {getGenderText(report.memberMetaEntry.gender)}
        </Body>
      ),
    },
    {
      key: "guardian",
      content: (
        <Body type="small" weight={400}>
          {report.guardianMetaEntry.guardianName}
        </Body>
      ),
    },
    {
      key: "guardianContact",
      content: (
        <Body type="small" weight={400}>
          {report.guardianMetaEntry.guardianContact}
        </Body>
      ),
    },
    {
      key: "isReviewable",
      content: (() => {
        const buttonInfo = getButtonInfo(report.status);

        return (
          <Button
            size="small"
            variant={buttonInfo.variant}
            style={buttonInfo.style}
          >
            <Body type="xsmall" weight={500}>
              {buttonInfo.text}
            </Body>
          </Button>
        );
      })(),
    },
  ];

  return (
    <ListItemLayout
      isSelected={isChecked}
      onSelect={
        isSelectable
          ? (checked) => onCheckChange(report.id, checked)
          : undefined
      }
      showCheckbox={true}
      columns={columns}
      gridTemplate={REPORT_LIST_GRID_TEMPLATE}
      isActive={false}
      isSelectable={isSelectable}
    />
  );
};
