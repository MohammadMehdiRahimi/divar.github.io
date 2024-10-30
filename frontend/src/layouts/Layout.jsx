import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-[#242424]">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
