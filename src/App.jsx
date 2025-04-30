import DefaultLayout from "./components/layout/DefaultLayout";
import SideMenuLayout from "./components/layout/SideMenuLayout";
import MainPage from "./pages/mainPage/MainPage";
import GuidePage from "./pages/guidePage/GuidePage";
import LoginPage from "./pages/authPage/LoginPage";
import RegisterPage from "./pages/authPage/RegisterPage";
import FindPasswordPage from "./pages/authPage/FindPasswordPage";
import ResetPasswordPage from "./pages/authPage/ResetPasswordPage";
import { UserProvider } from "./stores/UserContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
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
      { path: "/calendar", element: <MainPage /> },
      { path: "/cctv", element: <MainPage /> },
      { path: "/guide", element: <GuidePage /> },
      { path: "/mypage", element: <MainPage /> },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
