export const TYPOGRAPHY_VARIANTS = {
  heading_1: 'heading-1',
  heading_2: 'heading-2',
  heading_3: 'heading-3',
  heading_4: 'heading-4',
  heading_5: 'heading-5',
  heading_6: 'heading-6',

  display_1: 'display-1',

  double_extra_large_text_semibold: 'double-extra-large-text-semibold',
  double_extra_large_text_regular: 'double-extra-large-text-regular',

  extra_large_text_semibold: 'extra-large-text-semibold',
  extra_large_text_regular: 'extra-large-text-regular',

  large_text_semibold: 'large-text-semibold',
  large_text_regular: 'large-text-regular',

  medium_text_semibold: 'medium-text-semibold',
  medium_text_regular: 'medium-text-regular',

  small_text_semibold: 'small-text-semibold',
  small_text_regular: 'small-text-regular',

  extra_small_text_semibold: 'extra-small-text-semibold',
  extra_small_text_regular: 'extra-small-text-regular',
} as const;
const { heading_1, heading_2, heading_3, heading_4, heading_5, heading_6 } = TYPOGRAPHY_VARIANTS;
export const MAIN_FONT_VARIANT = [heading_1, heading_2, heading_3, heading_4, heading_5, heading_6] as const;

export const TypographyClasses = {
  highlight: 'highlight',
} as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
