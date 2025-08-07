import type { ReactNode } from "react";
import { pageToolbarContent } from "./PageToolbar.css.ts";

interface PageToolbarProps {
  children: ReactNode;
}

export const PageToolbar = ({ children }: PageToolbarProps) => {
  return <div className={pageToolbarContent}>{children}</div>;
};
