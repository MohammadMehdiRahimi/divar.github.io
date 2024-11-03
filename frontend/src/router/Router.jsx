import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import { setUser } from "reduxs/slices/user.slice";
import HomePage from "../pages/HomePage";
import api from "config/axios.config";
// import AuthPage from "pages/AuthPage";
// import HomePage from "pages/HomePage";
// import DashboardPage from "pages/DashboardPage";
// import AdminPage from "pages/AdminPage";
// import PageNotFound from "pages/404";
// import { getProfile } from "services/user";
import Loader from "components/Loader";

function Router() {
  const userIn = useSelector((state) => state.user.userIn);
  const dispatch = useDispatch();

  async function authentication(token) {
    try {
      await api.post("/auth/check-token", {
        token,
      });
      dispatch(setUser(true));
    } catch (error) {
      dispatch(setUser(false));
      Cookies.remove("auth");
    }
  }
  useEffect(() => {
    const token = Cookies.get("auth");
    if (token && !userIn) {
      authentication(token);
    }
  }, [userIn]);

  return (
    <>
      {userIn ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      ) : // <Loader />
      null}
    </>
  );
}

export default Router;
