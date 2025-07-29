# 0728 정리

## BE (Backend)

### 작업 내용
- ERD 간략 설계
- 프로젝트 초기 세팅 완료
- 로깅(AOP + MDC 기반) 설정 완료

### 논의할 내용

#### 인프라
- EC2 인스턴스 2개 사용 예정
- 멀티모듈 여부 논의
    - 인스턴스 분리 / 컨테이너 분리 / 프로젝트 분리 중 선택 필요
- DB를 public으로 열지, private으로 제한할지 결정 필요

#### 로직
- 기록지의 특이사항 처리 방법 (테이블 분리 고려?)
- Record → Report 상태 관리 흐름 정의 필요
- 계정 분리의 필요성과 목적 정리
- 차량 번호 관리 방식 설계 필요

## FE (Frontend)

### 작업 내용
- Turborepo 기반 모노레포 환경 구축
- Color System 정의 및 Context 기반 주입
- Typo System 정의 (Display / Heading / Body 등) 및 구현
- admin / client 레포 구조 세팅 완료
