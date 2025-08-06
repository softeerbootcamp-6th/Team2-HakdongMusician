import { LoginLayout } from "@/layout/login";
import { MainLayout, ReportLayout, MobileLayout } from "../layout";
import { LoginPage } from "@/pages";
import {
  HomeFunnelStepContainer,
  InfoFunnelStepContainer,
} from "@/pages/care-sheet/funnels";
import { MainLayout, ReportLayout } from "../layout";
import { LoginPage, ElderPage } from "../pages";

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
      {
        path: "elders",
        element: <ElderPage />,
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
  {
    path: "/care-sheet",
    layout: <MobileLayout />,
    children: [
      {
        path: "",
        element: <HomeFunnelStepContainer />,
      },
      {
        path: "info",
        element: <InfoFunnelStepContainer />,
      },
    ],
  },
];
