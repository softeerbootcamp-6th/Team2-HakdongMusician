import { defaultIconSize, iconMap } from "./index.types";

export interface IconProps {
  name: keyof typeof iconMap;
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  stroke?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * 아이콘 컴포넌트입니다.
 * @param name - 아이콘 이름 (iconMap 참고)
 * @param size - 아이콘 크기
 * @param color - 아이콘 색상
 * @param stroke - 아이콘 스트로크 색상
 * @param onClick - 아이콘 클릭 이벤트
 * @param className - 아이콘 클래스명
 * @returns 아이콘 컴포넌트
 * @author 홍규진 소보길
 */

export const Icon = ({
  name,
  width = defaultIconSize,
  height = defaultIconSize,
  color = "currentColor",
  stroke = "none",
  onClick,
  className,
  style,
}: IconProps) => {
  const SvgIcon = iconMap[name];
  if (!SvgIcon) return null;
  return (
    <SvgIcon
      width={width}
      height={height}
      fill={color}
      stroke={stroke}
      onClick={onClick}
      className={className}
      style={style}
    />
  );
};
