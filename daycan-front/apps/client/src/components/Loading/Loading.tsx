import {
  loadingContainer,
  loadingContainerFullscreen,
  loadingSpinner,
  spinnerRing,
  loadingDots,
  dot,
  dot1,
  dot2,
  dot3,
  loadingPulse,
  loadingText,
  mobileOptimized,
  mobileText,
  mobileDot,
  darkModeFullscreen,
  darkModeText,
} from "./Loading.css";

interface LoadingProps {
  /** 로딩 타입 */
  type?: "spinner" | "dots" | "pulse";
  /** 로딩 크기 */
  size?: "small" | "medium" | "large";
  /** 로딩 색상 */
  color?: string;
  /** 로딩 텍스트 */
  text?: string;
  /** 전체 화면 로딩 여부 */
  fullScreen?: boolean;
}

export const Loading = ({
  type = "spinner",
  size = "medium",
  color = "#3E89EA",
  text,
  fullScreen = true,
}: LoadingProps) => {
  const getSizeValue = () => {
    switch (size) {
      case "small":
        return 24;
      case "medium":
        return 32;
      case "large":
        return 48;
      default:
        return 32;
    }
  };

  const renderSpinner = () => (
    <div
      className={loadingSpinner}
      style={{ width: getSizeValue(), height: getSizeValue() }}
    >
      <div
        className={spinnerRing}
        style={{ borderColor: `${color} transparent transparent transparent` }}
      />
    </div>
  );

  const renderDots = () => (
    <div className={loadingDots}>
      <div
        className={`${dot} ${dot1} ${mobileDot}`}
        style={{ backgroundColor: color }}
      />
      <div
        className={`${dot} ${dot2} ${mobileDot}`}
        style={{ backgroundColor: color }}
      />
      <div
        className={`${dot} ${dot3} ${mobileDot}`}
        style={{ backgroundColor: color }}
      />
    </div>
  );

  const renderPulse = () => (
    <div className={loadingPulse} style={{ backgroundColor: color }} />
  );

  const renderContent = () => {
    switch (type) {
      case "spinner":
        return renderSpinner();
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  const containerClass = fullScreen
    ? `${loadingContainer} ${loadingContainerFullscreen} ${darkModeFullscreen}`
    : `${loadingContainer} ${mobileOptimized}`;

  return (
    <div className={containerClass}>
      {renderContent()}
      {text && (
        <div className={`${loadingText} ${mobileText} ${darkModeText}`}>
          {text}
        </div>
      )}
    </div>
  );
};
