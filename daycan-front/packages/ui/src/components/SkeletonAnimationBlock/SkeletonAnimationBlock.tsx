import {
  skeleton,
  shimmerOverlay,
  type SkeletonVariants,
} from "./SkeletonAnimationBlock.css";

type SkeletonAnimationBlockProps = SkeletonVariants & {
  style?: React.CSSProperties;
  shimmerColor?: string;
};

/**
 * 스켈레톤 UI에 흘러가는 애니메이션이 적용 된 컴포넌트입니다.
 * @author 소보길
 */
export const SkeletonAnimationBlock = ({
  variant,
  backgroundColor,
  size,
  style,
  shimmerColor,
  ...props
}: SkeletonAnimationBlockProps) => {
  const shimmerStyle = shimmerColor
    ? {
        ...shimmerOverlay,
        background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
      }
    : shimmerOverlay;

  return (
    <div
      className={skeleton({ variant, backgroundColor, size })}
      style={style}
      {...props}
    >
      <div style={shimmerStyle} />
    </div>
  );
};
