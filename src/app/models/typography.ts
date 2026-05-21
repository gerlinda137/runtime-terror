import { TYPOGRAPHY_VARIANTS } from '../shared/constants';




export type TypographyVariantsType = (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];
export type TypographyClassType = TypographyVariantsType;
