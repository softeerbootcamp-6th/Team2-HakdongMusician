import {
  DiagnosisCardLayout,
  DiagnosisLayout,
  RowCheckBox,
  ColumnTextArea,
} from "../../components";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useStep3 } from "./useStep3";
import { useEffect, useRef, useState } from "react";
import { Button, COLORS, Icon } from "@daycan/ui";
import {
  DIAGNOSIS_CONSTANTS,
  type ProgramType,
  type Score,
} from "../../constants/diagnosis";
import {
  addRowContainer,
  dropdown,
  dropdownItem,
  dropdownMenu,
  nameInput,
  programRow,
  iconButton,
  nameInputElement,
} from "./Step3.css";

export const Step3 = () => {
  const {
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
  } = useStep3();

  // 드롭다운 열림 상태 및 외부 클릭 닫기
  const [openTypeIndex, setOpenTypeIndex] = useState<number | null>(null);
  const [openEvalIndex, setOpenEvalIndex] = useState<number | null>(null);
  const areaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!areaRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!areaRef.current.contains(e.target)) {
        setOpenTypeIndex(null);
        setOpenEvalIndex(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <DiagnosisLayout title="기능회복 훈련" nextTitle="기록지 검토">
      <DiagnosisCardLayout title="훈련">
        <RowCheckBox
          label="동작훈련"
          checked={isTrainingChecked}
          onClick={() => setIsTrainingChecked(!isTrainingChecked)}
        />
        <RowCheckBox
          label="인지활동 훈련"
          checked={isCognitiveActivityTrainingChecked}
          onClick={() =>
            setIsCognitiveActivityTrainingChecked(
              !isCognitiveActivityTrainingChecked
            )
          }
        />
        <RowCheckBox
          label="인지기능향상 훈련"
          checked={isCognitiveFunctionEnhancementTrainingChecked}
          onClick={() =>
            setIsCognitiveFunctionEnhancementTrainingChecked(
              !isCognitiveFunctionEnhancementTrainingChecked
            )
          }
        />
        <RowCheckBox
          label="물리(작업) 치료"
          checked={isPhysicalTherapyChecked}
          onClick={() => setIsPhysicalTherapyChecked(!isPhysicalTherapyChecked)}
        />
      </DiagnosisCardLayout>
      <DiagnosisCardLayout title="신체-인지 기능 향상 프로그램">
        <div ref={areaRef}>
          {programEntries.map((entry, index) => (
            <div key={index} className={programRow}>
              <button
                type="button"
                onClick={() => removeProgramEntry(index)}
                className={iconButton}
              >
                <Icon name="minusBox" width={20} height={20} />
              </button>

              <div className={dropdown}>
                <Button
                  size="small"
                  style={{
                    background: COLORS.gray[600],
                    color: COLORS.white,
                  }}
                  onClick={() => {
                    setOpenTypeIndex((prev) => (prev === index ? null : index));
                    setOpenEvalIndex(null);
                  }}
                >
                  {DIAGNOSIS_CONSTANTS.PROGRAM.TYPE_LABEL[entry.type]}
                  <Icon
                    name="chevronDown"
                    color={COLORS.gray[600]}
                    width={16}
                    height={16}
                  />
                </Button>
                {openTypeIndex === index && (
                  <div className={dropdownMenu}>
                    <div
                      className={dropdownItem}
                      onClick={() => {
                        updateProgramEntry(index, {
                          type: "PHYSICAL" as ProgramType,
                        });
                        setOpenTypeIndex(null);
                      }}
                    >
                      신체
                    </div>
                    <div
                      className={dropdownItem}
                      onClick={() => {
                        updateProgramEntry(index, {
                          type: "COGNITIVE" as ProgramType,
                        });
                        setOpenTypeIndex(null);
                      }}
                    >
                      인지
                    </div>
                  </div>
                )}
              </div>

              <div className={nameInput}>
                <input
                  className={nameInputElement}
                  value={entry.name}
                  type="text"
                  onChange={(e) =>
                    updateProgramEntry(index, {
                      name: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder="프로그램 명"
                />
              </div>

              <div className={dropdown}>
                <Button
                  size="small"
                  style={{
                    background: COLORS.gray[50],
                    color: COLORS.gray[500],
                  }}
                  onClick={() => {
                    setOpenEvalIndex((prev) => (prev === index ? null : index));
                    setOpenTypeIndex(null);
                  }}
                >
                  {DIAGNOSIS_CONSTANTS.PROGRAM.SCORE_LABEL[entry.score]}
                  <Icon
                    name="chevronDown"
                    color={COLORS.gray[500]}
                    width={16}
                    height={16}
                  />
                </Button>
                {openEvalIndex === index && (
                  <div className={dropdownMenu}>
                    <div
                      className={dropdownItem}
                      onClick={() => {
                        updateProgramEntry(index, {
                          score: "HIGH" as Score,
                        });
                        setOpenEvalIndex(null);
                      }}
                    >
                      상
                    </div>
                    <div
                      className={dropdownItem}
                      onClick={() => {
                        updateProgramEntry(index, {
                          score: "MEDIUM" as Score,
                        });
                        setOpenEvalIndex(null);
                      }}
                    >
                      중
                    </div>
                    <div
                      className={dropdownItem}
                      onClick={() => {
                        updateProgramEntry(index, {
                          score: "LOW" as Score,
                        });
                        setOpenEvalIndex(null);
                      }}
                    >
                      하
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={addRowContainer}>
          <Button size="small" variant="unEmphasized" onClick={addProgramEntry}>
            추가 <Icon name="plus" width={16} height={16} />
          </Button>
        </div>
      </DiagnosisCardLayout>
      <DiagnosisCardLayout title="특이사항">
        <ColumnTextArea
          label="훈련"
          value={trainingSpecialNote}
          onChange={setTrainingSpecialNote}
          autoSelectTags={[
            {
              value: "프로그램에 아주 열심히 참여하셨어요!",
              isGood: true,
            },
            {
              value: "프로그램 도중 피곤하셔서 조금 쉬었어요.",
              isGood: false,
            },
          ]}
        />
      </DiagnosisCardLayout>
      <StepButtons onNext={handleNext} onPrev={toPrev} isNextEnabled={true} />
    </DiagnosisLayout>
  );
};
