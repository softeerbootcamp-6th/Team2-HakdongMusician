import { useEffect, useState } from "react";
import { useFunnel } from "@daycan/hooks";
import type { ProgramType } from "../../constants/diagnosis";
import { useAtomValue } from "jotai";
import { diagnosisFunnelDataAtom } from "../../atoms/diagnosisAtom";
import type { DiagnosisFunnelData } from "../../types/diagnosisType";
import type { Score } from "@/services/careSheet/types";

export const useStep3 = () => {
  const { toNext, toPrev, updateState, getStepState } = useFunnel();
  const [isTrainingChecked, setIsTrainingChecked] = useState(false);
  const [
    isCognitiveActivityTrainingChecked,
    setIsCognitiveActivityTrainingChecked,
  ] = useState(false);
  const [
    isCognitiveFunctionEnhancementTrainingChecked,
    setIsCognitiveFunctionEnhancementTrainingChecked,
  ] = useState(false);
  const [isPhysicalTherapyChecked, setIsPhysicalTherapyChecked] =
    useState(false);
  const [trainingSpecialNote, setTrainingSpecialNote] = useState("");
  const [programEntries, setProgramEntries] = useState<
    { type: ProgramType; name: string; score: Score }[]
  >([]);
  const diagnosisAtom = useAtomValue(diagnosisFunnelDataAtom);

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_3");
    if (existingData) {
      setIsTrainingChecked(existingData.isTrainingChecked || false);
      setIsCognitiveActivityTrainingChecked(
        existingData.isCognitiveActivityTrainingChecked || false
      );
      setIsCognitiveFunctionEnhancementTrainingChecked(
        existingData.isCognitiveFunctionEnhancementTrainingChecked || false
      );
      setIsPhysicalTherapyChecked(
        existingData.isPhysicalTherapyChecked || false
      );
      setTrainingSpecialNote(existingData.trainingSpecialNote || "");
      setProgramEntries(existingData.programEntries || []);
      return;
    }
    const d: DiagnosisFunnelData | null = diagnosisAtom;
    if (d && d.recoveryProgram) {
      setIsTrainingChecked(!d.recoveryProgram.motionTraining || false);
      setIsCognitiveActivityTrainingChecked(
        !d.recoveryProgram.cognitiveProgram || false
      );
      setIsCognitiveFunctionEnhancementTrainingChecked(
        !d.recoveryProgram.cognitiveEnhancement || false
      );
      setIsPhysicalTherapyChecked(!d.recoveryProgram.physicalTherapy || false);
      setTrainingSpecialNote(d.recoveryProgram.comment || "");
      setProgramEntries(d.recoveryProgram.programEntries);
    }
  }, [getStepState, diagnosisAtom]);

  const handleNext = () => {
    updateState({
      isTrainingChecked,
      isCognitiveActivityTrainingChecked,
      isCognitiveFunctionEnhancementTrainingChecked,
      isPhysicalTherapyChecked,
      trainingSpecialNote,
      programEntries,
    });
    toNext();
  };

  const addProgramEntry = () => {
    setProgramEntries((prev) => [
      ...prev,
      { type: "PHYSICAL", name: "", score: "MEDIUM" },
    ]);
  };

  const removeProgramEntry = (index: number) => {
    setProgramEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProgramEntry = (
    index: number,
    patch: Partial<{
      type: ProgramType;
      name: string;
      score: Score;
    }>
  ) => {
    setProgramEntries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  return {
    isTrainingChecked,
    setIsTrainingChecked,
    isCognitiveActivityTrainingChecked,
    setIsCognitiveActivityTrainingChecked,
    isCognitiveFunctionEnhancementTrainingChecked,
    setIsCognitiveFunctionEnhancementTrainingChecked,
    isPhysicalTherapyChecked,
    setIsPhysicalTherapyChecked,
    trainingSpecialNote,
    setTrainingSpecialNote,
    programEntries,
    addProgramEntry,
    removeProgramEntry,
    updateProgramEntry,
    handleNext,
    toPrev,
  };
};
