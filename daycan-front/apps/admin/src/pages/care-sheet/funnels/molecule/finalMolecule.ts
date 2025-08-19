import { atom } from "jotai";
import { homeFunnelDataAtom } from "../home-funnel/atoms/homeAtom";
import { infoFunnelDataAtom } from "../info-funnel/atoms/infoAtom";
import { combineFunnelData } from "../utils/atomUtil";
import { diagnosisFunnelDataAtom } from "../diagnosis-funnel/atoms/diagnosisAtom";

// Derived atom: 자동으로 두 퍼널 데이터를 합쳐주는 atom
export const combinedCareSheetAtom = atom((get) => {
  const homeData = get(homeFunnelDataAtom);
  const infoData = get(infoFunnelDataAtom);
  const diagnosisData = get(diagnosisFunnelDataAtom);

  console.log("combinedCareSheetAtom", homeData, infoData, diagnosisData);

  return combineFunnelData(homeData, infoData, diagnosisData);
});

// 최종 제출 후 퍼널 상태 초기화용 write atom
export const resetAllFunnelsAtom = atom(null, (_get, set) => {
  // jotai/utils atomWithStorage는 set(null)로 초기화 가능
  set(homeFunnelDataAtom, null);
  set(infoFunnelDataAtom, null);
  set(diagnosisFunnelDataAtom, null);
});

// 모든 퍼널 데이터가 모였는지 여부
export const isCareSheetReadyAtom = atom((get) => {
  const homeData = get(homeFunnelDataAtom);
  const infoData = get(infoFunnelDataAtom);
  const diagnosisData = get(diagnosisFunnelDataAtom);
  return Boolean(homeData && infoData && diagnosisData);
});
