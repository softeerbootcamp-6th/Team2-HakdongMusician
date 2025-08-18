import type { TCareSheetListItem } from "@/services/careSheet/types";

export const mockCareSheetList: TCareSheetListItem[] = [
  {
    careSheetId: 1,
    status: "DONE",
    memberMeta: {
      memberId: "M001",
      name: "김영희",
      birthDate: "1955-03-15",
      gender: "FEMALE",
      avatarUrl: "https://via.placeholder.com/48/FFB6C1/000000?text=김",
    },
    isAttending: true,
    writerName: "박간병인",
    writerId: 101,
  },
  {
    careSheetId: 2,
    status: "PENDING",
    memberMeta: {
      memberId: "M002",
      name: "이철수",
      birthDate: "1948-11-22",
      gender: "MALE",
      avatarUrl: "https://via.placeholder.com/48/87CEEB/000000?text=이",
    },
    isAttending: true,
    writerName: "박간병인",
    writerId: 101,
  },
  {
    careSheetId: 3,
    status: "NOT_APPLICABLE",
    memberMeta: {
      memberId: "M003",
      name: "최순자",
      birthDate: "1962-07-08",
      gender: "FEMALE",
      avatarUrl: "https://via.placeholder.com/48/98FB98/000000?text=최",
    },
    isAttending: false,
    writerName: "박간병인",
    writerId: 101,
  },
  {
    careSheetId: 4,
    status: "DONE",
    memberMeta: {
      memberId: "M004",
      name: "박민수",
      birthDate: "1940-12-03",
      gender: "MALE",
      avatarUrl: "https://via.placeholder.com/48/DDA0DD/000000?text=박",
    },
    isAttending: true,
    writerName: "박간병인",
    writerId: 101,
  },
  {
    careSheetId: 5,
    status: "PENDING",
    memberMeta: {
      memberId: "M005",
      name: "정미영",
      birthDate: "1957-05-17",
      gender: "FEMALE",
      avatarUrl: "https://via.placeholder.com/48/F0E68C/000000?text=정",
    },
    isAttending: true,
    writerName: "박간병인",
    writerId: 101,
  },
];

// 빈 상태 테스트용 (개발 시 사용)
export const emptyCareSheetList: TCareSheetListItem[] = [];
