import ReactDOM from "react-dom";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import FindPasswordPage from "./pages/findPasswordPage/FindPasswordPage";
import { UserProvider } from "./stores/UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetPasswordPage from "./pages/resetPasswordPage/ResetPasswordPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/calendar" element={<MainPage />}></Route>
            <Route path="/cctv" element={<MainPage />}></Route>
            <Route path="/guide" element={<MainPage />}></Route>
            <Route path="/mypage" element={<MainPage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/findpassword" element={<FindPasswordPage />}></Route>
          <Route path="/resetpassword" element={<ResetPasswordPage />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
