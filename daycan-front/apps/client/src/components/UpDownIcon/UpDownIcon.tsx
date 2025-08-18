import { Body, COLORS, Icon } from "@daycan/ui";
import { upDownIconContainer } from "./UpDownIcon.css";

export const UpDownIcon = ({ value }: { value: number }) => {
  return (
    <div className={upDownIconContainer}>
      <Icon
        name={value > 0 ? "arrowUp" : "arrowDown"}
        width={12}
        height={12}
        color={value > 0 ? COLORS.red[500] : COLORS.blue[500]}
      />
      <Body
        type="xsmall"
        weight={500}
        color={value > 0 ? COLORS.red[500] : COLORS.blue[500]}
      >
        {Math.abs(value)}
      </Body>
    </div>
  );
};
