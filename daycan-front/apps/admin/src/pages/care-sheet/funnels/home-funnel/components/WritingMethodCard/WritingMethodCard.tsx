import { Body, COLORS } from "@daycan/ui";
import {
  container,
  imageContainer,
  titleContainer,
} from "./WritingMethodCard.css";

export const WritingMethodCard = ({
  title,
  description,
  image,
  isSelected = false,
  onClick,
}: {
  title: string;
  description: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={container} onClick={onClick}>
      <div className={titleContainer}>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          {title}
        </Body>
        {isSelected && (
          <div>
            <Body
              type="xsmall"
              weight={400}
              style={{
                backgroundColor: COLORS.yellow[200],
                color: COLORS.yellow[500],
                padding: "2px 4px",
                borderRadius: "4px",
                textAlign: "center",
                display: "inline",
              }}
            >
              최근 사용한 방법
            </Body>
          </div>
        )}
        <Body type="xsmall" weight={400} color={COLORS.gray[500]}>
          {description}
        </Body>
      </div>
      <div className={imageContainer}>
        <img
          src={image}
          alt="writingMethodCard"
          style={{ transform: "translateY(25px)" }}
        />
      </div>
    </div>
  );
};
