import { Route, Routes } from "react-router-dom";
import "./App.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppLayout } from "./components";
import { PageNotFound } from "./pages";
import HomePage from "./pages/HomePage";
import { useUserAuthContext } from "./utils";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ChangePassword from "./pages/Authentication/ChangePassword";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage";

function App() {
  const { currentUser } = useUserAuthContext();

  return (
    <>
      <ToastContainer position="bottom-right" />

      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/authentication" element={<AuthenticationPage />}></Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      {/* </Suspense> */}
    </>
  );
}

export default App;
