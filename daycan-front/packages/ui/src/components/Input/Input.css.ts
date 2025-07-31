import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { COLORS } from '@/styles/colors';

export const input = recipe({
  base: {
    fontFamily: 'Pretendard',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: 500,
    borderRadius: '8px',
    border: `1px solid ${COLORS.gray[200]}`,
    boxSizing: 'border-box',
  },
  variants: {
    variant: {
      pcInputFile: {
        backgroundColor: COLORS.white,
        padding: '12px 24px',
        width: '668px',
        height: '56px',
      },
      moTextField: {
        backgroundColor: COLORS.gray[50],
        padding: '16px 20px',
        width: '358px',
        height: '56px',
      },
      pcTextField: {
        backgroundColor: COLORS.white,
        padding: '0px 12px',
        width: '300px',
        height: '42px',
      },
      pcTextFieldLarge: {
        backgroundColor: COLORS.gray[50],
        padding: '16px 24px',
        width: '532px',
        height: '64px',
      },
      textSearch: {
        backgroundColor: COLORS.white,
        padding: '6px 12px',
        width: '256px',
        height: '40px',
      },
      allTextFieldSmall: {
        backgroundColor: COLORS.white,
        padding: '0px 12px',
        width: '86px',
        height: '32px',
      },
    },
    flexRule: {
      center: {
        justifyContent: 'center',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
      none:{}
    },
  },
  defaultVariants: {
    variant: 'pcTextField',
    flexRule: 'spaceBetween',
  },
});

export type InputVariants = RecipeVariants<typeof input>;
