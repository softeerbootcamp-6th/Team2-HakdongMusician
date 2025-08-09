import { atomWithStorage } from "jotai/utils";
import type { InfoFunnelData } from "../types/infoType";

// 로컬스토리지 지속형 atom
export const infoFunnelDataAtom = atomWithStorage<InfoFunnelData | null>(
  "careSheet:infoFunnel",
  null
);
