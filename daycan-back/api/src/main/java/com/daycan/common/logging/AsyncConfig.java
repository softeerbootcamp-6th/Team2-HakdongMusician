package com.daycan.common.logging;

import java.util.concurrent.Executor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;


/**
 * 비동기 작업에서 MDC Trace를 유지하기 위한 Async 설정 클래스
 */
@EnableAsync
@Configuration
public class AsyncConfig implements AsyncConfigurer {

  /**
   * @return MDC Trace를 유지하는 ThreadPoolTaskExecutor
   */
  @Override
  public Executor getAsyncExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(2);
    executor.setMaxPoolSize(3);
    executor.setQueueCapacity(200);
    executor.setTaskDecorator(new MdcCopyTaskDecorator());
    executor.initialize();
    return executor;
  }
}
