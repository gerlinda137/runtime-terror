import { THEMES } from "../shared/constants";

export interface IUser {
  id: string;
  name: string;
  logo: string;
  mail: string;
};

export interface IAuth { isLoggedIn: boolean; }

export type ThemeType = (typeof THEMES)[keyof typeof THEMES];
