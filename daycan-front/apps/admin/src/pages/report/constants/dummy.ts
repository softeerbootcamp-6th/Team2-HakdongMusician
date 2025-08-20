import type { TReportReadResponse } from "@/services/report/types";
import type { ReportListItemType } from "../components/ReportListItem/ReportListItem";

// 더미 데이터 (실제로는 API에서 가져올 데이터)
export const mockReports: ReportListItemType[] = [
  {
    id: 1,
    memberMetaEntry: {
      memberId: "M001",
      name: "김철수",
      birthDate: "1980-05-15",
      gender: "MALE",
    },
    guardianMetaEntry: {
      guardianName: "김영희",
      guardianContact: "010-1234-5678",
    },
    status: "PENDING",
  },
  {
    id: 2,
    memberMetaEntry: {
      memberId: "M002",
      name: "이영희",
      birthDate: "1975-08-22",
      gender: "FEMALE",
    },
    guardianMetaEntry: {
      guardianName: "이철수",
      guardianContact: "010-2345-6789",
    },
    status: "CREATED",
  },
  {
    id: 3,
    memberMetaEntry: {
      memberId: "M002",
      name: "이영희",
      birthDate: "1975-08-22",
      gender: "FEMALE",
    },
    guardianMetaEntry: {
      guardianName: "이철수",
      guardianContact: "010-2345-6789",
    },
    status: "REVIEWED",
  },

  {
    id: 7,
    memberMetaEntry: {
      memberId: "M007",
      name: "윤민호",
      birthDate: "1988-04-12",
      gender: "MALE",
    },
    guardianMetaEntry: {
      guardianName: "윤영희",
      guardianContact: "010-7890-1234",
    },
    status: "NOT_APPLICABLE",
  },
];

export const mockSendedReports: ReportListItemType[] = [
  {
    id: 4,
    memberMetaEntry: {
      memberId: "M004",
      name: "최지영",
      birthDate: "1970-03-18",
      gender: "FEMALE",
    },
    guardianMetaEntry: {
      guardianName: "최영수",
      guardianContact: "010-4567-8901",
    },
    status: "SENDING",
  },
  {
    id: 5,
    memberMetaEntry: {
      memberId: "M005",
      name: "정현우",
      birthDate: "1982-07-25",
      gender: "MALE",
    },
    guardianMetaEntry: {
      guardianName: "정미영",
      guardianContact: "010-5678-9012",
    },
    status: "RESERVED",
  },
  {
    id: 6,
    memberMetaEntry: {
      memberId: "M006",
      name: "한소영",
      birthDate: "1978-11-08",
      gender: "FEMALE",
    },
    guardianMetaEntry: {
      guardianName: "한철수",
      guardianContact: "010-6789-0123",
    },
    status: "DONE",
  },
];

export const mockReportDetail: TReportReadResponse = {
  totalScore: 85,
  changeAmount: 5,
  mealScore: 15,
  healthScore: 65,
  physicalScore: 10,
  cognitiveScore: 10,

  mealEntries: [
    {
      key: "아침 식사량",
      value: "밥 1공기, 국 1그릇",
      warning: "아침 식사량이 부족합니다",
      additionalInfo:
        "아침 식사는 하루의 시작이므로 충분히 섭취하는 것이 좋습니다",
    },
    {
      key: "점심 식사량",
      value: "밥 1.5공기, 반찬 3가지",
      warning: "적절한 식사량입니다",
      additionalInfo: "균형잡힌 영양소 섭취가 잘 되고 있습니다",
    },
    {
      key: "저녁 식사량",
      value: "밥 1공기, 반찬 2가지",
      warning: "저녁 식사량이 적절합니다",
      additionalInfo: "소화를 고려한 적절한 저녁 식사량입니다",
    },
  ],

  healthEntries: [
    {
      key: "혈압",
      value: "120/80 mmHg",
      warning: "정상 범위입니다",
      additionalInfo: "규칙적인 운동과 식습관 유지가 필요합니다",
    },
    {
      key: "혈당",
      value: "95 mg/dL",
      warning: "정상 범위입니다",
      additionalInfo: "당뇨병 예방을 위해 정기적인 검사가 필요합니다",
    },
    {
      key: "체중",
      value: "65kg",
      warning: "적정 체중입니다",
      additionalInfo: "현재 체중을 유지하는 것이 좋습니다",
    },
  ],

  physicalEntries: [
    {
      key: "보행 능력",
      value: "독립 보행 가능",
      warning: "보행 능력이 양호합니다",
      additionalInfo: "정기적인 보행 운동으로 근력 유지가 필요합니다",
    },
    {
      key: "상지 근력",
      value: "좌우 균형",
      warning: "좌우 균형이 잘 맞습니다",
      additionalInfo: "손목과 팔꿈치 관절 운동을 권장합니다",
    },
    {
      key: "하지 근력",
      value: "보통 수준",
      warning: "근력 유지가 필요합니다",
      additionalInfo: "스쿼트, 런지 등 하지 근력 운동을 권장합니다",
    },
    {
      key: "균형 감각",
      value: "양호",
      warning: "균형 감각이 좋습니다",
      additionalInfo: "요가나 태극권 등 균형 운동을 권장합니다",
    },
  ],

  cognitiveEntries: [
    {
      key: "기억력",
      value: "양호",
      warning: "기억력이 양호합니다",
      additionalInfo: "독서, 퍼즐 등 두뇌 활동을 권장합니다",
    },
    {
      key: "집중력",
      value: "보통",
      warning: "집중력 향상이 필요합니다",
      additionalInfo: "명상이나 호흡 운동으로 집중력 향상을 도모하세요",
    },
    {
      key: "언어 능력",
      value: "양호",
      warning: "언어 능력이 양호합니다",
      additionalInfo: "대화나 독서를 통한 언어 능력 유지가 필요합니다",
    },
    {
      key: "문제 해결 능력",
      value: "보통",
      warning: "문제 해결 능력 향상이 필요합니다",
      additionalInfo: "퍼즐, 보드게임 등 문제 해결 능력 향상 활동을 권장합니다",
    },
  ],

  mealCardFooter: {
    score: 15,
    additionalMemo:
      "전반적으로 균형잡힌 식습관을 보이고 있습니다. 아침 식사량을 조금 더 늘리고, 규칙적인 식사 시간을 유지하는 것이 좋겠습니다.",
  },

  healthCardFooter: {
    score: 65,
    additionalMemo:
      "기본적인 건강 상태는 양호하나, 정기적인 건강 검진과 생활 습관 개선이 필요합니다. 특히 혈압과 혈당 관리를 위해 염분과 당분 섭취를 줄이는 것이 좋겠습니다.",
  },

  physicalCardFooter: {
    score: 10,
    additionalMemo:
      "전반적인 신체 기능은 양호하나, 근력 유지와 균형 감각 향상을 위한 정기적인 운동이 필요합니다. 일주일에 3-4회, 30분 이상의 운동을 권장합니다.",
  },

  cognitiveCardFooter: {
    score: 10,
    additionalMemo:
      "인지 기능은 전반적으로 양호하나, 집중력과 문제 해결 능력 향상을 위한 두뇌 활동이 필요합니다. 새로운 취미나 학습 활동을 통해 인지 기능을 자극하는 것이 좋겠습니다.",
  },
};
