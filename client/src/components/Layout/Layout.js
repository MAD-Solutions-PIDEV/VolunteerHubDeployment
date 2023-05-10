import React from "react";
import OffCanvasMenu from "../Header/OffCanvasMenu";
import SearchPopup from "../Header/SearchPopup";
import SiteFooter from "../SiteFooter/SiteFooter";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => {
  return (
    <>
      <main id="wrapper" className="animated fadeIn">
        {children}
        <SiteFooter />
      </main>
      <OffCanvasMenu />
      <SearchPopup />
      <ScrollToTop />
    </>
  );
};

export default Layout;
