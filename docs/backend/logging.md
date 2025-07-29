# Spring Boot 로깅 & AOP 세팅

## 목표

- 요청과 응답에 대해 RID, URI, 실행 시간, 쿼리 수를 로깅
- AOP로 서비스와 레포지토리 계층의 실행 시간을 추적하고, 레포지토리 호출 횟수를 쿼리 카운트로 관리
- 비동기 작업에서도 같은 RID를 유지
---

## 적용 순서
- 의존성으로 spring-boot-starter-aop를 추가
- MdcKey enum을 만들어 REQUEST_ID, QUERY_COUNT 등 추적용 키를 정의
- 요청과 응답 로깅을 위해 MdcLoggingInterceptor를 만들고 WebConfig에 등록
- 서비스 실행 시간과 쿼리 카운트를 위해 AopLogger를 작성했고 AopConfig로 활성화
- 비동기 작업에서도 Trace를 유지하기 위해 MdcCopyTaskDecorator를 사용해 AsyncConfig에 등록


```
[REQUEST] rid 1234 | ip 127.0.0.1 | method GET | uri /test
SERVICE_LOG: TestService.doSomething() | 101ms
[RESPONSE] rid 1234 | status 200 | time 103ms | queries 1
Async log test rid 1234
```

## 예시

- 요청이 들어오면 [REQUEST] 로그가 찍히고, 서비스 계층 실행 시간은 SERVICE_LOG로 기록된다.
- 응답 시 [RESPONSE] 로그에 총 실행 시간과 쿼리 카운트가 함께 찍힌다.
- 비동기 작업에서도 동일한 RID가 유지되어 Async log test 로그가 찍힌다.


## TODO

운영 환경에서는 JSON 포맷으로 변환시도 하기
개발 환경은 지금처럼 텍스트 포맷을 유지