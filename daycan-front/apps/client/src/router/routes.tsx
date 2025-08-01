import { ToReportPage, LoginPage, MainPage } from "@/pages";
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
        element: <MainPage />,
      },
      {
        path: "to-report",
        element: <ToReportPage />,
      },
      {
        path: "login",
        element: <LoginPage />, // => 여기 Outlet으로 렌더됨
      },

      {
        path: "*",
        element: <div>NotFound</div>,
      },
    ],
  },
];
