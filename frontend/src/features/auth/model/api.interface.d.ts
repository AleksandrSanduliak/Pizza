export interface LoginUseRequestData {
  email: string;
  password: string;
}
export interface LoginUserResponseData {
  email: string;
  name: string;
  bonuses: number;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
