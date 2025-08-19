import { DiagnosisLayout } from "../../components/DiagnosisLayout/DiagnosisLayout";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import {
  ColumnTextArea,
  DiagnosisCardLayout,
  RowCheckBox,
  RowInput,
} from "../../components";
import { useStep2 } from "./useStep2";

export const Step2 = () => {
  const {
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
  } = useStep2();

  return (
    <>
      <DiagnosisLayout title="건강관리" nextTitle="기능회복 훈련">
        <DiagnosisCardLayout title="도움">
          <RowCheckBox
            label="건강 관리"
            checked={isHealthManagementChecked}
            onClick={() =>
              setIsHealthManagementChecked(!isHealthManagementChecked)
            }
          />
          <RowCheckBox
            label="간호 관리"
            checked={isNursingManagementChecked}
            onClick={() =>
              setIsNursingManagementChecked(!isNursingManagementChecked)
            }
          />
          <RowCheckBox
            label="응급 서비스"
            checked={isEmergencyServiceChecked}
            onClick={() =>
              setIsEmergencyServiceChecked(!isEmergencyServiceChecked)
            }
          />
        </DiagnosisCardLayout>
        <DiagnosisCardLayout title="혈압" isRequired={true}>
          <RowInput
            label="최저 혈압"
            value={systolic}
            setValue={setSystolic}
            min={50}
            max={200}
            step={1}
            unit="mmHg"
          />
          <RowInput
            label="최고 혈압"
            value={diastolic}
            setValue={setDiastolic}
            min={50}
            max={200}
            step={1}
            unit="mmHg"
          />
        </DiagnosisCardLayout>
        <DiagnosisCardLayout title="체온" isRequired={true}>
          <RowInput
            label="체온"
            value={temperature}
            setValue={setTemperature}
            min={33}
            max={41}
            step={0.1}
            unit="℃"
          />
        </DiagnosisCardLayout>
        <DiagnosisCardLayout title="특이사항">
          <ColumnTextArea
            label="건강관리"
            value={healthManageSpecialNote}
            onChange={setHealthManageSpecialNote}
            autoSelectTags={[
              { value: "건강관리를 잘 받으셨어요.", isGood: true },
              { value: "건강관리를 받지 않으셨어요.", isGood: false },
              { value: "컨디션이 좋다고 하셨어요.", isGood: true },
              { value: "컨디션이 안 좋다고 하셨어요.", isGood: false },
            ]}
          />
        </DiagnosisCardLayout>
      </DiagnosisLayout>
      <StepButtons onNext={handleNext} onPrev={toPrev} isNextEnabled={true} />
    </>
  );
};
