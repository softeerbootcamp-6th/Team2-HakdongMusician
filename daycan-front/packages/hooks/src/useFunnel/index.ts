/**
 * 퍼널 관련 커스텀 훅을 구현하기 위해 모아둔 파일입니다.
 * useFunnel은 현재 Step 별 View를 단계별로 관리하는 훅으로 쓰고 있으며, 각 퍼널 별로 다른 개수의 STEP 을 갖고 있습니다.
 * Context 내부에서 step 별로 이전의 View 와 다음의 View 에 대해서만 집중할 수 있게끔 하는 데에만 초점을 맞추었습니다.
 * Context 내부에서는 퍼널간 이동을 관리합니다. (onPrev, onNext, onStep, currentStep, isFirst, isLast)
 * 한 Funnel 이 끝난 후에는 onComplete 함수를 호출하여 퍼널 종료를 알립니다.
 * @author 홍규진
 */
export * from "./FunnelContext";
export * from "./FunnelStep";
export * from "./FunnelProvider";
export * from "./types";
