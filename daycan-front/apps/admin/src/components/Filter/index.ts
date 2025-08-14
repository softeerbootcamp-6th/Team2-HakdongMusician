/**
 * Filter 컴포넌트는 필터 기능을 제공하는 컴포넌트입니다.
 * 기록지 페이지, 리포트 전송 페이지, 수급자 관리, 종사자 관리 등 admin 내 페이지에서 사용됩니다.
 * Filter는 FilterItem 타입의 배열을 받아서 각 필터 아이템마다의 기능을 제공합니다.
 * FilterItem 타입은 다음과 같습니다.
 *
 * interface FilterItem {
 *   text?: string; // 필터 텍스트
 *   options?: string[]; // 필터 옵션
 *   icon?: ReactElement; // 필터 아이콘
 *   onSelect?: (option?: string) => void; // 필터 옵션 선택 시 호출되는 함수
 *   onClick?: () => void; // 필터 클릭 시 호출되는 함수
 *   isActive?: boolean; // 필터 활성 상태
 *   showDropdown?: boolean; // 필터 드롭다운 표시 여부
 *   onToggleDropdown?: () => void; // 필터 드롭다운 토글 시 호출되는 함수
 *   selectedOptions?: string[]; // 선택된 옵션
 * }
 *
 * 해당 Item 마다, 옵션이 있을 수도 있고, 없을 수도 있습니다.
 * 옵션이 있을 경우, 옵션을 선택하면 해당 옵션에 대해 드롭다운들이 생기고
 * 각 드롭다운별 필터링이 다르게 적용될 수 있게 함수를 받아오는 로직을 구성합니다.
 * @author 홍규진
 */
export { Filter } from "./Filter";
export type { FilterItem } from "./Filter";
export { useFilter } from "./useFilter";
