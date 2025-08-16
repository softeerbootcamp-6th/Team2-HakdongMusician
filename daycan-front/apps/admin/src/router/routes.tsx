import { LoginLayout } from "@/layout/login";
import { MainLayout, MobileLayout } from "../layout";
import {
  LoginPage,
  MemberPage,
  MemberRegisterPage,
  CareSheetPage,
  NotFoundPage,
  StaffPage,
  StaffRegisterPage,
  ReportPage,
} from "@/pages";
import {
  HomeFunnelStepContainer,
  InfoFunnelStepContainer,
  DiagnosisFunnelStepContainer,
} from "@/pages/care-sheet/funnels";

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
        element: <CareSheetPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "care-sheet",
        element: <CareSheetPage />,
      },
    ],
  },
  {
    path: "/member",
    layout: <MainLayout />,
    children: [
      // {
      //   path: "",
      //   element: <div>HomePage</div>, // => 여기 Outlet으로 렌더됨
      // },
      {
        path: "",
        element: <MemberPage />,
      },
      {
        path: "new",
        element: <MemberRegisterPage mode="register" />,
      },
      {
        path: "edit/:memberId",
        element: <MemberRegisterPage mode="edit" />,
      },
    ],
  },
  {
    path: "/staff",
    layout: <MainLayout />,
    children: [
      {
        path: "",
        element: <StaffPage />,
      },
      {
        path: "new",
        element: <StaffRegisterPage mode="register" />,
      },
      {
        path: "edit/:staffId",
        element: <StaffRegisterPage mode="edit" />,
      },
    ],
  },
  {
    path: "/report",
    layout: <MainLayout />,
    children: [
      {
        path: "",
        element: <ReportPage />, // => 여기 Outlet으로 렌더됨
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
    path: "/care-sheet/new",
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
      {
        path: "diagnosis",
        element: <DiagnosisFunnelStepContainer />,
      },
    ],
  },
];
