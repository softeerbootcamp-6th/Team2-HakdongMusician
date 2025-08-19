import type { TCareSheetListItem } from "@/services/careSheet/types";
import {
  careSheetListItemContainer,
  careSheetListItemProfile,
  careSheetListItemInfoContainer,
  careSheetListItemStatusContainer,
} from "./CareSheetListItem.css";
import { Body, COLORS, Icon } from "@daycan/ui";
import { useGetCareSheetDetailQuery } from "@/services/careSheet/useCareSheetQuery";
import { useNavigate } from "react-router-dom";
import { prefillCareSheetData } from "@/utils/careSheetPrefill";
import { useEffect, useState } from "react";

interface CareSheetListItemProps {
  careSheet: TCareSheetListItem;
}

export const CareSheetListItem = ({ careSheet }: CareSheetListItemProps) => {
  const navigate = useNavigate();
  const [shouldFetchDetail, setShouldFetchDetail] = useState(false);

  // Hook은 컴포넌트 최상위에서 호출, 조건적으로 데이터 fetch
  const { data: careSheetDetail, isLoading } = useGetCareSheetDetailQuery(
    careSheet.careSheetId,
    shouldFetchDetail // 클릭했을 때만 fetch
  );

  // 데이터가 로드되면 prefill하고 navigate
  useEffect(() => {
    if (careSheetDetail && shouldFetchDetail && !isLoading) {
      prefillCareSheetData(careSheetDetail);
      navigate(`/care-sheet/new/diagnosis`);
      setShouldFetchDetail(false); // 상태 리셋
    }
  }, [careSheetDetail, shouldFetchDetail, isLoading, navigate]);

  const handleClickWrittenCareSheet = () => {
    setShouldFetchDetail(true); // 데이터 fetch 트리거
  };

  return (
    <div className={careSheetListItemContainer}>
      <img
        src={careSheet.memberMeta.avatarUrl}
        alt="프로필"
        className={careSheetListItemProfile}
      />
      <div className={careSheetListItemInfoContainer}>
        <Body type="medium" weight={500} color={COLORS.gray[600]}>
          {careSheet.memberMeta.name}
        </Body>
      </div>
      <div>
        <div
          className={careSheetListItemStatusContainer}
          onClick={handleClickWrittenCareSheet}
        >
          <Body type="small" weight={500} color={COLORS.gray[600]}>
            기록지 보러 가기
          </Body>
          <Icon
            name={"chevronRight"}
            width={20}
            height={20}
            color={COLORS.gray[200]}
            stroke={COLORS.white}
          />
        </div>
      </div>
    </div>
  );
};
