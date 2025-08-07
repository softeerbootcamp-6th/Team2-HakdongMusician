import { Body, Chip } from "@daycan/ui";
import {
  dataRowContainer,
  dataRow,
  dataColumn,
  dataActionColumn,
  dataDetailContainer,
} from "./DataListRow.css";
import { COLORS } from "@daycan/ui";
import profileImage from "@/assets/images/profile.png";
import { useDataListRow } from "./useDataRowListHook";
import type { AdminMemberAndGuardianResponse } from "@/types";
import { MEMBER_HEADERS } from "@/constants/memberList";

interface DataListRowProps {
  data: AdminMemberAndGuardianResponse;
  index: number;
  onDetailClick?: (member: AdminMemberAndGuardianResponse) => void;
  dataSection: React.ReactNode;
}

export const DataListRow = ({
  data,
  index,
  onDetailClick,
  dataSection,
}: DataListRowProps) => {
  const {
    isDetailOpen,
    isClosing,
    member,
    handleDetailClick,
    getDetailContainerState,
  } = useDataListRow({
    apiData: data,
    index,
    onDetailClick,
  });

  // memberData의 키에 따라 값을 반환하는 함수
  const getMemberValue = (key: string) => {
    switch (key) {
      case "order":
        return member.order;
      case "profileImage":
        return (
          <img
            src={profileImage}
            alt="프로필 이미지"
            style={{ width: "30px", height: "30px" }}
          />
        );
      case "name":
        return member.name;
      case "birthDate":
        return member.birthDate;
      case "gender":
        return member.gender;
      case "careGrade":
        return member.careGrade;
      case "careNumber":
        return member.careNumber;
      case "guardianContact":
        return member.guardianContact;
      default:
        return "";
    }
  };

  return (
    <div className={dataRowContainer}>
      <div className={dataRow}>
        {MEMBER_HEADERS.map((column, columnIndex) => (
          <div
            key={`${column.key}-${columnIndex}`}
            className={dataColumn}
            style={{ width: column.width }}
          >
            {column.key === "profileImage" ? (
              getMemberValue(column.key)
            ) : (
              <Body>{getMemberValue(column.key)}</Body>
            )}
          </div>
        ))}

        <div className={dataActionColumn}>
          <Chip
            style={{
              cursor: "pointer",
              width: "70px",
            }}
            color="grayLight"
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
        className={dataDetailContainer({ state: getDetailContainerState() })}
      >
        {(isDetailOpen || isClosing) && dataSection}
      </div>
    </div>
  );
};
