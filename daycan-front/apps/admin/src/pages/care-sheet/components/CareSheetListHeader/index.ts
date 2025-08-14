/**
 * CareSheetListHeader(기록지 리스트 헤더) 컴포넌트입니다.
 * 해당 컴포넌트는 기록지 리스트 헤더를 관리합니다.
 * 전체 선택/해제 버튼을 관리합니다.
 * 해당 컴포넌트는 CareSheetList(기록지 리스트) 컴포넌트와 함께 CareSheetList(기록지 리스트) 컴포넌트 내에서 사용됩니다.
 * ListHeaderLayout 컴포넌트를 사용하여 레이아웃을 잡습니다!
 * 각 Header 마다 체크박스를 누를 때의 기준이 다르기에(출석 인원/결석 인원 등)
 * 함수를 주입받아, 각 체크박스를 누를 때의 기준을 정할 수 있습니다.
 * @author 홍규진
 */
export * from "./CareSheetListHeader";
