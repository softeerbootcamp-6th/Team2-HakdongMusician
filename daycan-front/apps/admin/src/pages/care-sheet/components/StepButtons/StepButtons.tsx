import { Button, COLORS } from "@daycan/ui";

import { careSheetPageContentButtonContainer } from "./StepButtons.css";

interface StepButtonsProps {
  onNext?: () => void;
  onPrev?: () => void;
  isNextEnabled?: boolean;
}

export const StepButtons = ({
  onNext,
  onPrev,
  isNextEnabled,
}: StepButtonsProps) => {
  return (
    <div className={careSheetPageContentButtonContainer}>
      {onPrev && (
        <Button
          variant="primary"
          size="fullWidth"
          onClick={onPrev}
          style={{
            backgroundColor: COLORS.gray[50],
          }}
        >
          이전
        </Button>
      )}
      {onNext && (
        <Button
          variant="primary"
          size="fullWidth"
          onClick={onNext}
          disabled={isNextEnabled === false}
        >
          다음
        </Button>
      )}
    </div>
  );
};
