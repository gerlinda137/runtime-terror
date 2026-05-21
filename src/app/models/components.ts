import { TYPOGRAPHY_VARIANTS } from '../shared/constants';

export interface SidebarItem {
  label: string;
  icon?: string;
  link?: string;
  children?: Pick<SidebarItem, 'label' | 'link'>[];
}

export interface CryptoToken {
  name: string;
  symbol: string;
  lastPrice: number;
  change24hour: number;
}

export type TypographyVariantsType = (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];
export type TypographyClassType = TypographyVariantsType;
