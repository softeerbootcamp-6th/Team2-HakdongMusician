import { useEffect, useState } from "react";
import { useFunnel } from "@daycan/hooks";

export const useStep2 = () => {
  const { toNext, toPrev, updateState, getStepState } = useFunnel();
  const [isHealthManagementChecked, setIsHealthManagementChecked] =
    useState(false);
  const [isNursingManagementChecked, setIsNursingManagementChecked] =
    useState(false);
  const [isEmergencyServiceChecked, setIsEmergencyServiceChecked] =
    useState(false);
  const [systolic, setSystolic] = useState(80);
  const [diastolic, setDiastolic] = useState(120);
  const [temperature, setTemperature] = useState(36.5);
  const [healthManageSpecialNote, setHealthManageSpecialNote] = useState("");

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_2");
    if (existingData) {
      setIsHealthManagementChecked(
        existingData.isHealthManagementChecked || false
      );
      setIsNursingManagementChecked(
        existingData.isNursingManagementChecked || false
      );
      setIsEmergencyServiceChecked(
        existingData.isEmergencyServiceChecked || false
      );
      setSystolic(existingData.systolic || 80);
      setDiastolic(existingData.diastolic || 120);
      setTemperature(existingData.temperature || 36.5);
      setHealthManageSpecialNote(existingData.healthManageSpecialNote || "");
    }
  }, [getStepState]);

  const handleNext = () => {
    updateState({
      isHealthManagementChecked,
      isNursingManagementChecked,
      isEmergencyServiceChecked,
      systolic,
      diastolic,
      temperature,
      healthManageSpecialNote,
    });
    toNext();
  };

  return {
    isHealthManagementChecked,
    setIsHealthManagementChecked,
    isNursingManagementChecked,
    setIsNursingManagementChecked,
    isEmergencyServiceChecked,
    setIsEmergencyServiceChecked,
    systolic,
    setSystolic,
    diastolic,
    setDiastolic,
    temperature,
    setTemperature,
    healthManageSpecialNote,
    setHealthManageSpecialNote,
    handleNext,
    toPrev,
  };
};

