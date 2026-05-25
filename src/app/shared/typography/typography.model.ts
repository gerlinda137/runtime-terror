import { TYPOGRAPHY_VARIANTS } from './typography.constant';




export type TypographyVariantsType = (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];
export type TypographyClassType = TypographyVariantsType;
