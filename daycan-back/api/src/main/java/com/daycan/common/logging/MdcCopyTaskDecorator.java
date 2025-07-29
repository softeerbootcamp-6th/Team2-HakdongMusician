package com.daycan.common.logging;

import java.util.Map;
import org.slf4j.MDC;
import org.springframework.core.task.TaskDecorator;


/**
 * MDC Context를 비동기 작업 스레드에 복사해주는 TaskDecorator
 */
public class MdcCopyTaskDecorator implements TaskDecorator {

  /**
   * @param runnable 비동기로 실행할 작업
   * @return MDC Context가 복사된 Runnable
   */
  @Override
  public Runnable decorate(Runnable runnable) {
    Map<String, String> contextMap = MDC.getCopyOfContextMap();
    return () -> {
      try {
        if (contextMap != null) MDC.setContextMap(contextMap);
        runnable.run();
      } finally {
        MDC.clear();
      }
    };
  }
}
