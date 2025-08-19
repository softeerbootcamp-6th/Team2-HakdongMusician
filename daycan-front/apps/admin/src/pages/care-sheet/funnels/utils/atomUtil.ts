import type { HomeFunnelData } from "../home-funnel/types/homeType";
import type { InfoFunnelData } from "../info-funnel/types/infoType";
import type { DiagnosisFunnelData } from "../diagnosis-funnel/types/diagnosisType";
import type { TCareSheetWriteRequest } from "@/services/careSheet/types";

// 두 퍼널의 데이터를 합치는 함수
export const combineFunnelData = (
  homeData: HomeFunnelData | null,
  infoData: InfoFunnelData | null,
  diagnosisData: DiagnosisFunnelData | null
): Partial<TCareSheetWriteRequest> | null => {
  if (!homeData || !infoData || !diagnosisData) return null;

  return {
    writerId: homeData.writerId,
    memberId: infoData.memberId,
    date: infoData.date,
    startTime: infoData.startTime,
    endTime: infoData.endTime,
    mobilityNumber: infoData.mobilityNumber,
    physical: diagnosisData.physical,
    cognitive: diagnosisData.cognitive,
    healthCare: diagnosisData.healthCare,
    recoveryProgram: diagnosisData.recoveryProgram,
    signatureUrl: diagnosisData.signatureUrl,
  };
};

// 검증 결과 타입
export interface ValidationResult {
  isValid: boolean;
  message: string;
  missingFields?: string[];
  invalidTypes?: string[];
}

// TCareSheetWriteRequest 타입 체크 함수
export const validateCareSheetData = (data: any): ValidationResult => {
  if (!data || typeof data !== "object") {
    return {
      isValid: false,
      message: "데이터가 없거나 객체가 아닙니다.",
    };
  }

  const missingFields: string[] = [];
  const invalidTypes: string[] = [];

  // 필수 필드 존재 여부 검증
  const requiredFields = [
    "writerId",
    "memberId",
    "date",
    "startTime",
    "endTime",
    "mobilityNumber",
    "physical",
    "cognitive",
    "healthCare",
    "recoveryProgram",
  ];

  for (const field of requiredFields) {
    if (!(field in data)) {
      missingFields.push(field);
    }
  }

  // 중첩 객체 검증
  const nestedObjects = [
    { field: "physical", name: "신체활동" },
    { field: "cognitive", name: "인지활동" },
    { field: "healthCare", name: "건강관리" },
    { field: "recoveryProgram", name: "회복프로그램" },
  ];

  for (const { field, name } of nestedObjects) {
    if (!data[field] || typeof data[field] !== "object") {
      missingFields.push(`${field} (${name})`);
    }
  }

  // 타입 검증
  const typeChecks = [
    { field: "writerId", name: "작성자ID", expectedType: "number" },
    { field: "memberId", name: "회원ID", expectedType: "number" },
    { field: "date", name: "날짜", expectedType: "string" },
    { field: "startTime", name: "시작시간", expectedType: "string" },
    { field: "endTime", name: "종료시간", expectedType: "string" },
    { field: "mobilityNumber", name: "이동번호", expectedType: "string" },
  ];

  for (const { field, name, expectedType } of typeChecks) {
    if (data[field] !== undefined && typeof data[field] !== expectedType) {
      invalidTypes.push(
        `${field} (${name}): ${typeof data[field]} → ${expectedType}`
      );
    }
  }

  // 검증 결과 생성
  if (missingFields.length > 0 || invalidTypes.length > 0) {
    let message = "케어시트 데이터 검증에 실패했습니다.\n";

    if (missingFields.length > 0) {
      message += `\n누락된 필드:\n${missingFields.map((field) => `• ${field}`).join("\n")}`;
    }

    if (invalidTypes.length > 0) {
      message += `\n\n잘못된 타입:\n${invalidTypes.map((type) => `• ${type}`).join("\n")}`;
    }

    return {
      isValid: false,
      message,
      missingFields,
      invalidTypes,
    };
  }

  return {
    isValid: true,
    message: "케어시트 데이터 검증이 완료되었습니다.",
  };
};
