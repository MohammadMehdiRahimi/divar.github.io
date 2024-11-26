import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setIsSmall } from "reduxs/slices/smallSize.slic";

function Layout({ children }) {
  /* ---------------------------------- hooks --------------------------------- */
  const { userIn } = useSelector((state) => state.user);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white dark:bg-[#242424] flex gap-3">
        {userIn && <SideBar />}
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
