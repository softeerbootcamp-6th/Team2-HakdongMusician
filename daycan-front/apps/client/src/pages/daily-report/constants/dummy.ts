import type { TReport } from "@/services/report/types";

export const DUMMY_REPORT_DATA: TReport = {
  totalScore: 85,
  changeAmount: 5,
  mealScore: 15,
  healthScore: 15,
  physicalScore: 15,
  cognitiveScore: 15,

  // 식사 관련 데이터
  mealEntries: [
    {
      key: "아침",
      value: "오늘은 아침을 했어요!",
      warning: "반찬 투정을 하셨어요",
      additionalInfo: "밥은 잘 드셨지만 반찬은 조금 남기셨어요",
    },
    {
      key: "점심",
      value: "오늘은 점심을 했어요!",
      warning: "차은우가 먹여주는 게 아니라면 안 먹는대요",
      additionalInfo: "차은우 선생님이 먹여주시니까 잘 드셨어요",
    },
    {
      key: "저녁",
      value: "오늘은 저녁을 했어요!",
      warning: "",
      additionalInfo: "저녁은 평소보다 많이 드셨어요",
    },
  ],
  mealCardFooter: {
    score: 15,
    additionalMemo:
      "오늘은 전반적으로 식사량이 좋았어요. 차은우 선생님과 함께할 때 더 잘 드시는 편이에요.",
  },

  // 건강 관련 데이터
  healthEntries: [
    {
      key: "혈압",
      value: "120/80",
      warning: "",
      additionalInfo: "정상 범위 내 혈압을 유지하고 있어요",
    },
    {
      key: "체온",
      value: "36.5℃",
      warning: "",
      additionalInfo: "정상 체온을 유지하고 있어요",
    },
    {
      key: "맥박",
      value: "72회/분",
      warning: "",
      additionalInfo: "안정적인 맥박을 보이고 있어요",
    },
  ],
  healthCardFooter: {
    score: 15,
    additionalMemo:
      "건강 상태가 매우 양호해요. 모든 지표가 정상 범위에 있어요.",
  },

  // 신체 활동 관련 데이터
  physicalEntries: [
    {
      key: "게이트 볼",
      value: "게이트 볼을 통해서, 몸과 마음을 단련시켰어요.",
      warning: "",
      additionalInfo: "30분간 게이트 볼 활동을 하셨어요",
    },
    {
      key: "걷기",
      value: "산책을 통해 근력과 균형감각을 향상시켰어요.",
      warning: "",
      additionalInfo: "15분간 복도 걷기를 하셨어요",
    },
    {
      key: "스트레칭",
      value: "간단한 스트레칭으로 유연성을 높였어요.",
      warning: "",
      additionalInfo: "아침에 10분간 스트레칭을 하셨어요",
    },
  ],
  physicalCardFooter: {
    score: 15,
    additionalMemo: "오늘은 다양한 신체 활동을 통해 건강을 증진시켰어요.",
  },

  // 인지 활동 관련 데이터
  cognitiveEntries: [
    {
      key: "노래부르기",
      value: "오늘은 노래부르기 활동을 했어요!",
      warning: "",
      additionalInfo: "노래부르기 활동을 통해서, 몸과 마음을 단련시켰어요.",
    },
    {
      key: "퍼즐 맞추기",
      value: "퍼즐을 통해 기억력과 집중력을 향상시켰어요.",
      warning: "",
      additionalInfo: "20분간 퍼즐 맞추기를 하셨어요",
    },
    {
      key: "독서",
      value: "책 읽기를 통해 언어 능력을 향상시켰어요.",
      warning: "",
      additionalInfo: "15분간 그림책을 읽으셨어요",
    },
  ],
  CognitiveCardFooter: {
    score: 15,
    additionalMemo: "인지 활동을 통해 기억력과 집중력이 향상되고 있어요.",
  },
};

// 추가 더미 데이터 (다른 날짜용)
export const DUMMY_REPORT_DATA_2: TReport = {
  totalScore: 78,
  changeAmount: -3,
  mealScore: 12,
  healthScore: 14,
  physicalScore: 13,
  cognitiveScore: 14,

  mealEntries: [
    {
      key: "아침",
      value: "아침 식사를 거부하셨어요",
      warning: "식욕이 부족해 보여요",
      additionalInfo: "커피만 마시고 식사를 하지 않으셨어요",
    },
    {
      key: "점심",
      value: "점심은 조금 드셨어요",
      warning: "평소보다 적게 드셨어요",
      additionalInfo: "국만 조금 드시고 밥은 거의 안 드셨어요",
    },
    {
      key: "저녁",
      value: "저녁은 평소와 비슷하게 드셨어요",
      warning: "",
      additionalInfo: "저녁은 평소와 비슷한 양을 드셨어요",
    },
  ],
  mealCardFooter: {
    score: 12,
    additionalMemo:
      "오늘은 전반적으로 식욕이 떨어져 있어요. 컨디션이 좋지 않을 수 있어요.",
  },

  healthEntries: [
    {
      key: "혈압",
      value: "135/85",
      warning: "수축기 혈압이 약간 높아요",
      additionalInfo: "평소보다 혈압이 높게 측정되었어요",
    },
    {
      key: "체온",
      value: "37.2℃",
      warning: "체온이 약간 높아요",
      additionalInfo: "평소보다 체온이 높게 측정되었어요",
    },
    {
      key: "맥박",
      value: "78회/분",
      warning: "",
      additionalInfo: "맥박은 정상 범위에 있어요",
    },
  ],
  healthCardFooter: {
    score: 14,
    additionalMemo: "혈압과 체온이 약간 높아져 있어요. 컨디션을 체크해보세요.",
  },

  physicalEntries: [
    {
      key: "게이트 볼",
      value: "게이트 볼 활동을 거부하셨어요",
      warning: "활동 의지가 떨어져 있어요",
      additionalInfo: "피곤하다고 하시며 활동을 거부하셨어요",
    },
    {
      key: "걷기",
      value: "짧은 산책만 하셨어요",
      warning: "평소보다 적게 움직이셨어요",
      additionalInfo: "5분간만 복도 걷기를 하셨어요",
    },
    {
      key: "스트레칭",
      value: "스트레칭은 하지 않으셨어요",
      warning: "신체 활동을 거부하셨어요",
      additionalInfo: "피곤하다고 하시며 스트레칭을 거부하셨어요",
    },
  ],
  physicalCardFooter: {
    score: 13,
    additionalMemo:
      "오늘은 신체 활동에 대한 의지가 떨어져 있어요. 컨디션을 체크해보세요.",
  },

  cognitiveEntries: [
    {
      key: "노래부르기",
      value: "노래부르기를 거부하셨어요",
      warning: "인지 활동에 대한 의지가 떨어져 있어요",
      additionalInfo: "피곤하다고 하시며 노래부르기를 거부하셨어요",
    },
    {
      key: "퍼즐 맞추기",
      value: "퍼즐 맞추기를 하셨어요",
      warning: "",
      additionalInfo: "10분간 퍼즐 맞추기를 하셨어요",
    },
    {
      key: "독서",
      value: "책 읽기를 하셨어요",
      warning: "",
      additionalInfo: "10분간 그림책을 읽으셨어요",
    },
  ],
  CognitiveCardFooter: {
    score: 14,
    additionalMemo:
      "인지 활동에 대한 의지가 떨어져 있어요. 컨디션을 체크해보세요.",
  },
};
