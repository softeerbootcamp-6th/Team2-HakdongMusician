import { Body, Chip } from "@daycan/ui";
import {
  memberDataListHeader,
  memberDataListHeaderContainer,
  orderColumn,
  profileColumn,
  nameColumn,
  birthDateColumn,
  genderColumn,
  careGradeColumn,
  careNumberColumn,
  guardianContactColumn,
  detailButton,
} from "./MemberDataListHeader.css.ts";

export const MemberDataListHeader = () => {
  return (
    <div className={memberDataListHeader}>
      <div className={memberDataListHeaderContainer}>
        <Body type="small" weight={500} className={orderColumn}>
          순서
        </Body>
        <Body type="small" weight={500} className={profileColumn}>
          프로필
        </Body>
        <Body type="small" weight={500} className={nameColumn}>
          이름
        </Body>
        <Body type="small" weight={500} className={birthDateColumn}>
          생년월일
        </Body>
        <Body type="small" weight={500} className={genderColumn}>
          성별
        </Body>
        <Body type="small" weight={500} className={careGradeColumn}>
          장기요양등급
        </Body>
        <Body type="small" weight={500} className={careNumberColumn}>
          장기요양인정번호
        </Body>
        <Body type="small" weight={500} className={guardianContactColumn}>
          보호자 연락처
        </Body>
        <Chip round="s" className={detailButton}>
          <Body type="xsmall" color="transparent">
            상세 보기
          </Body>
        </Chip>
      </div>
    </div>
  );
};
