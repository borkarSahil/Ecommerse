import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
