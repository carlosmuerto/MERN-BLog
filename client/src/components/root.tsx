import React from "react";
import Header from "./header";
import { Outlet } from "@tanstack/react-router";
import FooterComp from "./footer";

const TanStackRouterDevtools =
  // eslint-disable-next-line no-constant-condition, no-constant-binary-expression
  true || (process.env.NODE_ENV === "production")
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

const Root = () => {
  return (
    <React.Fragment>
      <TanStackRouterDevtools />
      <Header />
      <Outlet />
      <FooterComp />
    </React.Fragment>
  );
};

export default Root;
