import type { ReactNode } from "react";
import {
  filterSearchbarContainer,
  filterSearchbarContent,
} from "./FilterSearchbar.css.ts";

interface FilterSearchbarProps {
  children: ReactNode;
}

export const FilterSearchbar = ({ children }: FilterSearchbarProps) => {
  return (
    <div className={filterSearchbarContainer}>
      <div className={filterSearchbarContent}>{children}</div>
    </div>
  );
};
