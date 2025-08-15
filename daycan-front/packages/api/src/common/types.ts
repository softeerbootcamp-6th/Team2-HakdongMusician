/**
 * 메서드 타입
 */
export type TMethod = "get" | "post" | "put" | "delete" | "patch";

/**
 * 공통 responseDTO
 * status: HTTP 상태 코드
 * code: 백엔드 비즈니스 상태 코드
 * message: 응답 메시지 (백엔드 비즈니스 에러 메시지 / 성공 메시지)
 * result: 실제 데이터
 * @author 홍규진
 */
export type TGetResponse<T> = {
  status: number;
  code: number;
  message: string;
  result: T;
};

/**
 * 네트워크/전송 계층 에러 (DNS, CORS 등)
 * @author 홍규진
 */
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

/**
 * 클라이언트 레벨 에러 (ex. 4xx) 등 통신 과정에서의 에러
 * @author 홍규진
 */
export class ClientError extends Error {
  constructor(
    public code: number,
    message: string
  ) {
    super(message);
    this.name = "ClientError";
  }
}

/**
 * 인증/인가 관련 에러 (401, 403 등)
 * @author 홍규진
 */
export class AuthError extends Error {
  constructor(
    public code: number,
    message: string
  ) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * HTTP 레벨 에러 (ex. 3xx, 2xx) 등 통신 과정에서의 엣지한 에러 (400, 500 대가 아닌데 에러로 판단되는 경우)
 * @author 홍규진
 */
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "HttpError";
  }
}

/**
 * 서버 레벨 에러 (ex. 5xx) 등 서버 측에서의 에러 (서버 에러)
 * @author 홍규진
 */
export class ServerError extends Error {
  constructor(
    public code: number,
    message: string
  ) {
    super(message);
    this.name = "ServerError";
  }
}
