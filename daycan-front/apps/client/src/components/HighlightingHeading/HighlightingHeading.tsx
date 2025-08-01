import { COLORS, Heading } from "@daycan/ui";
import { highlightingHeading, highlighter } from "./HighlightingHeading.css";

interface HighlightingHeadingProps {
  text: string;
}

export const HighlightingHeading = ({ text }: HighlightingHeadingProps) => {
  return (
    <div className={highlightingHeading}>
      <Heading
        type="medium"
        weight={600}
        color={COLORS.gray[600]}
        style={{ zIndex: 2 }}
      >
        {text}
      </Heading>
      <div className={highlighter} />
    </div>
  );
};
