import { atomWithStorage } from "jotai/utils";
import type { DiagnosisFunnelData } from "../types/diagnosisType";

// 로컬스토리지 지속형 atom
export const diagnosisFunnelDataAtom =
  atomWithStorage<DiagnosisFunnelData | null>(
    "careSheet:diagnosisFunnel",
    null
  );
