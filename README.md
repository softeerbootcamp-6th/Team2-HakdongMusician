# Daycan (데이케어센터)

<div align="center">

![Daycan Logo](https://github.com/user-attachments/assets/36e55169-e5da-4680-bc1a-1cad9a74eb9e)

**데이케어센터 종사자와 보호자를 위한 건강 리포트 자동화 서비스**

**센터 종사자용 관리자 포털**: [https://admin.daycan.kr/](https://admin.daycan.kr/)

**보호자용 클라이언트 포털**: [https://www.daycan.kr/](https://www.daycan.kr/)

</div>

---

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [팀 소개](#팀-소개)
- [기술 스택](#기술-스택)
- [프로젝트 설계](#프로젝트-설계)
- [프로젝트 구조](#프로젝트-구조)
- [컨벤션 및 협업](#컨벤션-및-협업)

---

## 프로젝트 개요

Daycan은 데이케어센터에서 일일 건강 상태를 체크하고, 이를 보호자에게 자동으로 리포트 형태로 전송하는 서비스입니다.

### 서비스 특징

- **손쉬운 기록지 작성**: 센터 종사자가 간편하게 모바일로 기록지 작성
- **실시간 리포트 생성**: 입력된 데이터를 바탕으로 상세한 건강 리포트 자동 생성
- **예약 전송 || 즉시 전송**: 생성된 리포트를 보호자에게 예약 전송 또는 즉시 전송
- **건강 수치 통계** 리포트 내용을 토대로 어르신의 건강상태 데이터를 통계로 확인할 수 있습니다.

### 서비스 플로우

```
센터 종사자 로그인 → 기록지 작성 → 리포트 생성 → 보호자에게 전송
보호자 로그인 -> 리포트 확인
```

---

## 주요 기능

### 🏥 센터 종사자용 (Admin)

- **회원 관리**: 종사자, 수급자(고령자) 조회/등록/수정/삭제
- **기록지 작성, 관리**: 기록지를 작성하고 검토 및 관리합니다.
- **리포트 전송**: 기록지 작성 내용을 토대로 생성된 리포트를 전송합니다.

### 👨‍👩‍👧‍👦 보호자용 (Client)

- **건강 리포트 수신**: 일일 건강 상태 리포트 확인
- **건강 지표 그래프**: 장기간 건강 상태 변화 확인
- **리포트 몰아보기**: 기존 리포트를 확인 할 수 있습니다.

---

## 팀 소개

<div align="center">

|   팀원   |   김수환    |    홍규진    |    소보길    |
| :------: | :---------: | :----------: | :----------: |
| **역할** | Web Backend | Web Frontend | Web Frontend |
| **사진** |     🖼️      |      🖼️      |      🖼️      |

</div>

**팀명**: 학동뮤지션 (Hakdong Musician)  
**프로젝트**: 데이케어센터 간편 건강 리포트 발송 서비스

---

## 기술 스택

<div align="center">

|        영역        | 기술 스택                                                                                                                                                                                                                                                                                                                     |
| :----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    **Backend**     | ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white) |
|    **Frontend**    | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)         |
|    **Database**    | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)                                                                                                                                                                                                                            |
| **Infrastructure** | ![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)                                                                                                                                                                                                                            |
|     **CI/CD**      | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)                                                                                                                                                                                                 |

</div>

---

## 프로젝트 설계

### 아키텍처 개요

<여기 아키텍쳐 사진>

## 프로젝트 구조

### 전체 구조

```
Team2-HakdongMusician/
├── 📁 daycan-back/          # 백엔드 서버 (Spring Boot)
├── 📁 daycan-front/         # 프론트엔드 애플리케이션
│   ├── 📁 apps/
│   │   ├── 📁 admin/        # 센터 종사자용 관리자 포털
│   │   └── 📁 client/       # 보호자용 클라이언트 포털
│   └── 📁 packages/         # 공유 패키지들
└── 📁 docs/                 # 프로젝트 문서
```
#### [Wiki](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki)
#### [FE README](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/blob/main/daycan-front/README.md)
#### [BE README](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/blob/main/daycan-back/README.md)

### 프론트엔드 구조

[프론트 폴더 구조 설명](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/%5BFE%5D-%ED%8F%B4%EB%8D%94%EA%B5%AC%EC%A1%B0)

```
📁 daycan-front/
├── 📁 apps/
│   ├── 📁 admin/            # 관리자 앱
│   │   ├── 📁 src/
│   │   │   ├── 📁 components/   # 재사용 컴포넌트
│   │   │   ├── 📁 pages/        # 페이지 컴포넌트
│   │   │   ├── 📁 services/     # API 서비스
│   │   │   └── 📁 utils/        # 유틸리티 함수
│   │   └── 📁 public/           # 정적 파일
│   └── 📁 client/           # 클라이언트 앱
│       ├── 📁 src/
│       │   ├── 📁 components/   # 재사용 컴포넌트
│       │   ├── 📁 pages/        # 페이지 컴포넌트
│       │   ├── 📁 services/     # API 서비스
│       │   └── 📁 utils/        # 유틸리티 함수
│       └── 📁 public/           # 정적 파일
└── 📁 packages/              # 공유 패키지
    ├── 📁 ui/                # UI 컴포넌트 라이브러리
    ├── 📁 hooks/             # 커스텀 훅들
    ├── 📁 api/                # API 관련 공통 로직
    └── 📁 typescript-config/  # TypeScript 설정
```

### 백엔드 구조

```
📁 daycan-back/
├── 📁 src/
│   ├── 📁 main/
│   │   ├── 📁 java/
│   │   │   └── 📁 com/
│   │   │       └── 📁 daycan/
│   │   │           ├── 📁 controller/    # REST API 컨트롤러
│   │   │           ├── 📁 service/       # 비즈니스 로직
│   │   │           ├── 📁 repository/    # 데이터 접근 계층
│   │   │           ├── 📁 entity/        # 데이터베이스 엔티티
│   │   │           └── 📁 config/        # 설정 클래스
│   │   └── 📁 resources/                 # 설정 파일
│   └── 📁 test/                          # 테스트 코드
├── 📁 docker-compose.yml                 # 개발 환경 설정
└── 📁 scripts/                           # 배포 스크립트
```

---

## 컨벤션 및 협업

### 개발 컨벤션

- [그라운드 룰](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/RULE) 준수
- TypeScript strict 모드 사용
- ESLint + Prettier 코드 스타일 통일
- Conventional Commits 메시지 규칙

### 협업 도구

- **프로젝트 관리**: GitHub Projects
- **의사소통**: Slack, Discord, KakaoTalk
- **문서화**: GitHub Wiki

### 데일리 스크럼 & 회고

[회의록 보기](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/%ED%9A%8C%EC%9D%98%EB%A1%9D)

---

## 📞 문의 및 지원

프로젝트에 대한 문의사항이나 버그 리포트는 [Issues](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/issues)를 통해 등록해 주세요.

---

<div align="center">

**"어떻게 치매까지 사랑하겠어 엄말 사랑하는 거지"**  
_by 학동뮤지션_

</div>
