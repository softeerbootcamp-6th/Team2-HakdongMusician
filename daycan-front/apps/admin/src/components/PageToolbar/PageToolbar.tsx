import type { ReactNode } from "react";
import { pageToolbarContainer, pageToolbarContent } from "./PageToolbar.css.ts";

interface PageToolbarProps {
  children: ReactNode;
}

export const PageToolbar = ({ children }: PageToolbarProps) => {
  return (
    <div className={pageToolbarContainer}>
      <div className={pageToolbarContent}>{children}</div>
    </div>
  );
};
