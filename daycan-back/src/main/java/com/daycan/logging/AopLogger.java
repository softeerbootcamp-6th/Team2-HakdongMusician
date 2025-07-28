package com.tmp.boiler.logging;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;

/**
 * 서비스 및 레포지토리 계층의 실행 시간을 추적하고,
 * 레포지토리 호출 시 쿼리 카운트를 MDC에 누적하는 AOP 로거
 */

@Aspect
@Component
@Slf4j
public class AopLogger {

  /**
   * 서비스 계층의 모든 메소드(Pointcut)
   * <p>
   * com.daycan.api 하위의 모든 클래스와 메소드를 타겟으로 지정한다.
   * TODO: 프로젝트 패키징 구성 후 경로 재정의 하기.
   */
  @Pointcut("execution(* com.daycan.api..*.*(..))")
  public void serviceAdvice() {}

  /**
   * 레포지토리 계층의 모든 메소드(Pointcut)
   * <p>
   * repository 패키지 내의 모든 클래스와 메소드를 타겟으로 지정한다.
   * TODO: 프로젝트 패키징 구성 후 경로 재정의 하기.
   */
  @Pointcut("execution(* com.daycan.api..repository.*.*(..))")
  public void repositoryAdvice() {}


  /**
   * 서비스 계층 메소드의 실행 시간을 측정
   *
   * @param joinPoint 실행 중인 대상 메소드 정보
   * @return 대상 메소드의 반환 값
   * @throws Throwable 대상 메소드 실행 중 발생한 예외
   */
  @Around("serviceAdvice()")
  public Object logServiceTime(ProceedingJoinPoint joinPoint) throws Throwable {
    long start = System.currentTimeMillis();
    Object result = joinPoint.proceed();
    long elapsed = System.currentTimeMillis() - start;

    log.info("METHOD: {} | {}ms",
        joinPoint.getSignature().toShortString(), elapsed
    );
    return result;
  }

  /**
   * 레포지토리 호출 시 쿼리 카운트 증가
   */
  @Before("repositoryAdvice()")
  public void countQuery() {
    String queryCountStr = MDC.get(MdcKey.QUERY_COUNT.name());
    int queryCount = (queryCountStr == null) ? 0 : Integer.parseInt(queryCountStr);
    MDC.put(MdcKey.QUERY_COUNT.name(), String.valueOf(queryCount + 1));
  }
}
