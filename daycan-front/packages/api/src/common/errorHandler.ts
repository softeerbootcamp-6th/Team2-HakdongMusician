import { isAxiosError } from "axios";
import {
  ClientError,
  HttpError,
  NetworkError,
  ServerError,
  AuthError,
} from "./types";

/**
 * 에러 처리 헬퍼 함수
 * HTTP 레벨 에러, 백엔드 비즈니스 에러 처리
 * 추후에 해당 에러를 ErrorBoundary로 받아서 처리하는 로직을 추가할 예정입니다.
 * @author 홍규진
 */
export function parseError(err: unknown): never {
  if (isAxiosError(err)) {
    // 네트워크 단에서 err 객체의 response 자체가 없는 경우 네트워크 에러로 판단
    if (!err.response) {
      throw new NetworkError(err.message);
    }
    // HTTP 단에서 제공하는 상태 코드 - 현재 미사용
    // const httpStatus = err.response.status;

    // 백엔드단에서 제공하는 상태 코드 (responseDTO 내 status 코드) - 현재 미사용
    // const backEndStatus = err.response.data.status;

    // 백엔드단에서 제공하는 코드 (responseDTO 내 code 코드)
    const backEndCode = err.response.data.code;
    const backEndMessage = err.response.data.message;

    /**
     * 백엔드단에서 제공하는 비즈니스 에러 처리 (responseDTO 내 message 메시지와 status로 구분)
     * code 코드 체계 참고 (status + 2자리 숫자(비즈니스 에러 코드))
     * 백엔드 단에서의 에러는 50000 대 코드이다. 50000 대 코드는 모두 서버 에러로 판단한다.
     * 40000 대의 코드는 모두 클라이언트 에러로 판단한다.
     * 40400 - 404 에러 + 비즈니스 에러 코드
     * 40300 - 403 에러 + 비즈니스 에러 코드 (인증/인가 에러)
     * 40100 - 401 에러 + 비즈니스 에러 코드 (인증 에러)
     * 40000 - 400 에러 + 비즈니스 에러 코드
     */
    if (backEndCode >= 40100 && backEndCode < 40200) {
      // 401 에러 - 인증 에러 (로그인이 필요하거나 토큰이 만료된 경우)
      throw new AuthError(backEndCode, backEndMessage);
    } else if (backEndCode >= 40300 && backEndCode < 40400) {
      // 403 에러 - 인가 에러 (권한이 없는 경우)
      throw new AuthError(backEndCode, backEndMessage);
    } else if (backEndCode >= 40000 && backEndCode < 50000) {
      // 기타 클라이언트 에러 처리 - 추후에 이는 모달이나, Toast 등으로 처리될 예정
      throw new ClientError(backEndCode, backEndMessage);
    } else if (backEndCode >= 50000) {
      // 서버 에러 처리 - 추후에 이는 Sentry 등으로 처리하면 좋을 듯
      throw new ServerError(backEndCode, backEndMessage);
    } else {
      // 엣지한 케이스 - 성공했으나, 에러 코드로 간주되는 경우 (ex. 300, 200 대의 에러 코드)
      throw new HttpError(backEndCode, backEndMessage);
    }
  }

  throw err;
}
