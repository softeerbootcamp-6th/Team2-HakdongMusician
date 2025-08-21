import { useState, useRef, useEffect } from "react";
import { Body, COLORS, Icon } from "@daycan/ui";
import {
  cardLayout,
  cardLayoutFooter,
  cardLayoutHeader,
  cardLayoutFooterStampDescription,
  dropdownContent,
  arrowIcon,
  arrowIconContainer,
  content,
  overflowMessage,
  cardLayoutFooterStampContainer,
} from "./CardLayout.css";

interface CardLayoutProps {
  children: React.ReactNode;
  title: string;
  score: number;
  scoreMax: number;
  additionalMemo?: string;
  isDropdown?: boolean;
}

//TODO - API 명세 나온 후에, 점수에 따른 아이콘 및 색상 수정 필요

export const CardLayout = ({
  children,
  title,
  score,
  scoreMax,
  additionalMemo,
  isDropdown = false,
}: CardLayoutProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    if (isDropdown) {
      setIsExpanded(!isExpanded);
    }
  };

  // 콘텐츠가 넘치는지 감지
  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [children, isExpanded]);

  function getStampIcon() {
    // 정책상 65점이 총점일 때는 40점 이상이면 good
    // 정책상 15점이 총점일 때는 10점 이상이면 good
    const isGood = score / scoreMax >= 0.65;
    if (isGood) {
      return "stampGood";
    }
    return "stampBad";
  }

  // Dropdown 카드일 때는 높이를 제한하지 않아, 카드 내부 콘텐츠가 펴져도 됨
  // Dropdown 카드가 아닐 때는(DailyReport) 높이를 제한하고, 넘치면 content 영역에 백드롭 및 메시지 추가
  return (
    <div className={cardLayout({ isDropdown })}>
      <div
        className={cardLayoutHeader({ isDropdown })}
        onClick={toggleExpanded}
      >
        <Icon
          name="circleCheck"
          width={32}
          height={32}
          color={COLORS.blue[500]}
          stroke={COLORS.white}
        />
        <Body type="large" weight={600}>
          오늘의
        </Body>
        <Body type="large" weight={600}>
          {title}
        </Body>
        <div className={arrowIconContainer}>
          {isDropdown && (
            <Icon
              name="arrowDown"
              width={16}
              height={16}
              className={arrowIcon({ isExpanded })}
            />
          )}
        </div>
      </div>

      {(!isDropdown || isExpanded) && (
        <>
          <div
            ref={contentRef}
            className={isDropdown ? dropdownContent({ isExpanded }) : content}
            style={{ position: "relative" }}
          >
            {children}

            {/* 콘텐츠가 넘칠 때 메시지 오버레이 */}
            {isOverflowing && !isDropdown && (
              <div className={overflowMessage}>
                <Body type="medium" weight={600} color={COLORS.white}>
                  터치해서 자세한 정보를 확인하세요!
                </Body>
              </div>
            )}
          </div>

          {/* 스탬프 + 메모 영역 */}
          <div className={cardLayoutFooter}>
            <div className={cardLayoutFooterStampContainer}>
              <Icon
                name={getStampIcon()}
                width={50}
                height={50}
                color={COLORS.white}
              />
            </div>
            <div className={cardLayoutFooterStampDescription}>
              <Body type="large" weight={600} color={COLORS.gray[700]}>
                {score}/{scoreMax}
              </Body>
              <Body type="medium" weight={400} color={COLORS.gray[700]}>
                {additionalMemo ?? ""}
              </Body>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
