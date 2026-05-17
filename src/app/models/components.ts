import { TYPOGRAPHY_VARIANTS, TypographyClasses } from '../shared/constants';

export interface ISidebarItem {
  label: string;
  icon?: string;
  link?: string;
  children?: Pick<ISidebarItem, 'label' | 'link'>[];
}

export interface ICryptoToken {
  icon: string;
  name: string;
  symbol: string;
  lastPrice: number;
  change24hour: number;
}

export type TypographyVariantsType = (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];
export type TypographyClassType = (typeof TypographyClasses)[keyof typeof TypographyClasses];
