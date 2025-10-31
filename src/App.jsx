import { UserProvider } from "./stores/UserContext";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./utils/router";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={3}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </UserProvider>
  );
}

export default App;
