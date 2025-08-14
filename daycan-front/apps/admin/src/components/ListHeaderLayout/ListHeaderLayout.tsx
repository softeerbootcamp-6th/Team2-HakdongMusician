import { Body, COLORS, Icon } from "@daycan/ui";
import {
  headerContainer,
  cell,
  headerCheckboxWrapper,
} from "./ListHeaderLayout.css";

interface ListHeaderLayoutProps {
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
  onSelectAll?: (checked: boolean) => void;
  showCheckbox?: boolean;
  columns: {
    key: string;
    label: string;
    width?: string;
    align?: "left" | "center" | "right";
  }[];
  gridTemplate?: string;
}

export const ListHeaderLayout = ({
  isAllSelected = false,
  isIndeterminate = false,
  onSelectAll,
  showCheckbox = false,
  columns,
  gridTemplate,
}: ListHeaderLayoutProps) => {
  
  const containerStyle = gridTemplate
    ? { gridTemplateColumns: gridTemplate }
    : {};

  return (
    <div className={headerContainer} style={containerStyle}>
      {showCheckbox && (
        <div className={cell}>
          <div className={headerCheckboxWrapper}>
            <Icon
              name={
                isAllSelected
                  ? "checked"
                  : isIndeterminate
                    ? "unchecked"
                    : "unchecked"
              }
              width={20}
              height={20}
              color={COLORS.gray[300]}
              onClick={() => onSelectAll?.(!isAllSelected)}
            />
          </div>
        </div>
      )}
      {columns.map((column) => (
        <div
          key={column.key}
          className={cell}
          style={{
            textAlign: column.align || "left",
            width: column.width,
          }}
        >
          <Body type="xsmall" weight={600} color={COLORS.gray[700]}>
            {column.label}
          </Body>
        </div>
      ))}
    </div>
  );
};
