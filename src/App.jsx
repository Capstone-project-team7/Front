import ReactDOM from "react-dom";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import { UserContext, UserProvider } from "./stores/UserContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      {/* <MainPage></MainPage> */}
      {/* <LoginPage></LoginPage> */}
      <RegisterPage></RegisterPage>
    </>
  );
}

export default App;
