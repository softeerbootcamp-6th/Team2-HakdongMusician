import { Body, COLORS } from "@daycan/ui";
import {
  summaryCardContainer,
  summaryCardTitle,
  summaryCardItemsGrid,
  summaryCardItemsColumn,
  summaryCardItemsGrid3,
  summaryCardItemsGrid4,
  summaryCardItem,
} from "./CareSheetDataSummaryCard.css";

interface CareSheetDataSummaryCardProps {
  title: string;
  icon: string;
  items: Array<{
    label: string;
    value: string | number | boolean;
    unit?: string;
    booleanLabels?: { true: string; false: string };
  }>;
  layout?: "grid" | "column";
  gridColumns?: number;
}

export const CareSheetDataSummaryCard = ({
  title,
  icon,
  items,
  layout = "grid",
  gridColumns = 2,
}: CareSheetDataSummaryCardProps) => {
  const formatValue = (
    value: string | number | boolean,
    unit?: string,
    booleanLabels?: { true: string; false: string }
  ) => {
    if (typeof value === "boolean") {
      return booleanLabels
        ? value
          ? booleanLabels.true
          : booleanLabels.false
        : value
          ? "예"
          : "아니오";
    }

    if (unit) {
      return `${value}${unit}`;
    }

    return value;
  };

  const renderItems = () => {
    if (layout === "column") {
      return (
        <div className={summaryCardItemsColumn}>
          {items.map((item, index) => (
            <div key={index} className={summaryCardItem}>
              <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
                {item.label}:
              </Body>
              <Body type="xsmall" weight={600} color={COLORS.gray[800]}>
                {formatValue(item.value, item.unit, item.booleanLabels)}
              </Body>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        className={
          gridColumns === 2
            ? summaryCardItemsGrid
            : gridColumns === 3
              ? summaryCardItemsGrid3
              : gridColumns === 4
                ? summaryCardItemsGrid4
                : summaryCardItemsGrid
        }
      >
        {items.map((item, index) => (
          <div key={index} className={summaryCardItem}>
            <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
              {item.label}:
            </Body>
            <Body type="xsmall" weight={600} color={COLORS.gray[800]}>
              {formatValue(item.value, item.unit, item.booleanLabels)}
            </Body>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={summaryCardContainer}>
      <Body
        type="small"
        weight={600}
        color={COLORS.gray[700]}
        className={summaryCardTitle}
      >
        {icon} {title}
      </Body>
      {renderItems()}
    </div>
  );
};
