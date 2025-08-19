export type TLoginRequest = {
  username: string;
  password: string;
  userType: "MEMBER" | "CENTER";
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
};
