import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";

import {
  setUserIn,
  setUserId,
  setUserBookmarks,
} from "reduxs/slices/user.slice";
import HomePage from "../pages/HomePage/HomePage.jsx";
import api from "config/axios.config.js";

import CreateAds from "pages/createAds/CreateAds";
import SinglePage from "pages/adsSinglePage/SinglePage.jsx";
import BookmarksPage from "pages/bookmarks/BookmarksPage.jsx";
import MyAdsPage from "pages/myAds/MyAdsPage.jsx";
import RecentlyPage from "pages/recentlyPage/RecentlyPage.jsx";

function Router() {
  const userIn = useSelector((state) => state.user.userIn);
  const dispatch = useDispatch();
  async function authentication(token) {
    try {
      const { data } = await api.post("/auth/check-token", null, {
        headers: { Authorization: token },
      });
      dispatch(setUserBookmarks({ adsId: data.bookmarks }));
      dispatch(setUserId(data.id));
      dispatch(setUserIn(true));
    } catch (error) {
      console.log(error);
      dispatch(setUserIn(false));
      Cookies.remove("Authorization");
      localStorage.removeItem("Authorization");
    }
  }
  useEffect(() => {
    const token =
      Cookies.get("Authorization") ?? localStorage.getItem("Authorization");
    if (token) {
      authentication(token);
    }
  }, [userIn]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ads/single" element={<SinglePage />} />
        {userIn && (
          <>
            <Route path="/ads/create" element={<CreateAds />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/my-ads" element={<MyAdsPage />} />
            <Route path="/recently-viewed" element={<RecentlyPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default Router;
