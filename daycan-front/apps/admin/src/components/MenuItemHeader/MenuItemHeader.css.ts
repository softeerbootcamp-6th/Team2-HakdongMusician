import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { COLORS } from "@daycan/ui";

export const menuItemHeader = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: "8px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: COLORS.gray[800],
      borderRadius: "6px",
    },
  },
  variants: {
    isSelected: {
      true: {
        color: COLORS.primary[300],
      },
      false: {
        color: COLORS.gray[500],
      },
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

export type MenuItemHeaderVariants = RecipeVariants<typeof menuItemHeader>;
