//공통 responseDTO
export type TGetResponse<T> = {
  status: number;
  message: string;
  result: T;
};

export type TRequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// HTTP 상태 코드별 에러 클래스
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}
