import { Body, Chip } from "@daycan/ui";
import {
  dataRowContainer,
  dataRow,
  dataColumn,
  dataActionColumn,
  dataDetailContainer,
  dataDetailContainerOpen,
  dataDetailContainerClosed,
} from "./DataRow.css";
import { COLORS } from "@daycan/ui";
import { DataSection } from "@/components/DataSection";
import profileImage from "@/assets/images/profile.png";
import { useDataRow } from "./useDataRowHook";
import type { DataColumn, MemberResponse } from "@/types/elder.ts"; // Assuming this is the correct path for your types

interface DataRowProps {
  apiMember: MemberResponse;
  index: number;
  columns: DataColumn[];
  onDetailClick?: (member: MemberResponse) => void;
}

export const DataRow = ({
  apiMember,
  index,
  columns,
  onDetailClick,
}: DataRowProps) => {
  const {
    isDetailOpen,
    isClosing,
    member,
    guardian,
    getFieldValue,
    handleDetailClick,
  } = useDataRow({
    apiMember,
    index,
    onDetailClick,
  });

  return (
    <div className={dataRowContainer}>
      <div className={dataRow}>
        {columns.map((column, index) => {
          const value = getFieldValue(column.field);
          const displayValue = column.render ? column.render(value) : value;

          return (
            <div
              key={index}
              className={dataColumn}
              style={{ width: column.width }}
            >
              {column.field === "profileImage" ? (
                <img
                  src={profileImage}
                  alt="프로필 이미지"
                  style={{ width: "30px", height: "30px" }}
                />
              ) : (
                <Body>{displayValue}</Body>
              )}
            </div>
          );
        })}
        <div className={dataActionColumn}>
          <Chip
            style={{
              backgroundColor: COLORS.gray[200],
              cursor: "pointer",
              width: "70px",
            }}
            round="s"
            onClick={handleDetailClick}
          >
            <Body type="xsmall" color={COLORS.gray[700]}>
              {isDetailOpen ? "닫기" : "상세 보기"}
            </Body>
          </Chip>
        </div>
      </div>

      {/* 상세 정보 섹션 */}
      <div
        className={`${dataDetailContainer} ${
          isClosing
            ? dataDetailContainerClosed
            : isDetailOpen
              ? dataDetailContainerOpen
              : ""
        }`}
      >
        {(isDetailOpen || isClosing) && (
          <DataSection member={member} guardian={guardian} />
        )}
      </div>
    </div>
  );
};
