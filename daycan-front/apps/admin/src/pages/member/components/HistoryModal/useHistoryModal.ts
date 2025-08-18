import { useState } from "react";

//TODO: 임시 데이터 타입 정의(어차피 나중가서 API 연동 시 싸그리 다 제거 필요)
export interface Entry {
  key: string;
  value: string;
  warning: string;
  additionalInfo: string;
}

export interface CardFooter {
  score: number;
  additionalMemo: string;
}

export interface ReportHistoryData {
  totalScore: number;
  changeAmount: number;
  mealScore: number;
  healthScore: number;
  physicalScore: number;
  cognitiveScore: number;
  mealEntries: Entry[];
  mealCardFooter: CardFooter;
  healthEntries: Entry[];
  healthCardFooter: CardFooter;
  physicalEntries: Entry[];
  physicalCardFooter: CardFooter;
  cognitiveEntries: Entry[];
  cognitiveCardFooter: CardFooter;
}

// ===== CareSheet 데이터 타입 정의 =====
export interface CareSheetHistoryData {
  id: number;
  writerId: number;
  recipientId: string;
  date: string;
  startTime: string;
  endTime: string;
  mobilityNumber: string;
  physical: {
    assistWashing: boolean;
    assistMovement: boolean;
    assistBathing: boolean;
    bathingDurationMinutes: string;
    bathingType: string;
    breakfast: {
      provided: boolean;
      entry: {
        mealType: string;
        amount: string;
      };
      validProvidedEntry: boolean;
    };
    lunch: {
      provided: boolean;
      entry: {
        mealType: string;
        amount: string;
      };
      validProvidedEntry: boolean;
    };
    dinner: {
      provided: boolean;
      entry: {
        mealType: string;
        amount: string;
      };
      validProvidedEntry: boolean;
    };
    numberOfStool: number;
    numberOfUrine: number;
    comment: string;
  };
  cognitive: {
    assistCognitiveCare: boolean;
    assistCommunication: boolean;
    comment: string;
  };
  healthCare: {
    healthCare: boolean;
    nursingCare: boolean;
    emergencyService: boolean;
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    temperature: number;
    comment: string;
  };
  recoveryProgram: {
    motionTraining: boolean;
    cognitiveProgram: boolean;
    cognitiveEnhancement: boolean;
    physicalTherapy: boolean;
    programEntries: Array<{
      type: string;
      name: string;
      score: string;
    }>;
    comment: string;
  };
}

export const useHistoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [historyData, setHistoryData] = useState<ReportHistoryData | null>(
    null
  );
  const [careSheetData, setCareSheetData] =
    useState<CareSheetHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ===== 데이터 조회 함수 =====
  const fetchHistoryData = async (date: Date, memberId: string) => {
    console.log("fetchHistoryData", date, memberId);
    setIsLoading(true);
    try {
      // TODO: 실제 API 호출로 교체
      // const response = await api.getHistoryData(date);
      // setHistoryData(response.data);

      // 임시 데이터 (실제 연동 시 제거)
      const mockReportHistoryData: ReportHistoryData = {
        totalScore: 85,
        changeAmount: 10,
        mealScore: 15,
        healthScore: 15,
        physicalScore: 15,
        cognitiveScore: 15,
        mealEntries: [
          {
            key: "아침",
            value: "오늘은 아침을 했어요!",
            warning: "반찬 투정을 하셨어요",
            additionalInfo: "식사량: 80%",
          },
          {
            key: "점심",
            value: "오늘은 점심을 했어요!",
            warning: "",
            additionalInfo: "식사량: 90%",
          },
          {
            key: "저녁",
            value: "오늘은 저녁을 했어요!",
            warning: "",
            additionalInfo: "식사량: 85%",
          },
        ],
        mealCardFooter: {
          score: 15,
          additionalMemo: "오늘 식사를 완료했어요",
        },
        healthEntries: [
          {
            key: "혈압",
            value: "120/80",
            warning: "",
            additionalInfo: "정상 범위",
          },
          {
            key: "체온",
            value: "36.5℃",
            warning: "",
            additionalInfo: "정상 체온",
          },
        ],
        healthCardFooter: {
          score: 15,
          additionalMemo: "건강 상태 양호",
        },
        physicalEntries: [
          {
            key: "게이트 볼",
            value: "게이트 볼을 통해서, 몸과 마음을 단련시켰어요.",
            warning: "",
            additionalInfo: "활동 시간: 30분",
          },
        ],
        physicalCardFooter: {
          score: 15,
          additionalMemo: "신체 활동 완료",
        },
        cognitiveEntries: [
          {
            key: "노래부르기",
            value: "노래부르기 활동을 통해서, 몸과 마음을 단련시켰어요.",
            warning: "",
            additionalInfo: "참여도: 높음",
          },
        ],
        cognitiveCardFooter: {
          score: 15,
          additionalMemo: "인지 활동 완료",
        },
      };

      setHistoryData(mockReportHistoryData);
    } catch (error) {
      console.error("데이터 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ===== CareSheet 데이터 조회 함수 =====
  const fetchCareSheetData = async (date: Date, memberId: string) => {
    console.log("fetchCareSheetData", date, memberId);
    setIsLoading(true);
    console.log("fetchCareSheetData", date);
    try {
      // TODO: 실제 API 호출로 교체
      // const response = await api.getCareSheetData(date);
      // setCareSheetData(response.data);

      // 임시 데이터 (실제 연동 시 제거)
      const mockCareSheetHistoryData: CareSheetHistoryData = {
        id: 10,
        writerId: 1,
        recipientId: "RP123456",
        date: "2025-08-01",
        startTime: "09:00",
        endTime: "17:00",
        mobilityNumber: "123가4567",
        physical: {
          assistWashing: true,
          assistMovement: true,
          assistBathing: true,
          bathingDurationMinutes: "30분",
          bathingType: "샤워",
          breakfast: {
            provided: true,
            entry: {
              mealType: "REGULAR",
              amount: "FULL",
            },
            validProvidedEntry: true,
          },
          lunch: {
            provided: true,
            entry: {
              mealType: "REGULAR",
              amount: "FULL",
            },
            validProvidedEntry: true,
          },
          dinner: {
            provided: true,
            entry: {
              mealType: "REGULAR",
              amount: "FULL",
            },
            validProvidedEntry: true,
          },
          numberOfStool: 1,
          numberOfUrine: 3,
          comment: "보행 시 통증 호소",
        },
        cognitive: {
          assistCognitiveCare: true,
          assistCommunication: true,
          comment: "대화 시 약간의 혼동 보임",
        },
        healthCare: {
          healthCare: true,
          nursingCare: false,
          emergencyService: false,
          bloodPressure: {
            systolic: 0,
            diastolic: 0,
          },
          temperature: 36.5,
          comment: "정상 범위 유지",
        },
        recoveryProgram: {
          motionTraining: true,
          cognitiveProgram: true,
          cognitiveEnhancement: false,
          physicalTherapy: true,
          programEntries: [
            {
              type: "PHYSICAL",
              name: "숫자 맞추기 게임",
              score: "HIGH",
            },
          ],
          comment: "프로그램에 적극적으로 참여",
        },
      };

      setCareSheetData(mockCareSheetHistoryData);
    } catch (error) {
      console.error("CareSheet 데이터 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
    historyData,
    careSheetData,
    isLoading,
    fetchHistoryData,
    fetchCareSheetData,
  };
};
