package com.daycan.common.logging;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

/**
 * AOP 설정 클래스
 * @EnableAspectJAutoProxy를 활성화해 @Aspect 기반의 AOP를 사용할 수 있도록 설정한다.
 */
@Configuration
@EnableAspectJAutoProxy
public class AopConfig {
}
