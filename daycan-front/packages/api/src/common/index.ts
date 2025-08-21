/**
 * safeRequest 함수는 백엔드 표준 응답 검증 후 데이터 반환을 통해 다음과 같은 에러를 분기로 나눕니다.
 * 1. 클라이언트 레벨 에러 (ex. 4xx)
 * 2. 서버 레벨 에러 (ex. 5xx)
 * 3. HTTP 레벨 에러 (ex. 3xx, 2xx)
 * 해당 에러들을 요청과 함께, try/catch 문으로 에러를 파싱하고, 각 Application 단에서 에러를 처리할 수 있게 분리합니다.
 * application 정책이 바뀌더라도 공통으로 사용하기 위한 시스템의 경계를 명확하게 하는 것에 중점을 둡니다.
 * * @author 홍규진
 */
export * from "./instance";
export * from "./interceptor";

export * from "./types";
export * from "./safeRequest";
