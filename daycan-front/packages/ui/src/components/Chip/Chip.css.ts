import {recipe , RecipeVariants} from '@vanilla-extract/recipes';
import {COLORS} from '@/styles/colors';
import { b } from 'node_modules/vite/dist/node/types.d-jgA8ss1A';

export const chip = recipe({
  base: {
    fontFamily: 'Pretendard',
    display: 'inline-flex',
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
    // 색상/스타일 variant
    color: {
      default: {
        backgroundColor: COLORS.gray[600],
      },
      primary: {
        backgroundColor: COLORS.gray[500],
      },
      secondary: {
        backgroundColor: COLORS.white,
      },
      selected: {
        backgroundColor: COLORS.gray[50],
      },
      unselected: {
        backgroundColor: COLORS.white,
      },
      yellow_200: {
        backgroundColor: COLORS.yellow[200],
      },
      blue_200: {
        backgroundColor: COLORS.blue[200],
      },
      red_200: {
        backgroundColor: COLORS.red[200],
      },
      green_200: {
        backgroundColor: COLORS.green[200],
      },
      gray_200: {
        backgroundColor: COLORS.gray[200],
      },
      gray_600: {
        backgroundColor: COLORS.gray[600],
      },
      red_500: {
        backgroundColor: COLORS.red[500],
      },
      blue_500: {
        backgroundColor: COLORS.blue[500],
      },
      green_500: {
        backgroundColor: COLORS.green[500],
      },

      transparent: {
        backgroundColor: 'transparent',
        color: '#374151',
        border: '1px solid #e5e7eb',
        boxShadow: 'none',
      }
    },
    // 크기 variant
    padding: {
      btn_de: {
        padding: '6px 16px',
        borderRadius: '8px',
      },
      btn_xs: {
        padding: '4px 10px',
        borderRadius: '4px',
      },
      btn_filter_s: {
        padding: '6px 16px',
        borderRadius: '8px',
      },
      btn_filter_m: {
        padding: '4px 10px',
        borderRadius: '8px',
      },
      btn_filter_l: {
        padding: '12px 24px',
        borderRadius: '13.5px',
      },
      s: {
        padding: '2px 6px',
        borderRadius: '4px',
      },
      m:{
        padding: '4px 8px',
        borderRadius: '4px',
      },
      ml:{
        padding: '4px 16px',
        borderRadius: '4px',
      },
      reportstatus:{
        padding: '4px 16px',
        borderRadius: '4px',
      }

      
    },
    size:{
        btn_default: {
            width:'61px',
            height:'32px',
        },
        btn_xsmall:{
            width:'64px',
            height:'28px',
        },
        filter_small:{
            width:'73px',
            height:'32px',
        },
        filter_medium:{
            width:'71px',
            height:'31px',
        },
        filter_large:{
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
        medium_long:{
        },


    }
  },
  defaultVariants: {
    color: 'default',
    size: 'btn_default',
    padding: 'btn_de',
  }
});

export type ChipVariants = RecipeVariants<typeof chip>;
