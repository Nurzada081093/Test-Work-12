import React, { PropsWithChildren } from "react";
import ToolBar from "../UI/ToolBar/ToolBar.tsx";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
