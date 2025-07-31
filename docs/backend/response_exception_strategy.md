# 전역 예외 처리 & 응답 래퍼 설계

## 개요
- **목적**: API 응답 구조의 일관성 확보 및 예외 처리 로직의 중앙화
- **기본 구성**
    - `ApiResponse<T>(status, message, result)` 레코드로 응답 바디 통일
    - `ErrorStatus` 인터페이스 + `CommonErrorStatus`/도메인별 Enum으로 상태·메시지 관리
    - `ApplicationException` 단일 커스텀 예외 클래스
    - `GlobalExceptionHandler`에서 예외를 한곳에서 처리

---

## 고려한 대안 및 비교

### 1. 예외 상태 관리 방식
| 방식 | 장점 | 단점 |
|------|------|------|
| **단일 `ErrorStatus` enum** | - 관리 포인트가 하나<br>- 코드 검색 용이 | - 공통·도메인 에러 섞여 복잡도 증가 |
| **`ErrorStatus` 인터페이스 + `CommonErrorStatus` / 도메인별 Enum 분리** | - 공통 에러와 도메인 에러 역할 분리<br>- 신규 도메인 추가 시 enum만 추가 | - enum 클래스 수 증가<br>- 구조 이해에 약간의 진입 장벽 |

---

### 2. 예외 클래스 설계
| 방식 | 장점 | 단점 |
|------|------|------|
| **단일 `ApplicationException` 사용** | - 예외 처리 로직 일원화<br>- 코드베이스 간결 | - 예외 구분(catch) 시 모두 한 종류<br>- IDE 자동 완성으로 특정 예외 검색 어려움 |
| **도메인별 구체 예외 클래스 도입**<br>`DuplicateEmailException` 등 | - 예외명만으로 의미 파악 가능<br>- 특정 예외별 세부 처리 용이 | - 클래스 개수 증가<br>- 초기 설정·유지보수 비용 상승 |

---

### 3. 예외 처리 레이어
| 방식 | 장점 | 단점 |
|------|------|------|
| **ControllerAdvice 기반**<br>`@RestControllerAdvice` | - Spring 기본 흐름 활용<br>- 응답 포맷·로그 일관화 | - 필터 레벨 예외 미포함<br>- 인증·인가 예외는 별도 처리 필요 |
| **Filter/AOP 레벨 처리** | - DispatcherServlet 이전 예외 처리 가능<br>- 인증·로깅과 통합 제어 | - Spring HandlerAdvice와 중복 가능성<br>- 처리 위·아래 계층 경계 헷갈림 |

---

### 4. HTTP 상태 코드 제어
| 방식 | 장점 | 단점 |
|------|------|------|
| **`ResponseEntity<ApiResponse>`** | - HTTP 상태 코드(200·400·500…)를 정확히 제어<br>- 일관된 JSON 구조 유지 | - 코드가 다소 장황해질 수 있음 |
| **`@ResponseStatus` + `ApiResponse`** | - 어노테이션만으로 상태 지정<br>- 코드 간결 | - 동적으로 상태 변경 불가<br>- `ErrorStatus` enum과 연동 어려움 |

---

## 최종 결정 및 설계 근거

1. **`ErrorStatus` 인터페이스 + `CommonErrorStatus` / 도메인별 Enum 분리**
    - 공통·도메인 에러 관리 포인트 분리
    - 신규 도메인 에러 추가 시 해당 패키지에만 enum 생성

2. **단일 `ApplicationException` 사용**
    - 예외 처리 흐름을 `GlobalExceptionHandler`로 일원화
    - 복잡도가 지나치게 높아지지 않도록 초기에는 단순 구조 유지
    - 필요 시 도메인별 구체 예외만 선별 도입

3. **ControllerAdvice 기반 전역 처리 + Filter 레벨 인증 예외 직접 처리**
    - 비즈니스/검증 예외는 `@RestControllerAdvice`에서 통합 관리
    - 인증·인가 예외는 `AuthFilter` 등 필터에서 `ObjectMapper`로 직접 응답

4. **`ResponseEntity<ApiResponse>` 사용**
    - HTTP 상태 코드와 JSON 바디 구조를 모두 정확히 제어
    - 프론트 파싱 편의와 API 문서화 시 명확성 확보

---

### 느낀 점
- 다양한 대안을 검토하며, **단순함과 확장성의 균형**에 집중
- 설계 의도를 명확히 문서화함으로써 팀 전체의 이해도 및 유지보수성 강화
- 앞으로도 새로운 기능 도입 시 “왜 이 구조를 선택했는가?”를 함께 적어두는 습관 유지

