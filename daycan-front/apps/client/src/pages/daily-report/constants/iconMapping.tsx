import { Icon } from "@daycan/ui";

// row key에 따른 아이콘 매핑
export const getIconByRowKey = (key: string, size: number = 32) => {
  const keyLower = key.toLowerCase();

  // 식사 관련
  if (keyLower.includes("아침") || keyLower.includes("식사")) {
    return <Icon name="meal" width={size} height={size} />;
  }

  if (keyLower.includes("점심")) {
    return <Icon name="rice" width={size} height={size} />;
  }

  if (keyLower.includes("저녁") || keyLower.includes("간식")) {
    return <Icon name="chicken" width={size} height={size} />;
  }

  // 건강 체크 관련
  if (keyLower.includes("혈압") || keyLower.includes("심박수")) {
    return <Icon name="heartbeat" width={size} height={size} />;
  }

  if (keyLower.includes("체온") || keyLower.includes("온도")) {
    return <Icon name="thermometer" width={size} height={size} />;
  }

  // 신체 건강 개선 관련
  if (
    keyLower.includes("운동") ||
    keyLower.includes("게이트볼") ||
    keyLower.includes("체조") ||
    keyLower.includes("산책")
  ) {
    return <Icon name="activity" width={size} height={size} />;
  }

  if (keyLower.includes("테니스")) {
    return <Icon name="tennis" width={size} height={size} />;
  }

  if (keyLower.includes("축구")) {
    return <Icon name="soccer" width={size} height={size} />;
  }

  if (keyLower.includes("야구")) {
    return <Icon name="baseball" width={size} height={size} />;
  }

  if (keyLower.includes("농구")) {
    return <Icon name="basketball" width={size} height={size} />;
  }

  if (keyLower.includes("배드민턴")) {
    return <Icon name="badminton" width={size} height={size} />;
  }

  if (keyLower.includes("수영")) {
    return <Icon name="swimming" width={size} height={size} />;
  }

  if (keyLower.includes("탁구")) {
    return <Icon name="pingpong" width={size} height={size} />;
  }

  if (
    keyLower.includes("독서") ||
    keyLower.includes("책") ||
    keyLower.includes("책읽기")
  ) {
    return <Icon name="book" width={size} height={size} />;
  }

  if (keyLower.includes("체스")) {
    return <Icon name="chess" width={size} height={size} />;
  }

  if (
    keyLower.includes("포커") ||
    keyLower.includes("플레이") ||
    keyLower.includes("카드")
  ) {
    return <Icon name="poker" width={size} height={size} />;
  }

  // 인지 능력 관련
  if (
    keyLower.includes("인지") ||
    keyLower.includes("뇌") ||
    keyLower.includes("퍼즐") ||
    keyLower.includes("게임")
  ) {
    return <Icon name="brain" width={size} height={size} />;
  }

  if (keyLower.includes("노래")) {
    return <Icon name="sing" width={size} height={size} />;
  }

  // 배변 관련
  if (
    keyLower.includes("배변") ||
    keyLower.includes("대변") ||
    keyLower.includes("화장실")
  ) {
    return <Icon name="toilet" width={size} height={size} />;
  }

  if (keyLower.includes("소변")) {
    return <Icon name="waterdrop" width={size} height={size} />;
  }

  // 수분 관련
  if (
    keyLower.includes("수분") ||
    keyLower.includes("물") ||
    keyLower.includes("음료")
  ) {
    return <Icon name="waterdrop" width={size} height={size} />;
  }

  // 위치/이동 관련
  if (
    keyLower.includes("위치") ||
    keyLower.includes("이동") ||
    keyLower.includes("외출")
  ) {
    return <Icon name="location" width={size} height={size} />;
  }

  // 교통 관련
  if (
    keyLower.includes("교통") ||
    keyLower.includes("버스") ||
    keyLower.includes("택시") ||
    keyLower.includes("차량")
  ) {
    return <Icon name="transportation" width={size} height={size} />;
  }

  // 알람 관련
  if (
    keyLower.includes("알람") ||
    keyLower.includes("알림") ||
    keyLower.includes("시간")
  ) {
    return <Icon name="alarm" width={size} height={size} />;
  }

  // 기본 건강 아이콘
  return <Icon name="health" width={size} height={size} />;
};
