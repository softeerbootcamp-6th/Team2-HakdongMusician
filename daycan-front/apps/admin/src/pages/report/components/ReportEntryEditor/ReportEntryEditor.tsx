import { Body, HighlightingHeading, useToast } from "@daycan/ui";
import type { TReportEntry } from "@/services/report/types";
import {
  reportEntryEditorContainer,
  reportEntryEditorTitle,
  reportEntryItem,
  reportEntryField,
  reportEntryFieldLabel,
  reportEntryInput,
  reportEntryInputHover,
  reportEntryTextarea,
  reportEntryMemoContainer,
} from "./ReportEntryEditor.css";

interface ReportEntryEditorProps {
  title: string;
  entries: TReportEntry[];
  memo: string;
  isEntryEditable?: boolean;
  onEntryChange: (
    category:
      | "mealEntries"
      | "physicalEntries"
      | "cognitiveEntries"
      | "healthEntries",
    index: number,
    field: keyof TReportEntry,
    value: string
  ) => void;
  onMemoChange: (field: string, value: string) => void;
  category:
    | "mealEntries"
    | "physicalEntries"
    | "cognitiveEntries"
    | "healthEntries";
  memoField: string;
}

export const ReportEntryEditor = ({
  title,
  entries,
  memo,
  onEntryChange,
  onMemoChange,
  category,
  memoField,
  isEntryEditable = true,
}: ReportEntryEditorProps) => {
  const { showToast } = useToast();

  const handleReadOnlyClick = () => {
    showToast({
      data: {
        message: "수정 불가능한 항목입니다.",
        type: "warning",
        variant: "pc",
      },
    });
  };

  // 카테고리별 수정 권한 설정
  const getFieldEditability = (field: keyof TReportEntry) => {
    if (!isEntryEditable) return false;

    switch (category) {
      case "mealEntries":
        // 식사: key는 수정 불가, value만 수정 가능
        return field === "value";
      case "physicalEntries":
      case "cognitiveEntries":
        // 신체-인지: key, value, additionalInfo 수정 가능
        return (
          field === "key" || field === "value" || field === "additionalInfo"
        );
      case "healthEntries":
        // 건강: 모든 필드 수정 불가능
        return false;
      default:
        return false;
    }
  };

  // 경고 필드 표시 여부 (식사는 경고 무시)
  const shouldShowWarning = category !== "mealEntries";

  // 추가 정보 필드 표시 여부 (신체-인지만 표시)
  const shouldShowAdditionalInfo =
    category === "physicalEntries" || category === "cognitiveEntries";

  return (
    <div className={reportEntryEditorContainer}>
      <div className={reportEntryEditorTitle}>
        <HighlightingHeading text={title} />
      </div>
      {entries.map((entry, index) => (
        <div key={index} className={reportEntryItem}>
          <div className={reportEntryField}>
            <Body type="small" weight={500} className={reportEntryFieldLabel}>
              항목명:
            </Body>
            <input
              type="text"
              value={entry.key}
              onChange={(e) =>
                onEntryChange(category, index, "key", e.target.value)
              }
              className={`${reportEntryInput} ${getFieldEditability("key") ? reportEntryInputHover : ""}`}
              readOnly={!getFieldEditability("key")}
              onClick={() => {
                if (!getFieldEditability("key")) {
                  handleReadOnlyClick();
                }
              }}
            />
          </div>

          <div className={reportEntryField}>
            <Body type="small" weight={500} className={reportEntryFieldLabel}>
              값:
            </Body>
            <input
              type="text"
              value={entry.value}
              onChange={(e) =>
                onEntryChange(category, index, "value", e.target.value)
              }
              className={`${reportEntryInput} ${getFieldEditability("value") ? reportEntryInputHover : ""}`}
              readOnly={!getFieldEditability("value")}
              onClick={() => {
                if (!getFieldEditability("value")) {
                  handleReadOnlyClick();
                }
              }}
            />
          </div>

          {shouldShowWarning && (
            <div className={reportEntryField}>
              <Body type="small" weight={500} className={reportEntryFieldLabel}>
                경고:
              </Body>
              <input
                type="text"
                value={entry.warning}
                onChange={(e) =>
                  onEntryChange(category, index, "warning", e.target.value)
                }
                className={`${reportEntryInput} ${getFieldEditability("warning") ? reportEntryInputHover : ""}`}
                readOnly={!getFieldEditability("warning")}
                onClick={() => {
                  if (!getFieldEditability("warning")) {
                    handleReadOnlyClick();
                  }
                }}
              />
            </div>
          )}

          {shouldShowAdditionalInfo && (
            <div>
              <Body type="small" weight={500} className={reportEntryFieldLabel}>
                추가 정보:
              </Body>
              <input
                type="text"
                value={entry.additionalInfo}
                onChange={(e) =>
                  onEntryChange(
                    category,
                    index,
                    "additionalInfo",
                    e.target.value
                  )
                }
                className={`${reportEntryInput} ${getFieldEditability("additionalInfo") ? reportEntryInputHover : ""}`}
                readOnly={!getFieldEditability("additionalInfo")}
                onClick={() => {
                  if (!getFieldEditability("additionalInfo")) {
                    handleReadOnlyClick();
                  }
                }}
              />
            </div>
          )}
        </div>
      ))}

      <div className={reportEntryMemoContainer}>
        <Body type="small" weight={500} className={reportEntryFieldLabel}>
          {title} 메모:
        </Body>
        <textarea
          value={memo}
          onChange={(e) => onMemoChange(memoField, e.target.value)}
          className={reportEntryTextarea}
          placeholder={`${title} 관련 메모를 입력하세요`}
        />
      </div>
    </div>
  );
};
