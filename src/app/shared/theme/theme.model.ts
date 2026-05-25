import { THEMES } from './theme.constant';

export type ThemeType = (typeof THEMES)[keyof typeof THEMES];
