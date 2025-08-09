## CI/CD Architecture

<img alt="deploy" src="https://github.com/user-attachments/assets/5a5f89ba-67d2-46d6-b109-9dce922b1233" />

- ☕ Spring Boot 빌드를 위한 환경 세팅
- 🧪 Spring Boot 테스트 실행 (TODO)
- 🔨 Spring Boot 애플리케이션 빌드
- 📤 AWS S3에 배포 번들 업로드
- 🚀 AWS CodeDeploy를 통한 자동 배포

[CI/CD](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/%5BBE%5D-CI-CD-%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8)

## 프로젝트 세팅

[로깅 세팅](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/%5BBE%5D-logging-%EC%84%B8%ED%8C%85)

[전역 예외 처리 & 응답 래퍼 설계](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/%5BBE%5D-%EC%A0%84%EC%97%AD-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%AC-&-%EC%9D%91%EB%8B%B5-%EB%9E%98%ED%8D%BC-%EC%84%A4%EA%B3%84)

## 핵심 도메인 설계 과정

[기록지/리포트 엔티티 관리](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/%5BBE%5D-%EA%B8%B0%EB%A1%9D%EC%A7%80-%EB%A0%88%ED%8F%AC%ED%8A%B8-%EC%A0%80%EC%9E%A5-%EB%B0%A9%EC%8B%9D-%EB%85%BC%EC%9D%98)

[기록지:리포트 스키마 설계 과정](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/%5BBE%5D-%EA%B8%B0%EB%A1%9D%EC%A7%80-%E2%80%90--%EB%A6%AC%ED%8F%AC%ED%8A%B8-%EC%8A%A4%ED%82%A4%EB%A7%88-%EC%84%A4%EA%B3%84-%EA%B3%BC%EC%A0%95)

## Dependencies

| 구분 | 의존성 | 사용 이유 |
|------|--------|-----------|
| **웹 & 테스트** | `org.springframework.boot:spring-boot-starter-web` | Spring MVC 기반 REST API 개발 |
|  | `org.springframework.boot:spring-boot-starter-test` | JUnit, Mockito 등 테스트 환경 구성 |
|  | `org.junit.platform:junit-platform-launcher` | JUnit 실행 환경 구성 |
| **AOP** | `org.springframework.boot:spring-boot-starter-aop` | 로깅, 트랜잭션 관리 등 공통 관심사 분리 |
| **Lombok** | `org.projectlombok:lombok` (compileOnly, annotationProcessor) | Getter/Setter, Builder 등 보일러플레이트 코드 제거 |
| **API 문서** | `org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.9` | Swagger UI 기반 API 문서 자동화 |
| **데이터베이스** | `org.springframework.boot:spring-boot-starter-data-jpa` | JPA/Hibernate 기반 ORM |
|  | `com.mysql:mysql-connector-j` | MySQL 데이터베이스 연결 |
| **보안** | `org.mindrot:jbcrypt:0.4` | 비밀번호 해싱/검증 |
|  | `io.jsonwebtoken:jjwt-api:0.11.5`<br>`io.jsonwebtoken:jjwt-impl:0.11.5`<br>`io.jsonwebtoken:jjwt-jackson:0.11.5` | JWT 생성, 파싱, 서명 검증 |
| **기타** | `com.github.mwiede:jsch:0.2.16` | SSH 터널링을 통한 RDS 연결 |
|  | `io.hypersistence:hypersistence-utils-hibernate-60:3.9.4` | Hibernate 기능 확장(MySQL JSON 타입 지원 등) |
|  | `net.javacrumbs.shedlock:shedlock-spring`<br>`net.javacrumbs.shedlock:shedlock-provider-jdbc-template` | 스케줄러 작업의 중복 실행 방지 (분산 환경에서 안전한 Lock 관리) |
