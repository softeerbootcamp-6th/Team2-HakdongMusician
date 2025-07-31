import { COLORS } from "@/styles";
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const segmentItem = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3px 10px',
    borderRadius: '20px',
    cursor: 'pointer',
    userSelect: 'none',
    width: '118px',
    height: '32px',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: COLORS.white,
        color: COLORS.gray[800],
      },
      false: {
        backgroundColor: 'transparent',
        color: COLORS.gray[600],
      },
    },
    size:{
        btnXsmall: {
            fontSize: '12px',
            padding: '4px 8px',
        }
    },
    padding: {
      btnXsmall: {
        padding: '4px 8px',
      },
    },
    flexRule: {
      center: {
        justifyContent: 'center',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
    }, 
  },
  defaultVariants: {
    size: 'btnXsmall',
    padding: 'btnXsmall',
    flexRule: 'center',
    selected: false,
  },
});

export type SegmentItemVariants = RecipeVariants<typeof segmentItem>;
