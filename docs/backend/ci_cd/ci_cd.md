# CI/CD 파이프라인

![](/docs/images/deploy.png)

## 목표
- ☕ Spring Boot 빌드를 위한 환경 세팅
- 🧪 Spring Boot 테스트 실행 (TODO)
- 🔨 Spring Boot 애플리케이션 빌드
- 📤 AWS S3에 배포 번들 업로드
- 🚀 AWS CodeDeploy를 통한 자동 배포

## 트리거 조건
- **main 브랜치**에 push 시 실행
- **daycan-back/** 경로 변경이 있을 때만 실행 (리소스 절약)

```yml
on:
  push:
    branches: [ "main" ]
    paths:
      - 'daycan-back/**'
```

## spring build를 위한 환경 세팅
```yml
- name: Set up Amazon Corretto 17
  uses: actions/setup-java@v4
  with:
    distribution: corretto
    java-version: '17'
    cache: 'gradle'
```


## 🔨 빌드 및 테스트

### 테스트 실행
```yml
- name: Run tests
  run: |
    echo "🧪 Running tests..."
    ./gradlew check --info
    echo "✅ Tests completed successfully!"
```
현재는 `gradlew check`로 기본 검증을 수행하며, 향후 단위 테스트 추가 예정

### Spring Boot 빌드
```yml
- name: Build with Gradle
  run: |
    echo "🔨 Building Spring Boot application..."
    ./gradlew clean bootJar
    echo "✅ Build completed successfully!"
```

## 📦 Continuous Delivery

### CodeDeploy 배포 번들 생성
- JAR 파일을 `app/app.jar`로 패키징
- `appspec.yml`과 배포 스크립트들 포함
- 타임스탬프 + 커밋해시로 고유한 번들명 생성

### AWS S3 업로드
```yml
aws s3 cp "$UPLOAD_FILE" "s3://${S3_BUCKET}/deploy/daycan-back/$BUNDLE_NAME"
```

## 🚀 Continuous Deployment

### CodeDeploy 실행 과정
1. **애플리케이션 리비전 등록**: S3의 배포 번들을 CodeDeploy에 등록
2. **배포 실행**: 기존 설정된 배포 그룹으로 배포 시작
3. **배포 스크립트 실행**:
   - `ApplicationStop`: 기존 서비스 중지
   - `BeforeInstall`: 환경 준비 (사용자 생성, 패키지 설치)
   - `AfterInstall`: 서비스 설정 (systemd 등록)
   - `ApplicationStart`: 새 버전 시작
   - `ValidateService`: 헬스체크 확인

### Blue/Green 배포 전략 (향후 계획)
- **Launch Template**를 통한 새 EC2 인스턴스 생성
- **Target Group**에 새 인스턴스 등록
- **ALB**를 통해 트래픽을 새 인스턴스로 라우팅
- **헬스체크 통과** 시 기존 인스턴스 제거
- **문제 발생** 시 자동 롤백

## 🔐 보안 고려사항
- AWS Access Key 사용 (향후 OIDC로 전환 권장)
- EC2에서 80번 포트 권한을 위한 `setcap` 사용
- systemd 서비스의 보안 설정 적용

## 📊 모니터링 및 알림
- **GitHub Actions**: 빌드 상태 및 진행률 실시간 확인
- **CodeDeploy**: 배포 상태 15분간 모니터링 (90 * 10초)
- **실패 처리**: 상세 에러 로그 및 디버깅 정보 자동 수집

## ⚡ 성능 최적화
- **Gradle 캐시**: GitHub Actions에서 의존성 캐시 활용
- **경로 필터링**: `daycan-back/**` 변경 시에만 실행으로 리소스 절약
- **병렬 처리**: 가능한 작업들의 병렬 실행

## 🔧 향후 개선 계획
1. **테스트 커버리지**: 단위 테스트 및 통합 테스트 추가
2. **보안 강화**: OIDC 방식으로 AWS 인증 전환
3. **Blue/Green 배포**: 무중단 배포를 위한 인프라 구성
4. **성능 모니터링**: 애플리케이션 성능 메트릭 수집
5. **알림 시스템**: Slack/Discord 연동으로 배포 상태 알림
