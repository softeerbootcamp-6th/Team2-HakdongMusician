import { LoginLayout } from "@/layout/login/LoginLayout";
import { MainLayout, ReportLayout } from "../layout";
import { LoginPage } from "../pages";

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
        element: <div>HomePage</div>, // => 여기 Outlet으로 렌더됨
      },
    ],
  },
  {
    path: "/report",
    layout: <ReportLayout />,
    children: [
      {
        path: "",
        element: <div>ReportPage</div>, // => 여기 Outlet으로 렌더됨
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
