import { atom } from "jotai";

// 체크된 케어시트 ID만 atom으로 관리
export const checkedCareSheetIdsAtom = atom<Set<number>>(new Set<number>());
