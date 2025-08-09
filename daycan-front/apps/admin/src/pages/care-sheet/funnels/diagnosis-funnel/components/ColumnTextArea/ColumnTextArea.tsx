import { Body, COLORS, Icon } from "@daycan/ui";
import {
  columnTextArea,
  columnTextAreaInput,
  columnTextAreaValueCounter,
  columnTextAreaAutoSelectTag,
  autoTag,
  columnTextAreaAutoSelectTagTitle,
} from "./ColumnTextArea.css";

interface ColumnTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoSelectTags?: { value: string; isGood: boolean }[];
  maxValue?: number;
}

export const ColumnTextArea = ({
  label,
  value,
  onChange,
  autoSelectTags,
  maxValue = 100,
}: ColumnTextAreaProps) => {
  function handleAutoSelectTagClick(tag: { value: string; isGood: boolean }) {
    const separator = value.length > 0 && !value.endsWith(" ") ? " " : "";
    const next = (value + separator + tag.value).slice(0, maxValue);
    onChange(next);
  }

  return (
    <div className={columnTextArea}>
      <textarea
        value={value}
        className={columnTextAreaInput}
        maxLength={maxValue}
        onChange={(e) => {
          const next = e.target.value.slice(0, maxValue);
          onChange(next);
        }}
        placeholder={`${label} 활동 중 특이사항을 입력해주세요`}
      />
      <div className={columnTextAreaValueCounter}>
        <Body type="xsmall" weight={400} color={COLORS.gray[500]}>
          {value.length} / {maxValue}자
        </Body>
        <Icon
          name="delete"
          width={24}
          height={24}
          onClick={() => onChange("")}
        />
      </div>
      {autoSelectTags && (
        <>
          <div className={columnTextAreaAutoSelectTagTitle}>
            <Body type="xsmall" weight={400} color={COLORS.gray[500]}>
              자동 생성 태그
            </Body>
            <Icon name="spark" width={20} height={20} />
          </div>
          <div className={columnTextAreaAutoSelectTag}>
            {autoSelectTags.map((tag) => (
              <div
                key={tag.value}
                className={autoTag({ isGood: tag.isGood })}
                onClick={() => handleAutoSelectTagClick(tag)}
              >
                <Body
                  type="xsmall"
                  weight={400}
                  color={tag.isGood ? COLORS.blue[500] : COLORS.red[500]}
                >
                  {tag.value}
                </Body>
                <Icon
                  name={tag.isGood ? "good" : "bad"}
                  width={20}
                  height={20}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
