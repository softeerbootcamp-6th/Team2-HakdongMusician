import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { COLORS } from '@/styles/colors';

export const segment = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: '12px',
    boxSizing: 'border-box',
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
    useChip: {
      true: {
        gap: '8px',
      },
      false: {
        gap: '0px',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    useChip: true,
  },
});

export type SegmentVariants = RecipeVariants<typeof segment>;
