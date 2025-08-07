import { atom } from "jotai";
import type { InfoFunnelData } from "../types/infoType";

// info-funnel용 jotai atom 생성
export const infoFunnelDataAtom = atom<InfoFunnelData | null>(null);
