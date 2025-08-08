import { atom } from "jotai";
import type { HomeFunnelData } from "../types/homeType";

// jotai atom 생성
export const homeFunnelDataAtom = atom<HomeFunnelData | null>(null);
