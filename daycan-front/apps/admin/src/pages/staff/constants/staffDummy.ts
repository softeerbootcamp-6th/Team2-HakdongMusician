import Image from "@/assets/images/image.png";

type TStaff = {
  staffId: number;
  centerId: string;
  name: string;
  gender: string;
  staffRole: string;
  birthDate: string;
  phoneNumber: string;
  avatarUrl: string;
};

export const STAFF_DUMMY: TStaff[] = [
  {
    staffId: 123,
    centerId: "CTR11101234",
    name: "홍관리",
    gender: "MALE",
    staffRole: "DIRECTOR",
    birthDate: "1985-03-15",
    phoneNumber: "010-1234-5678",
    avatarUrl: Image,
  },
  {
    staffId: 124,
    centerId: "CTR00001234",
    name: "김사회",
    gender: "FEMALE",
    staffRole: "SOCIAL_WORKER",
    birthDate: "1990-05-20",
    phoneNumber: "010-2345-6789",
    avatarUrl: Image,
  },
  {
    staffId: 125,
    centerId: "CTR00001234",
    name: "이요양",
    gender: "MALE",
    staffRole: "CAREGIVER",
    birthDate: "1988-12-10",
    phoneNumber: "010-3456-7890",
    avatarUrl: Image,
  },
  {
    staffId: 126,
    centerId: "CTR00001234",
    name: "박간호",
    gender: "FEMALE",
    staffRole: "CAREGIVER",
    birthDate: "1992-08-15",
    phoneNumber: "010-4567-8901",
    avatarUrl: Image,
  },
  {
    staffId: 127,
    centerId: "CTR00001234",
    name: "최복지",
    gender: "FEMALE",
    staffRole: "SOCIAL_WORKER",
    birthDate: "1987-11-03",
    phoneNumber: "010-5678-9012",
    avatarUrl: Image,
  },
];
