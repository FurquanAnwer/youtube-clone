import React from "react";
import Head from "./Head";
import Body from "./Body";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Head />
      <Body>
        <Outlet />
      </Body>
    </div>
  );
};

export default Layout;

