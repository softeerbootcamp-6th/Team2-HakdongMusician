import { Body, COLORS, Icon } from "@daycan/ui";
import {
  rowCounterContainer,
  rowCounterLabelContainer,
  rowCounterValueContainer,
} from "./RowCounter.css";

interface RowCounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const RowCounter = ({
  label,
  value,
  onIncrement,
  onDecrement,
}: RowCounterProps) => {
  return (
    <div className={rowCounterContainer}>
      <div className={rowCounterLabelContainer}>
        <Body type="small" weight={400} color={COLORS.gray[500]}>
          {label}
        </Body>
      </div>
      <div className={rowCounterValueContainer}>
        <Icon name="minusBox" width={24} height={24} onClick={onDecrement} />

        <Body type="medium" weight={500} color={COLORS.gray[700]}>
          {value}
        </Body>
        <Icon name="plusBox" width={24} height={24} onClick={onIncrement} />
      </div>
    </div>
  );
};
