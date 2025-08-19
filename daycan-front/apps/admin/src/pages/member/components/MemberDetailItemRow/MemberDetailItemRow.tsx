import { Body, COLORS } from "@daycan/ui";
import { memberDetailItemRowContainer } from "./MemberDetailItemRow.css";

interface MemberDetailItemRowProps {
  label: string;
  value?: string | number;
}

export const MemberDetailItemRow = ({
  label,
  value,
}: MemberDetailItemRowProps) => {
  return (
    <div className={memberDetailItemRowContainer}>
      <Body
        type="xsmall"
        weight={500}
        style={{
          width: "90px",
          color: COLORS.gray[500],
        }}
      >
        {label}
      </Body>
      <Body
        type="xsmall"
        weight={500}
        color={COLORS.gray[800]}
        style={{
          width: "100px",
        }}
      >
        {value}
      </Body>
    </div>
  );
};
