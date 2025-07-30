import { TypoTest } from "@/pages/TypoTest";
import { MobileLayout } from "../layout";

export type TRoutes = {
  path: string;
  layout: React.ReactNode;
  children: {
    path: string;
    element: React.ReactNode;
  }[];
  isCheckAuth?: boolean;
};

export const routes: TRoutes[] = [
  {
    path: "/",
    layout: <MobileLayout />,
    children: [
      {
        path: "",
        element: <div>HomePage</div>, // => 여기 Outlet으로 렌더됨
      },
      {
        path: "test",
        element: <TypoTest />,
      },
      {
        path: "*",
        element: <div>NotFound</div>,
      },
    ],
  },
];
