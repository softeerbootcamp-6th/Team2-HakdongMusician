package com.tmp.boiler.logging;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.web.servlet.HandlerInterceptor;
/**
 * 요청과 응답의 기본 정보를 MDC에 저장하고 로깅하는 Interceptor
 */
@Slf4j
public class MdcLoggingInterceptor implements HandlerInterceptor {

  /**
   * 요청 시작 시 MDC를 세팅하고 요청 로그를 출력한다.
   *
   * @return true (다음 핸들러로 요청 진행)
   */
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
    setMdc(request);
    log.info("[REQUEST] rid {} | ip {} | method {} | uri {}",
        MDC.get(MdcKey.REQUEST_ID.name()),
        MDC.get(MdcKey.REQUEST_IP.name()),
        MDC.get(MdcKey.REQUEST_METHOD.name()),
        MDC.get(MdcKey.REQUEST_URI.name())
    );
    return true;
  }

  /**
   * 요청 완료 후 응답 로그를 출력하고 MDC를 초기화한다.
   */
  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
    long startTime = Long.parseLong(MDC.get(MdcKey.START_TIME_MILLIS.name()));
    long endTime = System.currentTimeMillis();
    log.info("[RESPONSE] rid {} | status {} | time {}ms",
        MDC.get(MdcKey.REQUEST_ID.name()),
        response.getStatus(),
        endTime - startTime
    );
    MDC.clear();
  }

  /**
   * 요청 정보를 MDC에 세팅한다.
   *
   * @param request 현재 HTTP 요청
   */
  private void setMdc(HttpServletRequest request) {
    MDC.put(MdcKey.REQUEST_ID.name(), UUID.randomUUID().toString());
    MDC.put(MdcKey.REQUEST_IP.name(), request.getRemoteAddr());
    MDC.put(MdcKey.REQUEST_METHOD.name(), request.getMethod());
    MDC.put(MdcKey.REQUEST_URI.name(), request.getRequestURI());
    MDC.put(MdcKey.REQUEST_PARAMS.name(), request.getQueryString());
    MDC.put(MdcKey.START_TIME_MILLIS.name(), String.valueOf(System.currentTimeMillis()));
    MDC.put(MdcKey.REQEUST_AGENT.name(), request.getHeader("User-Agent"));
    MDC.put(MdcKey.QUERY_COUNT.name(), "0");
  }
}
