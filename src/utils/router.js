import { createBrowserRouter } from "react-router-dom";

const DefaultLayout = lazy(() => import("../components/layout/DefaultLayout"));
const SideMenuLayout = lazy(() =>
  import("../components/layout/SideMenuLayout")
);
const MainPage = lazy(() => import("../pages/mainPage/MainPage"));
const TutorialPage = lazy(() => import("../pages/tutorialPage/TutorialPage"));
const GuidePage = lazy(() => import("../pages/guidePage/GuidePage"));
const CalendarPage = lazy(() => import("../pages/calendarPage/CalendarPage"));
const CctvPage = lazy(() => import("../pages/cctvPage/CctvPage"));
const CctvEditPage = lazy(() => import("../pages/cctvPage/CctvEditPage"));
const MyPage = lazy(() => import("../pages/myPage/MyPage"));
const UserConfirmPage = lazy(() => import("../pages/myPage/UserConfirmPage"));
const UserEditPage = lazy(() => import("../pages/myPage/UserEditPage"));
const LoginPage = lazy(() => import("../pages/authPage/LoginPage"));
const RegisterPage = lazy(() => import("../pages/authPage/RegisterPage"));
const FindPasswordPage = lazy(() =>
  import("../pages/authPage/FindPasswordPage")
);
const ResetPasswordPage = lazy(() =>
  import("../pages/authPage/ResetPasswordPage")
);

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },

      {
        path: "/find-password",
        element: <FindPasswordPage />,
      },

      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    element: <SideMenuLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/tutorial", element: <TutorialPage /> },
      { path: "/calendar", element: <CalendarPage /> },
      { path: "/cctv", element: <CctvPage /> },
      { path: "/cctv/edit", element: <CctvEditPage /> },
      { path: "/cctv/add", element: <CctvEditPage /> },
      { path: "/guide", element: <GuidePage /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/mypage/edit", element: <UserEditPage /> },
      { path: "/mypage/withdraw", element: <UserConfirmPage /> },
    ],
  },
]);
