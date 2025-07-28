package com.daycan.logging;

/**
 * MDC에서 사용하는 키 정의
 */
public enum MdcKey {
  /** 요청 식별자(UUID) */
  REQUEST_ID,
  /** 요청 IP */
  REQUEST_IP,
  /** HTTP Method */
  REQUEST_METHOD,
  /** 요청 URI */
  REQUEST_URI,
  /** Query Parameter */
  REQUEST_PARAMS,
  /** 요청 시작 시각(ms) */
  START_TIME_MILLIS,
  /** User-Agent */
  REQEUST_AGENT,
  /** 레포지토리 호출 횟수 */
  QUERY_COUNT
}
