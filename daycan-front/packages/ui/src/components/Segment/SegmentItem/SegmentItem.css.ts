import { COLORS } from "@/styles";
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

const defaultSelected = {
  backgroundColor: COLORS.white,
  color: COLORS.gray[800],
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const defaultUnselected = {
  backgroundColor: 'transparent',
  color: COLORS.gray[600],
};

const compactSelected = {
  backgroundColor: COLORS.gray[600],
  color: COLORS.white,
};

const compactUnselected = {
  backgroundColor: COLORS.gray[50],
  color: COLORS.gray[500],
};


export const segmentItem = recipe({
  base: {
    display: 'flex',
    margin: '3px',
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3px 10px',
    borderRadius: '20px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.2s ease',
  },
  variants: {
    type: {
      default: {
        width: '118px',
        height: '32px',
      },
      compact: {
        width: '64px',
        height: '28px',
        fontSize: '13px',
        borderRadius: '8px',
      },
    },
    selected: {
      true: {},
      false: {},
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
  compoundVariants: [
    { variants: { type: 'default', selected: true }, style: defaultSelected },
    { variants: { type: 'default', selected: false }, style: defaultUnselected },
    { variants: { type: 'compact', selected: true }, style: compactSelected },
    { variants: { type: 'compact', selected: false }, style: compactUnselected },
  ],
  defaultVariants: {
    type: 'default',
    flexRule: 'center',
    selected: false,
  },
});

export type SegmentItemVariants = RecipeVariants<typeof segmentItem>;
