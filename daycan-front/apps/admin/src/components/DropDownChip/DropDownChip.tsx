import { type ReactNode } from "react";
import { Body, Icon, COLORS, Chip } from "@daycan/ui";

interface DropDownChipProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  children?: ReactNode;
  style?: React.CSSProperties;
}

export const DropDownChip = ({
  label,
  isOpen,
  onClick,
  children,
  style = {},
}: DropDownChipProps) => {
  return (
    <div
      style={{ position: "relative", height: "100%" }}
      data-dropdown-container
    >
      <Chip
        flexRule="center"
        round="m"
        style={{
          height: "100%",
          padding: "2px 16px",
          cursor: "pointer",
          boxShadow: `0px 0px 4px rgba(0, 0, 0, 0.05)`,
          ...style,
        }}
        color={isOpen ? "grayDark" : "grayLight"}
        onClick={onClick}
      >
        <Body
          type="xsmall"
          color={isOpen ? COLORS.white : COLORS.gray[800]}
          weight={500}
        >
          {label}
        </Body>
        <Icon
          name="arrowDown"
          width={12}
          height={12}
          color={isOpen ? COLORS.white : COLORS.gray[600]}
          stroke={isOpen ? COLORS.white : COLORS.gray[500]}
        />
      </Chip>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
            marginTop: "4px",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
