import { atomWithStorage } from "jotai/utils";
import type { HomeFunnelData } from "../types/homeType";

// 로컬스토리지 지속형 atom
export const homeFunnelDataAtom = atomWithStorage<HomeFunnelData | null>(
  "careSheet:homeFunnel",
  null
);
