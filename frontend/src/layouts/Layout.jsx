import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";


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
