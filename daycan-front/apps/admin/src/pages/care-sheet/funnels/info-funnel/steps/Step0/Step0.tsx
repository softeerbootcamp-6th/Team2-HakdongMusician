import { Body, COLORS, Icon } from "@daycan/ui";
import { InfoFunnelLayout } from "../../components/InfoFunnelLayout";
import { step0Input, step0InputContainer } from "./Step0.css";
import { MemberList } from "../../components/MemberList";
import { mockMembers } from "../../constants/dummy";
import { useEffect, useState } from "react";
import type { Member } from "../../components/MemberList/types";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useNavigate } from "react-router-dom";
import { useFunnel } from "@daycan/hooks";

export const Step0 = () => {
  const navigate = useNavigate();
  const { toNext, getStepState, updateState } = useFunnel();
  const [recipientId, setRecipientId] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_0");
    if (existingData) {
      setRecipientId(existingData.recipientId);
      setSearchQuery(existingData.searchQuery || "");
    }
  }, [getStepState]);

  const handleMemberSelect = (member: Member) => {
    setRecipientId(member.id);
    setSearchQuery(member.name);

    // FunnelState에 데이터 저장
    updateState({
      recipientId: member.id,
      searchQuery: member.name,
      selectedMember: member,
    });
  };

  // 검색어에 따른 필터링
  const filteredMembers = mockMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <InfoFunnelLayout>
      <Body type="large" weight={600} color={COLORS.gray[800]}>
        누구의 기록지를 작성하시나요?
      </Body>
      {/*TODO - 고령자 이름 입력 필드 Input 시스템 정의되면 수정*/}
      <div className={step0InputContainer}>
        <input
          type="text"
          className={step0Input}
          placeholder="수급자 이름"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Icon name="search" width={24} height={24} color={COLORS.gray[500]} />
      </div>
      <MemberList
        members={filteredMembers}
        selectedMemberId={recipientId}
        onMemberSelect={handleMemberSelect}
      />
      <StepButtons
        onNext={() => {
          toNext();
        }}
        onPrev={() => {
          navigate("/care-sheet/new");
        }}
        isNextEnabled={!!recipientId}
      />
    </InfoFunnelLayout>
  );
};
