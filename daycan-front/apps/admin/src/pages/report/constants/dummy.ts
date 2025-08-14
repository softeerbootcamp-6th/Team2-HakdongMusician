import type { ReportListItemType } from "../components/ReportListItem/ReportListItem";

// 더미 데이터 (실제로는 API에서 가져올 데이터)
export const mockReports: ReportListItemType[] = [
  {
    id: 1,
    memberMetaEntry: {
      memberId: "M001",
      name: "김철수",
      birthDate: "1980-05-15",
      gender: "MALE",
    },
    guardianMetaEntry: {
      guardianName: "김영희",
      guardianContact: "010-1234-5678",
    },
    status: "PENDING",
  },
  {
    id: 2,
    memberMetaEntry: {
      memberId: "M002",
      name: "이영희",
      birthDate: "1975-08-22",
      gender: "FEMALE",
    },
    guardianMetaEntry: {
      guardianName: "이철수",
      guardianContact: "010-2345-6789",
    },
    status: "CREATED",
  },
  {
    id: 3,
    memberMetaEntry: {
      memberId: "M002",
      name: "이영희",
      birthDate: "1975-08-22",
      gender: "FEMALE",
    },
    guardianMetaEntry: {
      guardianName: "이철수",
      guardianContact: "010-2345-6789",
    },
    status: "REVIEWED",
  },

  {
    id: 7,
    memberMetaEntry: {
      memberId: "M007",
      name: "윤민호",
      birthDate: "1988-04-12",
      gender: "MALE",
    },
    guardianMetaEntry: {
      guardianName: "윤영희",
      guardianContact: "010-7890-1234",
    },
    status: "NOT_APPLICABLE",
  },
];

export const mockSendedReports: ReportListItemType[] = [
  {
    id: 4,
    memberMetaEntry: {
      memberId: "M004",
      name: "최지영",
      birthDate: "1970-03-18",
      gender: "FEMALE",
    },
    guardianMetaEntry: {
      guardianName: "최영수",
      guardianContact: "010-4567-8901",
    },
    status: "SENDING",
  },
  {
    id: 5,
    memberMetaEntry: {
      memberId: "M005",
      name: "정현우",
      birthDate: "1982-07-25",
      gender: "MALE",
    },
    guardianMetaEntry: {
      guardianName: "정미영",
      guardianContact: "010-5678-9012",
    },
    status: "RESERVED",
  },
  {
    id: 6,
    memberMetaEntry: {
      memberId: "M006",
      name: "한소영",
      birthDate: "1978-11-08",
      gender: "FEMALE",
    },
    guardianMetaEntry: {
      guardianName: "한철수",
      guardianContact: "010-6789-0123",
    },
    status: "DONE",
  },
];
