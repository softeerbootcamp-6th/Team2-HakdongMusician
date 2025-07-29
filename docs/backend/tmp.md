# 데이케어센터 플랫폼 백엔드 아키텍처 결정 기록 (2025‑07‑29)

1. 고민 플로우

---

- **팀 규모** : 백엔드 2명 → 의사결정·리팩터링 비용 최소화 필요
- **확장성** : REST 이외에 SSE·gRPC 등 추가 가능성 존재
- **권한 체계** : User(고령자·보호자) / Admin(센터·종사자) 명확 분리
- **도메인 복잡도** : Record, Report 같은 주요 기능이 빠르게 늘어날 전망
- **개발 속도 vs 품질** : MVP 단계에서 과설계 지양, 이후 단계적 성장 원함

2. 후보안(3. 결정 이유

---

- **팀 규모 2명**이라, 과도한 레이어드 설계 대신 가볍고 이해하기 쉬운 구조가 필요했다.
- 향후 **REST 외에 SSE·gRPC 등 추가 프로토콜** 도입 가능성을 고려해, 입출력 어댑터를 모듈화해 두어야 했다.
- 도메인 로직을 재사용하고 테스트 경계를 명확히 하기 위해 **Application(UseCase)과 Domain**을 확실히 분리하고자 했다.
- 초기 MVP 단계에서는 빠른 개발이 중요하지만, 기능이 늘어날 때 **폴더(어댑터)만 추가**하면 확장할 수 있는 구조가 필요했다.

위 이유로 Adapter / Application / Domain / Infrastructure 네 모서리를 유지하면서, 역할(User·Admin)은 Adapter·Application 두 층에서만 분리하는 **경량 Hexagonal 구조**를 최종 채택하였다.

4. 최종 폴더 구조 (초안)

---

```text
adapter/
  user/
  admin/

application/
  user/
  admin/

domain/
  entity/
  service/
  model/

infrastructure/
  database/
```

5. TODO 리스트 (다음 단계)

---

1. ERD 확정 및 Flyway 초기 마이그레이션 스크립트 작성
2. OpenAPI 스펙 초안 작성 → swagger‑ui로 팀 검토
3. `domain/entity` 패키지에 JPA Entity 초안 반영
4. `application/*/facade` 및 주요 UseCase 인터페이스 skeleton 생성
5. `adapter/web` 하위에 User/Admin RestController stub 생성 (Swagger CodeGen 활용)
6. `infrastructure/database` 에 Spring Data JPA repository 구현
7. 기본 CI 파이프라인 & 코드 스타일 체크(lint, format) 설정
8. 단위/통합 테스트 템플릿 마련 (JUnit 5 + Testcontainers)
9. README에 아키텍처 결정 로그 링크 및 개발 규칙 추가

