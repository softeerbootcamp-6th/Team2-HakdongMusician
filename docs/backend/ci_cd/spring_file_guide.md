---
title: "Spring Boot CI 구축을 위한 필수 파일 가이드"
date: 2025-01-31
lastmod: 2025-01-31
tags: ["spring-boot", "ci", "github-actions", "gradle", "java"]
summary: "GitHub Actions로 Spring Boot CI 파이프라인을 구축하기 위해 반드시 필요한 파일들과 각각의 역할을 상세히 설명합니다."
---

# Spring 실행에는 어떤 파일들이 필요하고 어떻게 만들어야 할까?

Spring Boot 애플리케이션을 CI 파이프라인에서 빌드하고 실행하기 위해서는 여러 핵심 파일들이 필요합니다. 각 파일의 역할과 구성 방법을 알아보겠습니다.


### settings.gradle

Gradle 프로젝트의 **기본 구조와 식별 정보**를 정의하는 설정 파일입니다.

**주요 역할:**
- 프로젝트 이름 정의 (`rootProject.name`)
- 멀티 모듈 프로젝트 시 서브 프로젝트 포함 설정
- 플러그인 관리 설정 (Gradle 6.0 이상)
- 의존성 저장소 전역 설정

**기본 구성 예시:**
```gradle
rootProject.name = 'my-spring-app'

// 멀티 모듈 프로젝트의 경우
include 'api'
include 'service' 
include 'batch'

// 플러그인 관리 (선택사항)
pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}
```

**CI에서의 역할:**
- 프로젝트 식별 및 빌드 루트 설정
- 멀티 모듈 빌드 시 전체 프로젝트 구조 정의
- GitHub Actions에서 프로젝트 인식을 위한 기본 설정



### build.gradle

`build.gradle`은 프로젝트의 빌드 설정을 정의하는 핵심 파일입니다.

**주요 역할:**
- 프로젝트 의존성(Spring Boot, DB 드라이버 등) 정의
- 빌드 플러그인 설정 (Java 컴파일, Spring Boot 패키징)
- 테스트 실행 방식 지정
- JAR 파일 생성 규칙 설정

**CI에서의 중요성:**
- `./gradlew build` 명령으로 컴파일 → 테스트 → JAR 생성을 한 번에 수행
- 의존성 버전 충돌 해결 및 라이브러리 자동 다운로드
- 테스트 실패 시 빌드 중단으로 품질 보장

## settings.gradle vs build.gradle 비교

두 파일은 모두 Gradle 빌드 시스템에서 중요한 역할을 하지만, **담당하는 영역이 완전히 다릅니다**.

| 구분          | settings.gradle          | build.gradle             |
| ------------- | ------------------------ | ------------------------ |
| **목적**      | 프로젝트 구조 정의       | 빌드 로직 정의           |
| **실행 시점** | Gradle 초기화 단계       | 설정 및 실행 단계        |
| **주요 내용** | 프로젝트 이름, 모듈 구성 | 의존성, 플러그인, 태스크 |
| **필수성**    | 선택사항 (단일 모듈)     | 필수                     |
| **멀티 모듈** | 서브 프로젝트 포함 설정  | 각 모듈별 빌드 설정      |

### 상세 비교

#### settings.gradle의 역할
```gradle
// "이 프로젝트는 무엇이고, 어떤 구조를 가지는가?"
rootProject.name = 'my-spring-app'
include 'api', 'service', 'batch'
```

#### build.gradle의 역할
```gradle
// "이 프로젝트를 어떻게 빌드할 것인가?"
plugins {
    id 'org.springframework.boot' version '3.1.0'
}
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}
```

### CI 파이프라인에서의 차이점

**settings.gradle:**
- Gradle이 프로젝트를 인식하고 초기화할 때 사용
- 멀티 모듈 프로젝트의 경우 어떤 모듈들을 빌드할지 결정
- 한 번 설정하면 거의 변경되지 않음

**build.gradle:**
- 실제 빌드 과정(컴파일, 테스트, 패키징)을 제어
- 의존성 추가, 플러그인 업데이트 등으로 자주 변경됨
- CI에서 빌드 실패의 주요 원인이 되는 파일

### 실무 관점

#### 단일 모듈 프로젝트 (대부분의 Spring Boot 프로젝트)
- **settings.gradle**: 없어도 됨 (디렉토리 이름이 프로젝트 이름이 됨)
- **build.gradle**: 반드시 필요

#### 멀티 모듈 프로젝트 (MSA 구조)
- **settings.gradle**: 필수 (어떤 서비스들이 포함되는지 정의)
- **build.gradle**: 루트 + 각 모듈별로 필요

따라서 **Spring Boot CI 구축 시 우선순위는 build.gradle >> settings.gradle** 입니다.

### application.yml (또는 application.properties)

Spring Boot 애플리케이션의 설정을 관리하는 파일입니다.

**주요 역할:**
- 서버 포트, 데이터베이스 연결 정보 설정
- 프로파일별 환경 분리 (개발/테스트/운영)
- 로깅 레벨, JPA 설정 등 애플리케이션 동작 제어
- 외부 서비스 연동 정보 (Redis, AWS 등)

**CI에서의 중요성:**
- `test` 프로파일로 테스트 전용 DB(H2) 사용
- 운영 정보와 분리된 안전한 테스트 환경 구성
- 환경변수 기반 설정으로 보안 정보 보호

### Application.java

Spring Boot 애플리케이션의 진입점(Entry Point) 역할을 하는 메인 클래스입니다.

**주요 역할:**
- `@SpringBootApplication` 어노테이션으로 Spring Boot 자동 설정 활성화
- `main` 메소드에서 애플리케이션 시작점 제공
- 필요시 전역 설정(CORS, 보안 등) 정의
- 컴포넌트 스캔 기준점 역할

**CI에서의 중요성:**
- JAR 실행 시 Main-Class로 지정되는 클래스
- `java -jar app.jar` 실행 시 이 클래스가 애플리케이션 시작
- 테스트 실행 시에도 Spring Context 로딩의 기준점

### Dockerfile

애플리케이션을 컨테이너로 패키징하기 위한 Docker 이미지 빌드 설정 파일입니다.

**주요 역할:**
- Java 실행 환경(JDK/JRE) 기반 이미지 설정
- Spring Boot JAR 파일을 컨테이너에 복사
- 애플리케이션 실행 명령어 정의
- 포트 노출 및 헬스체크 설정

**CI에서의 활용:**
- GitHub Actions에서 Docker 이미지 자동 빌드
- AWS ECR, Docker Hub 등에 이미지 푸시
- 컨테이너 기반 배포 환경 지원 (ECS, Kubernetes)

### .github/workflows/ci.yml

GitHub Actions CI 파이프라인의 워크플로우를 정의하는 파일입니다.

**주요 역할:**
- CI 실행 조건 설정 (push, pull request 등)
- Java 환경 설정 및 의존성 캐시 구성
- 테스트 자동 실행 및 결과 리포팅
- JAR 빌드 및 아티팩트 업로드

**CI에서의 핵심:**
- main 브랜치 push 시 자동 실행으로 품질 보장
- 테스트 실패 시 즉시 피드백으로 빠른 문제 발견
- 빌드된 JAR을 GitHub에 저장하여 배포 준비 완료

### gradlew, gradlew.bat (Gradle Wrapper)

Gradle을 로컬에 설치하지 않고도 프로젝트를 빌드할 수 있게 해주는 래퍼 스크립트입니다.

**구성 파일들:**
- **gradlew**: Unix/Linux용 실행 스크립트
- **gradlew.bat**: Windows용 실행 스크립트
- **gradle/wrapper/**: Gradle 바이너리 및 설정 파일들

**CI에서의 필수성:**
- GitHub Actions 환경에서 Gradle 설치 없이 빌드 가능
- 모든 개발자와 CI 환경에서 동일한 Gradle 버전 사용 보장
- `./gradlew build`, `./gradlew test` 등의 명령으로 일관된 빌드 환경 제공

### 주요 gradlew 명령어

#### 기본 빌드 명령어
```bash
# 전체 빌드 (컴파일 + 테스트 + JAR 생성)
./gradlew build

# 테스트만 실행
./gradlew test

# Spring Boot 실행 가능한 JAR 생성
./gradlew bootJar

# 애플리케이션 실행 (개발용)
./gradlew bootRun

# 프로젝트 정리 (build 디렉토리 삭제)
./gradlew clean

# 정리 후 빌드
./gradlew clean build
```


### gradle.wrapper

`gradle/wrapper/` 디렉토리에 있는 Gradle Wrapper의 핵심 구성 파일들입니다.

**구성 파일들:**
- `gradle-wrapper.jar`: Gradle 다운로드 및 실행을 담당하는 실제 래퍼 JAR
- `gradle-wrapper.properties`: Gradle 버전 및 다운로드 설정 정보

#### gradle-wrapper.properties 파일 구조
```properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

**각 설정의 의미:**
- `distributionUrl`: 사용할 Gradle 버전의 다운로드 URL
- `distributionBase`: Gradle 배포판을 저장할 기본 경로
- `networkTimeout`: 네트워크 타임아웃 설정 (밀리초)
- `validateDistributionUrl`: URL 검증 여부

### Gradle Wrapper 생성 방법

#### 1. 기존 Gradle이 설치된 경우
```bash
# 프로젝트 루트에서 실행
gradle wrapper

# 특정 Gradle 버전으로 생성
gradle wrapper --gradle-version 8.5

# Gradle 배포판 타입 지정 (bin, all)
gradle wrapper --gradle-version 8.5 --distribution-type all
```

#### 2. Gradle이 설치되지 않은 경우
Spring Initializr나 IDE에서 프로젝트 생성 시 자동으로 포함됩니다.

#### 3. 수동으로 Wrapper 생성
1. [Gradle 공식 사이트](https://gradle.org/releases/)에서 wrapper 파일들 다운로드
2. 프로젝트 루트에 `gradle/wrapper/` 디렉토리 생성
3. `gradle-wrapper.jar`, `gradle-wrapper.properties` 파일 복사
4. `gradlew`, `gradlew.bat` 스크립트 파일 복사


### Gradle Wrapper 사용의 장점

#### 1. **환경 독립성**
- 개발자 PC에 Gradle 설치 불필요
- 모든 팀원이 동일한 Gradle 버전 사용 보장
- CI/CD 환경에서도 별도 설치 없이 사용

#### 2. **버전 관리**
- 프로젝트별로 다른 Gradle 버전 사용 가능
- `gradle-wrapper.properties`로 버전 관리
- Git에 포함되어 팀 전체가 동기화

### Wrapper vs 로컬 Gradle 설치

| 구분            | Gradle Wrapper | 로컬 Gradle 설치 |
| --------------- | -------------- | ---------------- |
| **설치 필요성** | 불필요         | 필요             |
| **버전 관리**   | 프로젝트별     | 시스템 전역      |
| **팀 동기화**   | 자동           | 수동             |
| **CI 지원**     | 완벽           | 추가 설정 필요   |
| **추천도**      | ⭐⭐⭐⭐⭐          | ⭐⭐               |

따라서 **Spring Boot CI 프로젝트에서는 항상 Gradle Wrapper 사용을 권장**합니다.

## 핵심 파일들의 실행 흐름

1. **빌드 도구**가 `build.gradle`/`pom.xml`을 읽어 의존성 다운로드
2. **컴파일러**가 Java 소스 코드를 바이트코드로 변환
3. **Spring Boot Plugin**이 실행 가능한 JAR 파일 생성
4. **application.yml**의 설정으로 애플리케이션 환경 구성
5. **Main 클래스**에서 Spring Boot 애플리케이션 시작

이러한 파일들이 모두 준비되면, CI 파이프라인에서 `./gradlew bootJar` 명령으로 실행 가능한 Spring Boot JAR 파일을 성공적으로 생성할 수 있습니다.


## 결론

위에서 설명한 파일들이 모두 제대로 구성되어 있으면, main 브랜치에 push할 때마다 GitHub Actions가 자동으로:

1. **소스 코드 체크아웃** 및 **Java 환경 설정**
2. **의존성 다운로드** 및 **캐시 활용**
3. **자동 테스트 실행** 및 **결과 리포팅**
4. **JAR 파일 빌드** 및 **아티팩트 저장**

이를 통해 **안정적이고 자동화된 Spring Boot CI 파이프라인**을 구축할 수 있습니다.
