/**
 * 생년월일 입력 시 자동으로 YYYY.MM.DD 형식으로 변환하는 함수
 * @param value - 사용자 입력값
 * @returns 포맷팅된 생년월일 문자열
 */
export const formatBirthDate = (value: string): string => {
  // 숫자와 점만 허용
  const cleaned = value.replace(/[^\d.]/g, "");

  // 점이 이미 있는 경우 중복 제거
  const parts = cleaned.split(".").filter((part) => part.length > 0);

  let result = "";

  if (parts.length > 0) {
    // 첫 번째 부분 (년도)
    if (parts[0].length <= 4) {
      result += parts[0];
    } else {
      result += parts[0].substring(0, 4);
    }

    // 두 번째 부분 (월)
    if (parts.length > 1 && parts[1].length <= 2) {
      result += "." + parts[1];
    } else if (parts.length > 1) {
      result += "." + parts[1].substring(0, 2);
    }

    // 세 번째 부분 (일)
    if (parts.length > 2 && parts[2].length <= 2) {
      result += "." + parts[2];
    } else if (parts.length > 2) {
      result += "." + parts[2].substring(0, 2);
    }
  }

  return result;
};

/**
 * 생년월일 입력 시 자동으로 YYYY.MM.DD 형식으로 변환하는 함수 (실시간 입력용)
 * @param value - 사용자 입력값
 * @returns 포맷팅된 생년월일 문자열
 */
export const formatBirthDateOnInput = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/\D/g, "");

  if (numbers.length === 0) return "";
  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 4)}.${numbers.slice(4)}`;

  return `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}.${numbers.slice(6, 8)}`;
};

/**
 * 연락처 입력 시 자동으로 XXX-XXXX-XXXX 형식으로 변환하는 함수
 * @param value - 사용자 입력값
 * @returns 포맷팅된 연락처 문자열
 */
export const formatPhoneNumber = (value: string): string => {
  // 숫자와 하이픈만 허용
  const cleaned = value.replace(/[^\d-]/g, "");

  // 하이픈이 이미 있는 경우 중복 제거
  const parts = cleaned.split("-").filter((part) => part.length > 0);

  let result = "";

  if (parts.length > 0) {
    // 첫 번째 부분 (지역번호)
    if (parts[0].length <= 3) {
      result += parts[0];
    } else {
      result += parts[0].substring(0, 3);
    }

    // 두 번째 부분 (국번)
    if (parts.length > 1 && parts[1].length <= 4) {
      result += "-" + parts[1];
    } else if (parts.length > 1) {
      result += "-" + parts[1].substring(0, 4);
    }

    // 세 번째 부분 (번호)
    if (parts.length > 2 && parts[2].length <= 4) {
      result += "-" + parts[2];
    } else if (parts.length > 2) {
      result += "-" + parts[2].substring(0, 4);
    }
  }

  return result;
};

/**
 * 연락처 입력 시 자동으로 XXX-XXXX-XXXX 형식으로 변환하는 함수 (실시간 입력용)
 * @param value - 사용자 입력값
 * @returns 포맷팅된 연락처 문자열
 */
export const formatPhoneNumberOnInput = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/\D/g, "");

  if (numbers.length === 0) return "";
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

/**
 * 생년월일 유효성 검사 함수
 * @param value - 생년월일 문자열 (YYYY.MM.DD 형식)
 * @returns 유효성 검사 결과 객체
 */
export const validateBirthDate = (
  value: string
): { isValid: boolean; errorMessage: string } => {
  if (!value || value.length < 10) {
    return { isValid: false, errorMessage: "올바른 생년월일을 입력해 주세요" };
  }

  const parts = value.split(".");
  if (parts.length !== 3) {
    return { isValid: false, errorMessage: "올바른 생년월일을 입력해 주세요" };
  }

  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  // 기본 범위 검사
  if (year < 1900 || year > new Date().getFullYear()) {
    return { isValid: false, errorMessage: "올바른 생년월일을 입력해 주세요" };
  }

  if (month < 1 || month > 12) {
    return { isValid: false, errorMessage: "올바른 생년월일을 입력해 주세요" };
  }

  if (day < 1 || day > 31) {
    return { isValid: false, errorMessage: "올바른 생년월일을 입력해 주세요" };
  }

  // 실제 날짜 존재 여부 검사
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return { isValid: false, errorMessage: "올바른 생년월일을 입력해 주세요" };
  }

  return { isValid: true, errorMessage: "" };
};

/**
 * 연락처 유효성 검사 함수
 * @param value - 연락처 문자열
 * @returns 유효성 검사 결과 객체
 */
export const validatePhoneNumber = (
  value: string
): { isValid: boolean; errorMessage: string } => {
  if (!value) {
    return {
      isValid: false,
      errorMessage: "정확한 연락처를 하이픈(-) 없이 입력해주세요",
    };
  }

  // 하이픈 제거 후 숫자만 추출
  const numbers = value.replace(/\D/g, "");

  if (numbers.length !== 11) {
    return {
      isValid: false,
      errorMessage: "정확한 연락처를 하이픈(-) 없이 입력해주세요",
    };
  }

  // 010, 011, 016, 017, 018, 019로 시작하는지 확인
  const prefix = numbers.substring(0, 3);
  const validPrefixes = ["010", "011", "016", "017", "018", "019"];

  if (!validPrefixes.includes(prefix)) {
    return {
      isValid: false,
      errorMessage: "정확한 연락처를 하이픈(-) 없이 입력해주세요",
    };
  }

  return { isValid: true, errorMessage: "" };
};

/**
 * 장기요양인증번호 유효성 검사 함수
 * @param value - 장기요양인증번호 문자열
 * @returns 유효성 검사 결과 객체
 */
export const validateLongTermCareNumber = (
  value: string
): { isValid: boolean; errorMessage: string } => {
  if (!value) {
    return { isValid: false, errorMessage: "L+숫자 10자리로 입력해주세요" };
  }

  if (value.length !== 11) {
    return { isValid: false, errorMessage: "L+숫자 10자리로 입력해주세요" };
  }

  if (!value.startsWith("L")) {
    return { isValid: false, errorMessage: "L+숫자 10자리로 입력해주세요" };
  }

  const numbers = value.substring(1);
  if (!/^\d{10}$/.test(numbers)) {
    return { isValid: false, errorMessage: "L+숫자 10자리로 입력해주세요" };
  }

  return { isValid: true, errorMessage: "" };
};

/**
 * 비밀번호 유효성 검사 함수
 * @param value - 비밀번호 문자열
 * @returns 유효성 검사 결과 객체
 */
export const validatePassword = (
  value: string
): { isValid: boolean; errorMessage: string } => {
  if (!value) {
    return { isValid: true, errorMessage: "" };
  }

  // 5자 이하인 경우
  if (value.length <= 5) {
    return { isValid: false, errorMessage: "6자리 이상 입력해주세요" };
  }

  // 공백이 포함된 경우
  if (/\s/.test(value)) {
    return { isValid: false, errorMessage: "공백 없이 입력해주세요" };
  }

  // 허용되지 않은 문자가 포함된 경우
  // 사용 가능한 특수문자: ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ ₩ ] ^ _ ` { | } ~
  const validPattern = /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[₩\]^_`{|}~]+$/;

  if (!validPattern.test(value)) {
    return {
      isValid: false,
      errorMessage: "사용할 수 없는 문자가 포함되어 있어요",
    };
  }

  return { isValid: true, errorMessage: "" };
};
