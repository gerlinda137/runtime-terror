import { TYPOGRAPHY_VARIANTS, TypographyClasses } from "../shared/constants";

export type SidebarItemType = {
  label: string;
  icon?: string;
  link?: string;
  children?: Pick<SidebarItemType, 'label' | 'link'>[];
};

export type TypographyVariantsType = (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];
export type TypographyClassType = (typeof TypographyClasses)[keyof typeof TypographyClasses];
