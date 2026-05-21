import { THEMES } from "../shared/constants";

export type ThemeType = (typeof THEMES)[keyof typeof THEMES];
