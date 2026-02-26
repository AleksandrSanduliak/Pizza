export interface AuthData {
  email: string | null;
  name: string | null;
  bonuses: number;
  tokens: {
    accessToken: string | null;
  };
  isAuth: boolean;
}
