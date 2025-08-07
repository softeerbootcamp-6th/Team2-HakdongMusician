import { atom } from "jotai";
import { homeFunnelDataAtom } from "../home-funnel/atoms/homeAtom";
import { infoFunnelDataAtom } from "../info-funnel/atoms/infoAtom";
import { combineFunnelData } from "../utils/atomUtil";

// Derived atom: 자동으로 두 퍼널 데이터를 합쳐주는 atom
export const combinedCareSheetAtom = atom((get) => {
  const homeData = get(homeFunnelDataAtom);
  const infoData = get(infoFunnelDataAtom);

  const result = combineFunnelData(homeData, infoData);

  return result;
});
