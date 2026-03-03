import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const CommonLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default CommonLayout;
