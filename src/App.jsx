import ReactDOM from "react-dom";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import FindPasswordPage from "./pages/findPasswordPage/FindPasswordPage";
import { UserContext, UserProvider } from "./stores/UserContext";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
