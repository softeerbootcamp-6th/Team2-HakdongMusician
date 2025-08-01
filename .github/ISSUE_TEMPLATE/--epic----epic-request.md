name: "🎯 Epic"
description: Epic 이슈 템플릿 - 대규모 기능의 하위 이슈들을 관리합니다
title: "[EPIC] - "
labels: ["epic"]
assignees: []
body:
- type: markdown
  attributes:
  value: |
  ## 📌 Epic Overview
  <!-- Epic의 목표를 간단히 설명해주세요 -->

- type: textarea
  id: overview
  attributes:
  label: Epic 개요
  description: 이 Epic의 목표와 개요를 설명해주세요
  placeholder: Epic의 목표를 간단히 설명해주세요
  validations:
  required: true

- type: textarea
  id: main-goals
  attributes:
  label: 🎯 Main Goals
  description: 핵심 목표 2-3개
  placeholder: |
  - [ ] 사용자 경험 개선
  - [ ] 성능 최적화
  - [ ] 새로운 기능 구현
  value: |
  - [ ]
  - [ ]
  - [ ]

- type: textarea
  id: sub-issues
  attributes:
  label: 📋 Sub Issues
  description: 이 Epic의 하위 이슈 설명 (생성 후 링크로 연결)
  placeholder: |
  - #이슈번호 - `FE`이슈 제목
  - #이슈번호 - `BE`이슈 제목
  - #이슈번호 - `BE`이슈 제목
  value: |
  - #이슈번호 - `FE`이슈 제목
  - #이슈번호 - `BE`이슈 제목
  - #이슈번호 - `BE`이슈 제목

- type: textarea
  id: definition-of-done
  attributes:
  label: ✅ Definition of Done
  description: Epic 완료 기준
  placeholder: |
  - [ ] 모든 하위 이슈 완료
  - [ ] QA 테스트 통과
  - [ ] 문서화 완료
  - [ ] 코드 리뷰 완료
  value: |
  - [ ] 모든 하위 이슈 완료
  - [ ]
  - [ ]

- type: input
  id: target-date
  attributes:
  label: 🗓️ 목표 완료일
  description: Epic 완료 목표 날짜
  placeholder: "YYYY-MM-DD"

- type: input
  id: assignee
  attributes:
  label: 담당자
  description: Epic 담당자 GitHub 사용자명
  placeholder: "@username"

- type: textarea
  id: notes
  attributes:
  label: 📝 Notes
  description: 추가 정보
  placeholder: 추가 정보를 입력하세요