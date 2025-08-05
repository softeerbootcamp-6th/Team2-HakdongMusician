import {
  ToDailyReportPage,
  LoginPage,
  MainPage,
  DailyReportPage,
  ReportsPage,
} from "@/pages";
import { MainLayout, MobileLayout } from "@/layout";

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
    layout: <MainLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
    ],
  },
  {
    path: "/",
    layout: <MobileLayout />,
    children: [
      {
        path: "to-daily-report",
        element: <ToDailyReportPage />,
      },
      {
        path: "login",
        element: <LoginPage />, // => 여기 Outlet으로 렌더됨
      },
      {
        path: "daily-report",
        element: <DailyReportPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "*",
        element: <div>NotFound</div>,
      },
    ],
  },
];
