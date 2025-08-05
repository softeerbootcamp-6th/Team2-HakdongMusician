import {
  ToDailyReportPage,
  LoginPage,
  MainPage,
  DailyReportPage,
  ReportsPage,
  StatisticsPage,
} from "@/pages";
import { MainLayout, MobileLayout, LoginLayout } from "@/layout";

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
        path: "daily-report",
        element: <DailyReportPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "statistics",
        element: <StatisticsPage />,
      },
      {
        path: "*",
        element: <div>NotFound</div>,
      },
    ],
  },
  {
    path: "/login",
    layout: <LoginLayout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
];
