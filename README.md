# Daycan
### 데이케어센터 간편 건강 리포트 발송 서비스

<img width="1920" height="1080" alt="Cover" src="https://github.com/user-attachments/assets/36e55169-e5da-4680-bc1a-1cad9a74eb9e" />

### 서비스 개요

<img width="1920" height="1080" alt="서비스 개요" src="https://github.com/user-attachments/assets/92b71e0d-9a72-4d5b-be50-5fc365a3b831" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d2562ef7-193f-4389-90ba-e16e4ddbe843" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2d1eba78-067f-4a40-b4c7-605994ee58ac" />

_어떻게 치매까지 사랑하겠어 엄말 사랑하는 거지_ by _학동뮤지션_

## 팀소개

## Developers

<div align="center">
<table>
<th>팀원</th>
    <th>  김수환 </th>
	  <th>  홍규진 </th>
    <th> 소보길 </th>
    <tr>
    <td> 팀원 소개 </td>
    	<td>
        사진
      </td>
    	<td>
        사진
     </td>
      <td>
       사진
      </td>
    </tr>
    <tr>
	<td> 역할 </td>
	<td>
		<p align="center">Web Backend</p>
	</td>
	<td>
		<p align="center">Web Frontend</p>
	</td>
	<td>
		<p align="center">Web Frontend</p>
	</td>
    </tr>
  </table>
</div>
<br />
<br />



### 컨벤션

- [그라운드 룰](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/RULE)


### 데일리 스크럼 & 회고

<details>
   <summary> 자세히 보기 (Click)</summary>
<br />
슬랙의 bot을 만들어서 스크럼과 회고 내용 작성 후 회의 시작
<img src='./images/scrum_ex.png'>
<img src='./images/review_ex.png'>

[회의록](https://github.com/softeerbootcamp-6th/Team2-HakdongMusician/wiki/%ED%9A%8C%EC%9D%98%EB%A1%9D)

</details>



### 협업 툴 사용법

## | Tool | 사용 목적 |

## 그라운드 룰

<details>
   <summary> 자세히 보기 (Click)</summary>
<br />
<img src='./assets/rule.png'>

</details>

<br />
<br />

## 🛠️ 기술 스택

<table width="100%">
  <thead>
    <tr>
      <th align="center">팀</th>
      <th align="center">Tech Stack</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">Backend</td>
      <td align="start">
              </td>
    </tr>
    <tr>
      <td align="center">Frontend</td>
      <td align="start">
              </td>
    </tr>
  </tbody>
</table>
<br />
<br />

## 폴더구조

<details>
<summary > 프론트엔드 폴더 구조 보기 </summary>
전반적인 폴더 구조

```
📁daycan-front/
├── 📁apps/
│   ├── 📁admin/          # 관리자 앱
│   └── 📁client/         # 클라이언트 앱
└── 📁packages/           # 공유 패키지들
    ├── 📁api/            # API 관련 공통 로직
    ├── 📁ui/             # UI 컴포넌트 라이브러리
    ├── 📁eslint-config/  # ESLint 설정
    ├── 📁hooks/          # 커스텀 훅들
    ├── 📁typescript-config/ # TypeScript 설정
    └── 📁ui/             # UI 컴포넌트 라이브러리
```

apps 내 폴더 구조

```
📁client/
├── 📁public/
├── 📁src/
│   ├── 📁assets/           # 이미지, 애니메이션 등
│   ├── 📁components/       # client 내 재사용 컴포넌트
│   │   ├── 📁Footer/
│   │   ├── 📁Header/
│   │   ├── 📁ScrollToTop/
│   │   ├── 📁SemiCircularGaugeChart/
│   │   └── 📁UpDownIcon/
│   ├── 📁contexts/         # React Context
│   ├── 📁layout/           # 레이아웃 컴포넌트
│   │   ├── 📁login/
│   │   ├── 📁main/
│   │   └── 📁mobile/
│   ├── 📁pages/            # 페이지 컴포넌트
│   │   ├── 📁daily-report/ # 일일 리포트 페이지
│   │   │   └── 📁components/ # 일일 리포트 내 재사용 컴포넌트
│   │   │       ├── 📁CardLayout/
│   │   │       ├── 📁CognitiveCard/
│   │   │       ├── 📁HealthCheckCard/
│   │   │       ├── 📁HealthImproveCard/
│   │   │       └── 📁HealthIndexCard/
│   │   ├── 📁login/
│   │   ├── 📁main/
│   │   ├── 📁reports/
│   │   ├── 📁statistics/
│   │   └── 📁to-daily-report/
│   ├── 📁router/           # 라우팅 설정
│   ├── 📁styles/           # 스타일 파일
│   └── 📁utils/            # 유틸리티 함수
├── 📁App.tsx # 앱 진입점
└── 📁index.tsx # 앱 진입점

```

</details>

<details>
<summary > 백엔드 폴더 구조 보기 </summary>
```
```
</details>


