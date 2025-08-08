import { Chip } from "@daycan/ui";
import { Body } from "@daycan/ui";
import { COLORS } from "@daycan/ui";
import { formatBirthDate, formatCareGrade } from "@/utils/util";
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
  profileImage,
  detailCardLayout,
  dataDetailContainer,
} from "./MemberDataItems.css";
import profileImg from "@/assets/images/profile.png";
import { useMember } from "../../hooks";
import { MemberDataItemDetail } from "../MemberDataItemDetail/MemberDataItemDetail";
import { MemberDetailCard } from "../MemberDetailCard/MemberDetailCard";
import { GuardianDetailCard } from "../GuardianDetailCard/GuardianDetailCard";

export const MemberDataItems = () => {
  const { members, openDetails, getDetailContainerState, handleDetailClick } =
    useMember();

  return (
    <div className={memberDataList}>
      {members.map((member, idx) => {
        const isDetailOpen = openDetails.has(member.username);

        return (
          <div key={member.username}>
            <div>
              <div
                className={memberDataListItem({
                  hasDetail: isDetailOpen,
                })}
              >
                <div className={orderColumn}>{idx + 1}</div>
                <div className={profileColumn}>
                  <img src={profileImg} alt="프로필" className={profileImage} />
                </div>
                <div className={nameColumn}>{member.name}</div>
                <div className={birthDateColumn}>
                  {formatBirthDate(member.birthDate)}
                </div>
                <div className={genderColumn}>{member.gender}</div>
                <div className={careGradeColumn}>
                  {formatCareGrade(member.careLevel)}
                </div>
                <div className={careNumberColumn}>{member.careNumber}</div>
                <div className={guardianContactColumn}>
                  {member.guardianPhoneNumber}
                </div>
                <Chip
                  color="grayLight"
                  round="s"
                  onClick={() => handleDetailClick(member.username)}
                  style={{
                    width: "70px",
                  }}
                >
                  <Body type="xsmall" color={COLORS.gray[700]}>
                    {isDetailOpen ? "닫기" : "상세 보기"}
                  </Body>
                </Chip>
              </div>
              <div
                className={dataDetailContainer({
                  state: getDetailContainerState(member.username),
                })}
              >
                <MemberDataItemDetail
                  detailCard={
                    <div className={detailCardLayout}>
                      <MemberDetailCard member={member as any} />
                      <GuardianDetailCard member={member as any} />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
