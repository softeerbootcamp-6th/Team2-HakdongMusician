import { Body, COLORS } from "@daycan/ui";
import { memberDetailItemRowContainer } from "./MemberDetailItemRow.css";

interface MemberDetailItemRowProps {
  label: string;
  value: string;
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
        color={COLORS.gray[500]}
        style={{
          width: "90px",
        }}
      >
        {label}
      </Body>
      <Body
        type="xsmall"
        weight={500}
        color={COLORS.gray[800]}
        style={{
          width: "90px",
        }}
      >
        {value}
      </Body>
    </div>
  );
};
