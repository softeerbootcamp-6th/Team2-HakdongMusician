import type { TTime, YearMonthDay } from "@/types/date";
import type { Gender } from "@/types/gender";
/**
 * 기록지 작성을 위한 타입
 * 식사 종류, 양, 프로그램 타입, 점수(참여도)
 * @author 홍규진
 */
export type MealType = "REGULAR" | "PORRIDGE" | "RICE_WATER";
export type Amount = "FULL" | "MORE_HALF" | "LESS_HALF";
export type ProgramType = "PHYSICAL" | "COGNITIVE";
export type Score = "HIGH" | "MEDIUM" | "LOW";
export type CareSheetStatus = "NOT_APPLICABLE" | "PENDING" | "DONE";
export type CareSheetAttendanceAction = "ABSENT" | "PRESENT";
/**
 * 기록지 조회 리스트 내 응답 타입
 * /admin/care-sheet/{yyyymmdd}
 * @author 홍규진
 */
export type TCareSheetListItem = {
  careSheetId: number;
  status: CareSheetStatus;
  memberMeta: {
    memberId: string;
    name: string;
    birthDate: YearMonthDay;
    gender: Gender;
    avatarUrl: string;
  };
  isAttending: boolean;
  writerName: string;
  writerId: number;
};

/**
 * 기록지 조회 리스트 내 응답 타입
 * /admin/care-sheet/{yyyymmdd}
 * @author 홍규진
 */
export type TCareSheetReadRequest = {
  date: YearMonthDay;
  memberId: string;
};

/**
 * 기록지 작성 조회 응답 타입
 * /admin/care-sheet/{date}/{memberId}
 * @author 홍규진
 */
export type TCareSheetReadResponse = {
  id: number;
  writerId: number;
  memberId: number;
  memberCode: string;
  date: YearMonthDay;
  startTime: TTime;
  endTime: TTime;
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
        mealType: MealType;
        amount: Amount;
      };
      validProvidedEntry: boolean;
    };
    lunch: {
      provided: boolean;
      entry: {
        mealType: MealType;
        amount: Amount;
      };
      validProvidedEntry: boolean;
    };
    dinner: {
      provided: boolean;
      entry: {
        mealType: MealType;
        amount: Amount;
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
    temperature: {
      temperature: number;
    };
    comment: string;
  };
  recoveryProgram: {
    motionTraining: boolean;
    cognitiveProgram: boolean;
    cognitiveEnhancement: boolean;
    physicalTherapy: boolean;
    programEntries: {
      type: ProgramType;
      name: string;
      score: Score;
    }[];
    comment: string;
  };
};

/**
 * 기록지 작성 요청 타입
 * /admin/care-sheet
 * @author 홍규진
 */
export type TCareSheetWriteRequest = {
  writerId: number;
  memberId: number;
  date: YearMonthDay;
  startTime: TTime;
  endTime: TTime;
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
        mealType: MealType;
        amount: Amount;
      };
      validProvidedEntry: boolean;
    };
    lunch: {
      provided: boolean;
      entry: {
        mealType: MealType;
        amount: Amount;
      };
      validProvidedEntry: boolean;
    };
    dinner: {
      provided: boolean;
      entry: {
        mealType: MealType;
        amount: Amount;
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
    temperature: {
      temperature: number;
    };
    comment: string;
  };
  recoveryProgram: {
    motionTraining: boolean;
    cognitiveProgram: boolean;
    cognitiveEnhancement: boolean;
    physicalTherapy: boolean;
    programEntries: {
      type: ProgramType;
      name: string;
      score: Score;
    }[];
    comment: string;
  };
  signatureUrl: string;
};

/**
 * 수급자 출결 처리 함수
 * /admin/care-sheet/attendance
 * @author 홍규진
 */
export type TCareSheetAttendanceRequest = {
  date: YearMonthDay;
  memberIds: number[];
  action: CareSheetAttendanceAction;
};
