import { TYPOGRAPHY_VARIANTS, TypographyClasses } from "../shared/constants";

export interface ISidebarItem {
  label: string;
  icon?: string;
  link?: string;
  children?: Pick<ISidebarItem, 'label' | 'link'>[];
};

export type TypographyVariantsType = (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];
export type TypographyClassType = (typeof TypographyClasses)[keyof typeof TypographyClasses];
