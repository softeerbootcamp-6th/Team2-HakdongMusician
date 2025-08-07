import type { SearchResultItem } from "../components/SearchStaffResultList/types";

// home-funnel에서 관리하는 데이터 타입
export interface HomeFunnelData {
  writerId: number;
}

// 각 Step의 데이터 타입 정의
export interface Step0Data {
  selectedUser?: SearchResultItem;
  searchQuery: string;
}

export interface Step1Data {
  selectedMethod: string;
}
