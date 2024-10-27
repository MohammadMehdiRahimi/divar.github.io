import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
