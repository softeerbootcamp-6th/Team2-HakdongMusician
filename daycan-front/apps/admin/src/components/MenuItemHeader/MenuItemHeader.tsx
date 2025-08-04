import { Body, COLORS, Icon } from "@daycan/ui";
import {
  menuItemHeader,
  type MenuItemHeaderVariants,
} from "./MenuItemHeader.css";
import { type PageKey } from "@/constants/sidebar.ts";
import { type IconName } from "@/constants/iconNames";

type MenuItemHeaderProps = {
  pageKey: PageKey;
  iconName: IconName;
  label: string;
  onClick: (pageKey: PageKey) => void;
} & MenuItemHeaderVariants;

export const MenuItemHeader = ({
  pageKey,
  iconName,
  label,
  isSelected,
  onClick,
}: MenuItemHeaderProps) => {
  const color = isSelected ? COLORS.primary[300] : COLORS.gray[500];

  return (
    <div
      className={menuItemHeader({ isSelected })}
      onClick={() => onClick(pageKey)}
    >
      <Icon name={iconName} width={36} height={36} color={color} />
      <Body type="large" color={color}>
        {label}
      </Body>
      <Icon name="arrowRight" width={16} height={16} stroke={color} />
    </div>
  );
};
