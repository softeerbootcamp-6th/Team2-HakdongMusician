

## 🛠 기술 스택 및 선정 이유 (Tech Stack)

|역할|기술|선정 이유|
|---|---|---|
| **Monorepo**| ![Turborepo](https://img.shields.io/badge/Turborepo-000000.svg?&logo=turborepo)|앱(apps/)과 패키지(packages/)를 하나의 레포지토리에서 관리하면서 병렬 빌드·테스트·remote-cache·incremental build를 지원해 CI 시간을 크게 단축했다. pnpm workspace와 연동해 Zero-install + 캐싱 파이프라인이 되어서 선택하게 되었다.
| **Library**| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                                | 팀원 대다수가 React 를 선호하였고, CSR 기반으로 작동하며, 초기 렌더링 이후 모든 페이지가 클라이언트에서 동작하도록 설계할 수 있도록 SPA 중심 개발을 할 수 있는 리액트를 선택하게 되었다.
| **Programming Language** |![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)| 타입을 보장하여 코드의 안정성을 높이고, 디버깅 시에, 보다 더 빠르게 버그를 잡고서, 자동 완성을 통한 DX 증가를유지 보수를 좋게 하기 위함.
| **Styling** | ![Vanilla Extract CSS](https://img.shields.io/badge/VanillaExtract-4ADCF2?style=for-the-badge&logo=vanillaextract&logoColor=FB73A0)| CSS-in-JS 중 특이하게 런타임 CSS-in-JS가 아닌 빌드 타임 추출·atomic CSS 방식이라 번들 부하가 없고, createTheme로 색상을 주입하는 방식을 통해 JS 장점과 런타임 오버헤드를 제거해 CSS-in-JS의 강점만을 갖고간다.
| **Data Fetching**| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=React%20Query&logoColor=white) | Axios: 자동으로 JSON 형태의 데이터를 파싱해주며, HTTP 요청에 대해 효율적인 처리를 제공한다. 또한 우리 프로젝트에서 token을 활용할 때 interceptor등의 기능을 활용할 수 있기 때문에 선택하였다. <br/><br/>TanStack Query: 쿼리 키를 이용해 캐싱 기능을 활용한 다양한 동작을 구현할 수 있고, API 요청 수행을 위한 규격화된 방식을 제공하기 때문에 가독성을 높여준다. 그 중 가장 높이 산 점은 useSuspenseQuery를 통한 전역 로딩 상태관리를 편리하게 관리하기 위해서 택하게 되었다. 
| **Formatting**| ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)                | 코드 일관성을 유지하고, 가독성을 높이며, 스타일 컨벤션을 통합적으로 관리 하기 위해 택하였다. vite 내 설정을 통해서 build 단계에서도 eslint 를 통해 에러를 미리 방지한다. 루트에 공통 eslint-config·prettier-config를 두고, Turborepo task lint로 모든 패키지를 한 번에 검사한다.|
| **Package Manager** | ![Pnpm](https://img.shields.io/badge/Pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)                                                                                                                                   | Turborepo의 remote-cache와 시너지를 위해 pnpm --filter 기반 task graph가 생성되며, 노드 모듈 중복 없이 workspace link로 설치 시간을 최소화했다. 또한 Catalog 를 통해 버전을 최상위에서 명시하고 이를, 통일성있게 관리한다. (단, react 와 같은 버전에 민감한 경우 Catalogs 를 활용해 버전을 원활히 바꿀 수 있도록 한다.)|
| **Version Control**| ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)| 협업에서 필요한 버전 관리 시스템을 도입하기 위함.                                                                                                                                                                                                                                                                                                                                                      |
| **Deployment** | ![S3](https://img.shields.io/badge/CloudFront-FF9900?style=for-the-badge&logo=amazonwebservices&logoColor=white)![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                            |  (Vercel 과 고민중... 아직 미정 ) |

<br />
<br/>

**Commit 메시지 종류 설명**

|제목|내용|
|---|---|
| `feat`| 새로운 기능 추가 / 퍼블리싱|
| `fix`| 버그 수정|
| `style`| CSS 등 사용자 UI 디자인 변경|
| `refactor`| 프로덕션 코드 리팩토링 및 QA 반영|
| `chore`| 빌드 테스트 업데이트, 패키지 매니저 설정, 주석 추가 (기능에 무관할 경우 작성)
| `deploy`| 배포 작업|
| `test`| 테스트 추가, 테스트 리팩토링 (프로덕션 코드 변경 X)|
| `delete`| 파일 삭제 작업만 수행|
| `!HOTFIX`| 급하게 치명적인 버그 수정|
| `!BREAKING CHANGE`| 커다란 API 변경|

<br />
<br/>

## 📢 폴더 구조

1. daycan-front는 모노레포(monorepo) 구조로 구성된 프론트엔드 프로젝트이며, apps와 packages 디렉토리를 중심으로 구조화되어 있습니다.
	•	apps/: 실제 사용자 인터페이스(UI)가 존재하는 어플리케이션들 (관리자용, 클라이언트용)
	•	packages/: apps에서 공통으로 사용하는 코드들을 모아둔 공유 모듈 (API, 컴포넌트, 설정 등)


2. 전반적인 폴더구조 
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

3. apps 내 폴더 구조

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
### 모노레포를 통한 ui components 분리시 주의할 점
- 가능한 DesignSystem 과 재사용되는 컴포넌트를 구분지어 사용한다.
- DesignSystem을 바꿔야하는 경우를 최소화한다. (packages/ui/~) 를 수정하는 경우를 최소화한다. 
- DesignSystem 은 최대한 다양한 상황에 대응할 수 있도록 구현한다. 단, 너무 많은 상황을 고려하기 위해 내부적인 variants 가 많아지는 경우가 없도록 한다. 그 결과 유연하게 대응할 수 있도록 개발한다.
<br/>
<br/>

## 📢 네이밍 컨벤션

 <details>
	 
 ### 1. 기본 (Default)

1. 컴포넌트 / class `PascalCase`
2. 폴더명 `carmelCase` 단 페이지일 경우엔, `kebab-case`
3. 파일 명 _(컴포넌트 제외)_ `carmelCase`
4. 변수, 함수 `carmelCase`
5. 파라미터 `carmelCase`
6. 상수 `BIG_SNAKE_CASE`

<br/>

### 2. 타입 (Type)

1. interface는 컴포넌트 내의 타입을 지정할 때 사용합니다. 이 때는 필수로 `Component명 + Props`로 작성합니다.
   - 예시
    ```tsx
        interface DaycanProps {
          daycanName: string;
          daycanUserCount: number;
          daycanImage: string;
        }
    ```
2. type은 Schema를 먼저 지정할 때 사용합니다. 이 때는 필수로 `T + 타입명`으로 작성합니다.
   - 예시
    ```tsx
        export type TArtist = {
          artistId: number;
          name: string;
        };
    ```
4. PropsTypes는 컴포넌트 파일 내 / 그 외 타입은 src/types 폴더에 따로 분리

<br/>

### 3. 스타일 (Style)

SVG 파일 사용시
   1. packages/ui/src/assets/ 내에 파일을 첨부한다.
   2. packages/ui/src/index.ts 에서 export 해준다. 
   3. packages/ui/src/components/Icon/index.types.ts 내에 iconMap 값을 추가한다.
<br/>

### 4. 함수

1. 이벤트 핸들러 네이밍 **`handle + 기능 + 이벤트`**

   - 예시
     ```jsx
     const handleBtnClick = () => {};
     const handleTabChange = () => {};
     ```

   → props로 넘길 때 key값은 **`on + 이벤트`**

   - 예시
     ```jsx
     const BoxComponent = () => {
       return <memoComponent onClick={handleBtnClick} />;
     };
     ```

2. 유틸(utils) 함수 네이밍 **`동사(기능) + 명사(대상)`**
3. 값이 boolean일 경우는 **`is + 상태` (default)**

   - 예시
     ```tsx
     const [isLogined, setIsLogined] = useState(false);
     ```

   → 추가적으로 **`can / should / has`** 정도를 상황에 맞게 추가한다.

4. api 함수 **`HTTP 메서드 + 명사`**
   - 예시
     ```tsx
     const getList = () => {};
     const getMovie = () => {};
     ```
5. 네이밍 시 단수를 기본으로 사용하고 / 복수면 뒤에 List 키워드를 붙인다.

<br/>

### 5. 기타

1. assets (Icon이나 Img)의 경우 피그마 네이밍을 적극 활용한다.

   **→** `Ic + 피그마 네이밍` (icon의 경우)으로 사용

2. URL, HTML 같은 범용적인 대문자 약어는 대문자 그대로 사용한다.
3. 변수/최대한 직관적으로 작성하여 네이밍을 보고도 무슨 데이터, 행위인지 바로 유추할 수 있도록 한다.
   - 주석이 필요한 경우에는 어떤 역할을 하는지 다른 사람이 이해할 수 있도록 작성한다.
   - 변수/함수 명은 20자 미만, 주석으로 변수 설명
4. 주석은 작성하려고 하는 대상 **바로 위**에 작성

<br/>
<br/>

 </details>


## 📢 코딩 (개발) 컨벤션

 <details> 

### 주석 
- 주석은 작성하려고 하는 대상 **바로 위**에 작성
- /** */ 형식으로 작성
- 주석은 되도록이면 코드 자체로 이해가 되도록 작성한다.
- params 또는 return 값이 있는 경우에는 주석으로 작성한다.
- 누군가가 이 코드를 보았을 때, 이 코드가 무슨 역할을 하는지 이해할 수 있도록 작성한다.
- @author 태그를 통해 작성자를 표시한다.
  - 예시
    ```tsx
        /**
        * ErrorBoundary 컴포넌트로 에러가 떴을 당시에, 표시할 컴포넌트를 정의합니다.
        * @param children 자식 컴포넌트
        * @param errorFallback 에러 발생 시 표시할 컴포넌트
        * @param onReset 에러 발생 시 호출될 함수
        * @author 홍규진
        */
    ```
### 변수

- var 금지.
- `const` → `let` 순서로 위부터 선언.
- 변수를 조합하여 문자열 생성시 “+ “ 금지. → 리터럴 사용(백틱 ```)
- 변수명 : 의미를 확실히 나타낼 수 있도록
  - 예시 : 배열에 Arr 보다는 변수s = fruits, userlists 등등
- 줄임말 쓰지말기. 이름이 길어지더라도 어떤 변수인지 정확하게
  - 예시 : Btn X → Button으로 사용
- map 사용시 변동되는 리스트라면 key값을 고유하게 잘 설정해주기 **`index 사용 금지`**
  - 서버에서 내려주는 id값 or uuid 사용
- **전역 변수**는 되도록 사용하지 않기

### 함수

- 화살표 함수. function 키워드 쓰지말기
- 여러 컴포넌트 내에서 사용하는 함수는 utils 폴더에 모아서 재사용한다.그 외는 pages내에서 컴포넌트로 쓸 떄만 작성한다.
- 변수/함수 명은 20자 미만.
  - 최대한 네이밍에 의미를 담아서 작성하고 필요 시에 주석으로 설명 추가
- 필요하다면 early return 패턴을 적극적으로 활용
  - 예시
    ```jsx
    **// early return 패턴**
    function processUser(user) {
      if (!user || !user.isActive) return; // **조건이 맞지 않으면 일찍 반환**
      // 나머지 처리 코드...
    }
    ```

### 컴포넌트

- `rafce` → 고정
- 의미없는 div 또는 컴포넌트 최상단은 fragment 사용하기

```jsx
const InfoText = () => {
  return (
    <>
      <h1>Welcome!</h1>
      <p>This our new page, we're glad you're are here!</p>
    </>
  );
};

```

- children이 불필요할 땐 selfClosing사용하기 `<Component/>`
- children 적극적으로 활용하기!

### 타입

- object → interface
- 단일 변수 → type alias
- 컴포넌트 인자에 대한 타입은 컴포넌트 상단에
- 그 외의 타입들은 types 폴더에
- api response 타입명은 OOOResponseTypes

### 메소드

- 배열 복사 시 → 스프레드 연산자(…) 사용

  - `const copys = […originals]`

- for 보단, `forEach`/`map`을 사용
- 구조 분해 할당을 적극 이용
  ```tsx
  interface userDataProps {
    userName: string;
    userBirth: string;
  }

  function checkIsUser({ userName, userBirth }: userDataProps) {}
  ```
- 불필요한 반복문 지양 : filter, array.include() 등
  - 조건부로 데이터를 확인하거나 뽑아야하는 로직을 사용할 때에는 `Map` 이나 `Object`처럼 `key`값을 이용해서 원소를 찾는 자료형을 이용하는것을 고려해보거나, 배열을 순회하지 않고 index로 바로 접근할 수 있는 방법이 없는지 고려.
 


### Style
- 최대한 이미 있는 공통 컴포넌트를 활용할 수 있도록 노력한다.
- props로 전달받아야 하는 값들이 있을 경우엔 주석을 통해서 알기 쉽게 도와준다.
- 컴포넌트 내에서 사용하는 스타일은 따로 컴포넌트명.css.ts 내에서 작성한다.
- 모든 font 는 미리 만들어둔 Body, Display, Heading 컴포넌트를 통해 작성한다.



### 기타

- button 태그에 **`type`**은 명시적으로 작성
- 비교 연산자는 **`===`**와 **`!==`**만을 사용
- axios 안에서 **`then/catch`** 대신 **`async/await`** 지향

    </details>
    
## ☕️ Frontend 팀원 
<div align="center">
<table align="center">
  <tr>
    <th></th>
    <th>홍규진</th>
    <th>소보길</th>
  </tr>
  <tr>
    <td><strong>프로필</strong></td>
    <td align="center">
      <img src="https://github.com/Kyujenius.png" width="100" height="100" style="border-radius: 50%"/><br/>
      <a href="https://github.com/Kyujenius">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"/>
      </a>
    </td>
    <td align="center">
      <img src="https://github.com/sobogil.png" width="100" height="100" style="border-radius: 50%"/><br/>
      <a href="https://github.com/sobogil">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"/>
      </a>
    </td>
  </tr>
  <tr>
    <td><strong>역할</strong></td>
    <td align="center">Web Frontend</td>
    <td align="center">Web Frontend</td>
  </tr>
</table>
  <h2> 파이팅!! </h2>
</div>
<br />
<br />
