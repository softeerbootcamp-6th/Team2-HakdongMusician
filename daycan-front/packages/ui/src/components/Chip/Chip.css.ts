import {recipe , RecipeVariants} from '@vanilla-extract/recipes';
import {COLORS} from '@/styles/colors';

export const chip = recipe({
  base: {
    fontFamily: 'Pretendard',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: 500,
    borderRadius: '8px',
    color: COLORS.gray[100],
    backgroundColor: COLORS.gray[600],
    fontStyle: 'normal',
    cursor: 'pointer',
    border: 'none',
    boxSizing: 'border-box',    
  },
  variants: {
    // 크기 variant
    padding: {
      btnDefaultPadding: {
        padding: '6px 16px',
        borderRadius: '8px',
      },
      btnXsmall: {
        padding: '4px 10px',
        borderRadius: '4px',
      },
      btnFilterSmall: {
        padding: '6px 16px',
        borderRadius: '8px',
      },
      btnFilterMedium: {
        padding: '4px 10px',
        borderRadius: '8px',
      },
      btnFilterLarge: {
        padding: '12px 24px',
        borderRadius: '13.5px',
      },
      small: {
        padding: '2px 6px',
        borderRadius: '4px',
      },
      medium:{
        padding: '4px 8px',
        borderRadius: '4px',
      },
      mediumLong:{
        padding: '4px 16px',
        borderRadius: '4px',
      },
      reportstatus:{
        padding: '4px 16px',
        borderRadius: '4px',
      }
    },
    size:{
        btnDefault: {
            width:'61px',
            height:'32px',
        },
        btnXsmall:{
            width:'64px',
            height:'28px',
        },
        filterSmall:{
            width:'73px',
            height:'32px',
        },
        filterMedium:{
            width:'71px',
            height:'31px',
        },
        filterLarge:{
            width:'240px',
            height:'56px',
        },
        small:{
            width:'41px',
            height:'24px',
        },
        medium:{
            width:'49x',
            height:'31px',
        },
        mediumLong:{
        },
    },
    flexRule:{
        spaceBetween: {
            justifyContent: 'space-between',
        },
        center: {
            justifyContent: 'center',
            paddingRight: '12px',
        },
        none:{}
    }
  },
  defaultVariants: {
    size: 'btnDefault',
    padding: 'btnDefaultPadding',
    flexRule: 'none',
  }
});

export type ChipVariants = RecipeVariants<typeof chip>;
