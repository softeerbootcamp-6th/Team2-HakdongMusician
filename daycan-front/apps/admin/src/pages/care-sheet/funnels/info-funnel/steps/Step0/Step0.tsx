import { Body, COLORS, Icon } from "@daycan/ui";
import { InfoFunnelLayout } from "../../components/InfoFunnelLayout";
import { step0Input, step0InputContainer } from "./Step0.css";
import { MemberList } from "../../components/MemberList";
import { useEffect, useState } from "react";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useNavigate } from "react-router-dom";
import { useFunnel } from "@daycan/hooks";
import { useGetMemberListQuery } from "@/services/member/useMemberQuery";
import type { TMember } from "@/services/member/types";

export const Step0 = () => {
  const navigate = useNavigate();
  const { toNext, getStepState, updateState } = useFunnel();
  const [memberId, setMemberId] = useState<number>();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: memberList } = useGetMemberListQuery();
  // 기존 데이터가 있으면 로드 (API prefill 포함)
  useEffect(() => {
    const existingData = getStepState("STEP_0");
    if (existingData) {
      setMemberId(existingData.memberId);
      setSearchQuery(existingData.searchQuery || "");

      // API prefill로 받은 selectedMember가 있으면 UI에 반영
      if (existingData.selectedMember) {
        setMemberId(existingData.selectedMember.id);
        setSearchQuery(existingData.selectedMember.name);
      }
    }
  }, [getStepState]);

  const handleMemberSelect = (member: TMember) => {
    setMemberId(member.id);
    setSearchQuery(member.name);

    // FunnelState에 데이터 저장
    updateState({
      memberId: member.id,
      searchQuery: member.name,
      selectedMember: member,
    });
  };

  // 검색어에 따른 필터링
  const filteredMembers = memberList?.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <InfoFunnelLayout>
        <Body type="large" weight={600} color={COLORS.gray[800]}>
          누구의 기록지를 작성하시나요?
        </Body>

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
          members={filteredMembers || []}
          selectedMemberId={memberId}
          onMemberSelect={handleMemberSelect}
        />
      </InfoFunnelLayout>

      <StepButtons
        onNext={() => {
          toNext();
        }}
        onPrev={() => {
          navigate("/care-sheet/new");
        }}
        isNextEnabled={!!memberId}
      />
    </>
  );
};
