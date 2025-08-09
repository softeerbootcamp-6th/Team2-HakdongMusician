import { Body, COLORS, Icon } from "@daycan/ui";
import { rowCheckBoxContainer } from "./RowCheckBox.css";

interface RowCheckBoxProps {
  label: string;
  checked: boolean;
  onClick: () => void;
  isExpandable?: boolean;
  expandableChildren?: React.ReactNode;
}

export const RowCheckBox = ({
  label,
  checked,
  onClick,
  isExpandable = false,
  expandableChildren,
}: RowCheckBoxProps) => {
  return (
    <>
      <div className={rowCheckBoxContainer} onClick={onClick}>
        <Body type="medium" weight={400} color={COLORS.gray[700]}>
          {label}
        </Body>
        <Icon name={checked ? "checked" : "unchecked"} width={24} height={24} />
      </div>
      {isExpandable && checked && expandableChildren}
    </>
  );
};
