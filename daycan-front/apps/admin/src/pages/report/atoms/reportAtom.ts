import { atom } from "jotai";

// 체크된 리포트 ID만 atom으로 관리
export const checkedReportIdsAtom = atom<Set<number>>(new Set<number>());
