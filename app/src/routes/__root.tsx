import { Suspense, lazy } from "react";

import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-4 bg-primary-100/40 p-3 text-primary-700">
        <Link to="/" className="hover:text-primary-800 [&.active]:font-bold">
          Account transactions
        </Link>
        <Link
          to="/thank-you"
          className="hover:text-primary [&.active]:font-bold"
        >
          Thank you!
        </Link>
      </div>
      <div className="p-3">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});

const TanStackRouterDevtoolsLazy = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

const TanStackRouterDevtools = () => (
  <Suspense>
    <TanStackRouterDevtoolsLazy />
  </Suspense>
);
