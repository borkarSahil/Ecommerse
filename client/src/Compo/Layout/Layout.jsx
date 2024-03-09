import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div>
      <Navigation />
      <main className="py-3">
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
