import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "@daycan/ui";

export const itemsContainer = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflowY: "scroll",
    padding: "0px 8px 0px 16px",
    backgroundColor: COLORS.white,
    borderRadius: "8px",
    marginTop: "8px",
  },
  variants: {
    height: {
      large: {
        height: "500px",
      },
      small: {
        height: "200px",
      },
    },
  },
  defaultVariants: {
    height: "large",
  },
});
