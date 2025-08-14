import { COLORS, Icon } from "@daycan/ui";
import { itemContainer, cell, checkboxWrapper } from "./ListItemLayout.css";

interface ListItemLayoutProps {
  isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
  showCheckbox?: boolean;
  columns: {
    key: string;
    content: React.ReactNode;
    align?: "left" | "center" | "right";
    width?: string;
  }[];
  gridTemplate?: string;
  onClick?: () => void;
  isActive?: boolean;
  isSelectable?: boolean;
}

export const ListItemLayout = ({
  isSelected = false,
  onSelect,
  showCheckbox = false,
  columns,
  gridTemplate,
  onClick,
  isActive = false,
  isSelectable = true,
}: ListItemLayoutProps) => {
  const containerStyle = gridTemplate
    ? { gridTemplateColumns: gridTemplate }
    : {};

  const handleCheckboxClick = (e: React.MouseEvent) => {
    if (!isSelectable) return;
    e.stopPropagation();
    onSelect?.(!isSelected);
  };

  const handleRowClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={itemContainer({ isActive })}
      style={containerStyle}
      onClick={handleRowClick}
    >
      {showCheckbox && (
        <div className={cell}>
          <div className={checkboxWrapper} onClick={handleCheckboxClick}>
            <Icon
              name={isSelected ? "checked" : "unchecked"}
              width={20}
              height={20}
              color={isSelectable ? COLORS.gray[300] : COLORS.gray[100]}
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
          {column.content}
        </div>
      ))}
    </div>
  );
};
