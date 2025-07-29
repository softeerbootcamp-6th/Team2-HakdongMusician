# 백엔드 패키징 결정 과정 (2025‑07‑29)

## 고민 플로우

- **팀 규모**: 백엔드 2명 → 의사결정·리팩터링 비용 최소화 필요
- **확장성**: REST 이외에 SSE·gRPC 등 추가 가능성 존재
- **사용자 타입**: Member(고령자,보호자) / Admin(센터,종사자) 분리
- **도메인 복잡도**: Record, Report 같은 주요 기능이 빠르게 늘어날 전망
- **개발 속도 vs 품질**: 초기 과설계 지양, 추후 확장성 고려

## 후보안

### 1. 레이어드 아키텍처

- Controller → Service → Repository로 이어지는 전통적인 구조
- User/Admin 구분은 controller 레벨에서만 수행
- **장점**: 익숙하고 구현이 빠름
- **단점**: 계층별 책임이 불분명해지고 역할별 기능 중복 위험

### 2. 기능 기반 수직 분할

- record, report, auth 등 도메인 단위로 기능별 슬라이스
- **장점**: 도메인 응집도 높고 변경에 유연
- **단점**: 역할 분리가 어려워짐, 복잡한 권한 흐름 대응 어려움

### 3. 경량 Hexagonal 구조 (최종 선택)

- Adapter / Application / Domain / Infrastructure 네 계층으로 분리
- Adapter, Application은 역할(Member/Admin) 중심으로 분할
- **장점**: 프로토콜 확장(SSE 등) 용이, 재사용성/테스트성 높음
- **단점**: 폴더 구조가 초기엔 복잡해 보일 수 있음

## 결정

- **팀 규모 2명**이라, 과도한 레이어드 설계 대신 가볍고 이해하기 쉬운 구조가 필요했다.
- 향후 **REST 외에 SSE·gRPC 등 추가 프로토콜** 도입 가능성을 고려해, 입출력 어댑터를 모듈화해 두어야 했다.
- 도메인 로직을 재사용하고 테스트 경계를 명확히 하기 위해 **Application(UseCase)과 Domain**을 확실히 분리하고자 했다.
- 초기 MVP 단계에서는 빠른 개발이 중요하지만, 기능이 늘어날 때 **폴더(어댑터)만 추가**하면 확장할 수 있는 구조가 필요했다.

위 이유로 Adapter / Application / Domain / Infrastructure 네 모서리를 유지하면서, 역할(Member,Admin)은 Adapter,Application 두 층에서만 분리하는 **경량 Hexagonal 구조**를 최종 채택하였다.

4. 최종 폴더 구조 (초안)

---

```text
adapter/
  member/
  admin/

application/
  member/
  admin/

domain/
  entity/
  service/
  model/

infrastructure/
  jpa/
```

## 추후 패키지 구조

infrastructure/ 하위에 cache/, messaging/, file/ 등 기술 스택 확장에 따른 모듈 분리 고려

domain/ 하위 모델 수 증가 시 record/, report/ 등 도메인 중심으로 세분화

application/ 하위에도 도메인 기반으로 슬라이스 분할 가능 (예: user/record, admin/report 등)



## TODO
- `adapter/`하위에 User/Admin RestController (Swagger로 문서화)
- swagger‑ui로 팀 검토
- application/*/facade 및 주요 UseCase 인터페이스 skeleton 생성
- infrastructure/jpa 에 Spring Data JPA repository 구현

