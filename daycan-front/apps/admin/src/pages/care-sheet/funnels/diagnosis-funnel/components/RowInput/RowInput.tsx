import { Body, COLORS, useToast } from "@daycan/ui";
import { useEffect, useMemo, useState } from "react";
import {
  rowInputContainer,
  rowInputLabelContainer,
  rowInputValueContainer,
  rowInputValueInput,
} from "./RowInput.css";
interface RowInputProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
}
export const RowInput = ({
  label,
  value,
  setValue,
  unit,
  min,
  max,
  step = 1,
}: RowInputProps) => {
  const [inputText, setInputText] = useState<string>(String(value));
  const { showToast } = useToast();
  const decimalPlaces = useMemo(() => {
    if (!step || Number.isNaN(step)) return 0;
    const stepStr = String(step);
    const dotIdx = stepStr.indexOf(".");
    return dotIdx === -1 ? 0 : stepStr.length - dotIdx - 1;
  }, [step]);

  const formatFromValue = (num: number) => {
    if (step % 1 !== 0) {
      return num.toFixed(decimalPlaces);
    }
    return String(num);
  };

  useEffect(() => {
    setInputText(formatFromValue(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimalPlaces]);

  const commitValue = () => {
    const raw = inputText.trim();
    if (raw === "") {
      // 빈 입력이면 기존 값을 유지하고 표시만 되돌림
      setInputText(formatFromValue(value));
      showToast({
        data: { message: "값을 입력해주세요", type: "warning", variant: "pc" },
        autoClose: 1500,
        hideProgressBar: true,
      });
      return;
    }
    const parsed = step % 1 !== 0 ? parseFloat(raw) : parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
      setInputText(formatFromValue(value));
      return;
    }
    let next = parsed;
    let outOfRangeMessage: string | null = null;
    if (typeof min === "number" && parsed < min) {
      next = min;
      outOfRangeMessage = `${label}은(는) 최소 ${min}${unit} 이상이어야 해요`;
    }
    if (typeof max === "number" && parsed > max) {
      next = max;
      outOfRangeMessage = `${label}은(는) 최대 ${max}${unit} 이하로 입력해 주세요`;
    }
    setValue(next);
    setInputText(formatFromValue(next));
    if (outOfRangeMessage) {
      showToast({
        data: { message: outOfRangeMessage, type: "warning", variant: "pc" },
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  return (
    <div className={rowInputContainer}>
      <div className={rowInputLabelContainer}>
        <Body type="small" weight={400} color={COLORS.gray[500]}>
          {label}
        </Body>
      </div>
      <div className={rowInputValueContainer}>
        <input
          type="number"
          value={inputText}
          className={rowInputValueInput}
          min={min}
          max={max}
          step={step}
          inputMode={step % 1 !== 0 ? "decimal" : "numeric"}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          onBlur={commitValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              commitValue();
            }
          }}
        />
        <Body type="xsmall" weight={500} color={COLORS.gray[700]}>
          {unit}
        </Body>
      </div>
    </div>
  );
};
