import { DiagnosisCardLayout, DiagnosisLayout } from "../../components";
import { Body, COLORS } from "@daycan/ui";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useStep4 } from "./useStep4";
import { itemRow, itemLabel } from "./Step4.css";

export const Step4 = () => {
  const { sections, toPrev, toNext } = useStep4();

  return (
    <>
      <DiagnosisLayout title="기록지 검토" nextTitle="서명하기">
        {sections.map((section) => (
          <DiagnosisCardLayout key={section.title} title={section.title}>
            {section.items.map((item) => (
              <div key={item.label} className={itemRow}>
                <div className={itemLabel}>
                  <Body type="small" weight={500} color={COLORS.gray[700]}>
                    {item.label}
                  </Body>
                </div>
                <Body type="xsmall" weight={600} color={COLORS.gray[900]}>
                  {item.value}
                </Body>
              </div>
            ))}
          </DiagnosisCardLayout>
        ))}
      </DiagnosisLayout>
      <StepButtons onPrev={toPrev} onNext={toNext} />
    </>
  );
};
