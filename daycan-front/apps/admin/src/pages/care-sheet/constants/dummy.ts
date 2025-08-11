import type { SearchResultItem } from "../funnels/home-funnel/components/SearchStaffResultList/types";

// 임시 데이터
export const mockSearchResults: SearchResultItem[] = [
  {
    id: "1",
    name: "홍요양",
    role: "사회복지사",
    profileImage: "/api/profile/1.jpg", // 실제 이미지 URL로 교체
  },
  {
    id: "2",
    name: "김간호",
    role: "간호사",
  },
  {
    id: "3",
    name: "박요양",
    role: "요양보호사",
  },
  {
    id: "4",
    name: "이사회복지",
    role: "사회복지사",
  },
  {
    id: "5",
    name: "이사회복지",
    role: "사회복지사",
  },
  {
    id: "6",
    name: "이사회복지",
    role: "사회복지사",
  },
  {
    id: "7",
    name: "이사회복지",
    role: "사회복지사",
  },
  {
    id: "8",
    name: "이사회복지",
    role: "사회복지사",
  },
  {
    id: "9",
    name: "이사회복지",
    role: "사회복지사",
  },
  {
    id: "10",
    name: "이사회복지",
    role: "사회복지사",
  },
];

export const mockElderlyResults: SearchResultItem[] = [
  {
    id: "1",
    name: "홍길동",
    role: "고령자",
    profileImage: "/api/profile/1.jpg", // 실제 이미지 URL로 교체
  },
  {
    id: "2",
    name: "김길동",
    role: "고령자",
  },
  {
    id: "3",
    name: "박길동",
    role: "고령자",
  },
  {
    id: "4",
    name: "이길동",
    role: "고령자",
  },
  {
    id: "5",
    name: "최길동",
    role: "고령자",
  },
  {
    id: "6",
    name: "박길동",
    role: "고령자",
  },
  {
    id: "7",
    name: "최길동",
    role: "고령자",
  },
  {
    id: "8",
    name: "박길동",
    role: "고령자",
  },
  {
    id: "9",
    name: "최길동",
    role: "고령자",
  },
  {
    id: "10",
    name: "박길동",
    role: "고령자",
  },
];

export const mockCareSheetPendingDoneList: CareSheetListItemType = {
  page: 0,
  result: [
    {
      careSheetId: 1001,
      status: "SHEET_DONE",
      memberMeta: {
        memberId: "MEM12345",
        name: "김순애",
        birthDate: "1943-09-12",
        gender: "FEMALE",
      },
      isAttending: true,
      writerName: "양동성",
      writerId: 501,
    },
    {
      careSheetId: 1003,
      status: "SHEET_PENDING",
      memberMeta: {
        memberId: "MEM12347",
        name: "이철수",
        birthDate: "1940-07-22",
        gender: "MALE",
      },
      isAttending: true,
      writerName: "최지영",
      writerId: 503,
    },
    {
      careSheetId: 1004,
      status: "SHEET_DONE",
      memberMeta: {
        memberId: "MEM12348",
        name: "정미영",
        birthDate: "1948-11-08",
        gender: "FEMALE",
      },
      isAttending: true,
      writerName: "박준호",
      writerId: 504,
    },
    {
      careSheetId: 1005,
      status: "SHEET_PENDING",
      memberMeta: {
        memberId: "MEM12349",
        name: "한영수",
        birthDate: "1942-05-30",
        gender: "MALE",
      },
      isAttending: true,
      writerName: "이수진",
      writerId: 505,
    },
  ],
  totalElement: 4,
  totalPage: 1,
};

export const mockCareSheetNotApplicableList: CareSheetListItemType = {
  page: 0,
  result: [
    {
      careSheetId: 1001,
      status: "NOT_APPLICABLE",
      memberMeta: {
        memberId: "MEM12345",
        name: "김순애",
        birthDate: "1943-09-12",
        gender: "FEMALE",
      },
      isAttending: false,
      writerName: "양동성",
      writerId: 501,
    },
  ],
  totalElement: 1,
  totalPage: 1,
};

//임시 타입일 뿐, 추후에 API 내에서 정의한 타입으로 대체될 예정입니다.
export type CareSheetListItemType = {
  page: number;
  result: {
    careSheetId: number;
    status: "NOT_APPLICABLE" | "SHEET_PENDING" | "SHEET_DONE";
    memberMeta: {
      memberId: string;
      name: string;
      birthDate: string;
      gender: "FEMALE" | "MALE";
    };
    isAttending: boolean;
    writerName: string;
    writerId: number;
  }[];
  totalElement: number;
  totalPage: number;
};
