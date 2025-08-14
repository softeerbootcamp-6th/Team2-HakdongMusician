import { Body, COLORS, Segment } from "@daycan/ui";
import {
  rowSegmentContainer,
  rowSegmentLabelContainer,
  rowSegmentSegmentContainer,
} from "./RowSegment.css";

interface RowSegmentProps {
  label: string;
  options: string[];
  value: string;
  onSegmentChange: (val: string) => void;
}

export const RowSegment = ({
  label,
  options,
  value,
  onSegmentChange,
}: RowSegmentProps) => {
  return (
    <div className={rowSegmentContainer}>
      <div className={rowSegmentLabelContainer}>
        <Body type="small" weight={400} color={COLORS.gray[500]}>
          {label}
        </Body>
      </div>
      <div className={rowSegmentSegmentContainer}>
        <Segment
          options={options}
          value={value}
          onSegmentChange={onSegmentChange}
          type="compact"
        />
      </div>
    </div>
  );
};
