import ReactDOM from "react-dom";
import MainPage from "./pages/mainPage/MainPage";
import { UserContext, UserProvider } from "./stores/UserContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <MainPage></MainPage>
    </>
  );
}

export default App;
