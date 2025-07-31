import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
// import { style } from '@vanilla-extract/css';
import { COLORS } from '@/styles/colors';
import { style } from '@vanilla-extract/css';

export const segment = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: COLORS.gray[100],
    borderRadius: '110px',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
  },
  variants: {
    variant: {
      default: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      vertical: {
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },
    type: {
      default: {
        maxWidth: '358px',
        maxHeight: '40px',
      },
      compact: {
        maxWidth: '280px',
        maxHeight: '32px',
        backgroundColor: 'transparent',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    type: 'default',
  },
});


export const segmentDivider = style({
    width: '1px',
    height: '24px',
    transition: 'background-color 0.2s ease',
    alignSelf: 'center',
    backgroundColor: COLORS.gray[400],
});

export type SegmentVariants = RecipeVariants<typeof segment>;
