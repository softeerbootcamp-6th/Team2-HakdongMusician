import { memberDataListContainer } from "./MemberDataList.css.ts";
import { MemberDataListHeader } from "../MemberDataListHeader";
import { useMember } from "../../hooks/index.ts";
import { MemberDataItemDetail } from "../MemberDataItemDetail/index.ts";
import { MemberDetailContent } from "../MemberDetailContent/index.ts";
import { GuardianDetailContent } from "../GuardianDetailContent/index.ts";
import { Chip, Body, COLORS } from "@daycan/ui";
import {
  formatBirthDate,
  formatGender,
  formatCareGrade,
} from "@/utils/index.ts";
import {
  memberDataList,
  memberDataListItem,
  orderColumn,
  profileColumn,
  nameColumn,
  birthDateColumn,
  genderColumn,
  careGradeColumn,
  careNumberColumn,
  guardianContactColumn,
  detailCardLayout,
  dataDetailContainer,
  profileImage,
} from "./MemberDataList.css.ts";
import profileImg from "@/assets/images/profile.png";
import type { MemberData } from "@/types/member.ts";

interface MemberDataListProps {
  onEditButtonClick: (memberId: string) => void;
  onDeleteButtonClick: (memberId: string) => void;
  members: MemberData[];
}

export const MemberDataList = ({
  onEditButtonClick,
  onDeleteButtonClick,
  members,
}: MemberDataListProps) => {
  const { openDetails, getDetailContainerState, handleDetailClick } =
    useMember();
  return (
    <div className={memberDataListContainer}>
      <MemberDataListHeader />

      {/* 데이터 리스트 */}
      <div className={memberDataList}>
        {members.map((member, idx) => {
          const isDetailOpen = openDetails.has(member.userCode);
          return (
            <div key={member.userCode}>
              <div>
                <div
                  className={memberDataListItem({
                    hasDetail: isDetailOpen,
                  })}
                >
                  <div className={orderColumn}>{idx + 1}</div>
                  <div className={profileColumn}>
                    <img
                      src={profileImg}
                      alt="프로필"
                      className={profileImage}
                    />
                  </div>
                  <div className={nameColumn}>{member.name}</div>
                  <div className={birthDateColumn}>
                    {formatBirthDate(member.birthDate)}
                  </div>
                  <div className={genderColumn}>
                    {formatGender(member.gender)}
                  </div>
                  <div className={careGradeColumn}>
                    {formatCareGrade(member.careLevel)}
                  </div>
                  <div className={careNumberColumn}>{member.careLevel}</div>
                  <div className={guardianContactColumn}>
                    {member.guardianPhoneNumber}
                  </div>
                  <Chip
                    color="grayLight"
                    round="s"
                    onClick={() => handleDetailClick(member.userCode)}
                    style={{
                      width: "70px",
                      cursor: "pointer",
                    }}
                  >
                    <Body type="xsmall" color={COLORS.gray[700]}>
                      {isDetailOpen ? "닫기" : "상세 보기"}
                    </Body>
                  </Chip>
                </div>
                <div
                  className={dataDetailContainer({
                    state: getDetailContainerState(member.userCode),
                  })}
                >
                  <MemberDataItemDetail
                    memberId={member.memberId}
                    detailCard={
                      <div className={detailCardLayout}>
                        <MemberDetailContent member={member} />
                        <GuardianDetailContent member={member} />
                      </div>
                    }
                    onEditButtonClick={onEditButtonClick}
                    onDeleteButtonClick={onDeleteButtonClick}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
