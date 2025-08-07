import type { ReactNode } from "react";
import { filterSearchbarContent } from "./FilterSearchbar.css.ts";

interface FilterSearchbarProps {
  children: ReactNode;
}

export const FilterSearchbar = ({ children }: FilterSearchbarProps) => {
  return <div className={filterSearchbarContent}>{children}</div>;
};
