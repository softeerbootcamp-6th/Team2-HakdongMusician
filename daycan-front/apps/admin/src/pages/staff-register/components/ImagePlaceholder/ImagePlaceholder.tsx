import { Icon, Body, COLORS } from "@daycan/ui";
import { imagePlaceholder } from "./ImagePlaceholder.css";

interface ImagePlaceholderProps {
  iconWidth?: number;
  iconHeight?: number;
  text?: string;
}

export const ImagePlaceholder = ({
  iconWidth = 48,
  iconHeight = 48,
  text = "파일을 선택 또는 드래그앤드롭",
}: ImagePlaceholderProps) => {
  return (
    <div className={imagePlaceholder}>
      <Icon name="photoAlternate" width={iconWidth} height={iconHeight} />
      <Body
        type="xsmall"
        weight={400}
        style={{
          color: COLORS.gray[500],
          textAlign: "center",
          marginTop: "7px",
        }}
      >
        {text}
      </Body>
    </div>
  );
};
