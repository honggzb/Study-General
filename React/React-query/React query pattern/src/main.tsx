import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Pattern1 from "./patterns/01-simple-queries";
import Pattern2 from "./patterns/02-custom-queries";
import Pattern3 from "./patterns/03-selectors";
import Pattern4 from "./patterns/04-parameterized-queries";
import Pattern6 from "./patterns/05-pagination";
import Pattern5 from "./patterns/06-disabling-queries";
import Pattern7 from "./patterns/07-prefetching";
import Pattern8 from "./patterns/08-infinite-queries";
import Pattern9 from "./patterns/09-query-key-factories";
import Pattern10 from "./patterns/10-simple-mutations";
import Pattern11 from "./patterns/11-query-invalidation";
import Pattern12 from "./patterns/12-automatic-query-invalidation";
import Pattern13 from "./patterns/13-global-error-handling";
import Pattern14 from "./patterns/14-optimistic-updates-in-ui";
import Pattern15 from "./patterns/15-optimistic-updates-in-cache";
import Pattern16 from "./patterns/16-suspense-queries";
import { Patterns } from "./patterns/Patterns";

const rootRoute = createRootRoute({
  component: Outlet,
});
const indexRoute = createRoute({
  path: "/",
  component: Patterns,
  getParentRoute: () => rootRoute,
});
const pattern1 = createRoute({
  path: "/01-simple-queries",
  getParentRoute: () => rootRoute,
  component: Pattern1,
});
const pattern2 = createRoute({
  path: "/02-custom-queries",
  getParentRoute: () => rootRoute,
  component: Pattern2,
});
const pattern3 = createRoute({
  path: "/03-selectors",
  getParentRoute: () => rootRoute,
  component: Pattern3,
});
const pattern4 = createRoute({
  path: "/04-parameterized-queries",
  getParentRoute: () => rootRoute,
  component: Pattern4,
});
const pattern5 = createRoute({
  path: "/05-pagination",
  getParentRoute: () => rootRoute,
  component: Pattern6,
});
const pattern6 = createRoute({
  path: "/06-disabling-queries",
  getParentRoute: () => rootRoute,
  component: Pattern5,
});
const pattern7 = createRoute({
  path: "/07-prefetching",
  getParentRoute: () => rootRoute,
  component: Pattern7,
});
const pattern8 = createRoute({
  path: "/08-infinite-queries",
  getParentRoute: () => rootRoute,
  component: Pattern8,
});
const pattern9 = createRoute({
  path: "/09-query-key-factories",
  getParentRoute: () => rootRoute,
  component: Pattern9,
});
const pattern10 = createRoute({
  path: "/10-simple-mutations",
  getParentRoute: () => rootRoute,
  component: Pattern10,
});
const pattern11 = createRoute({
  path: "/11-query-invalidation",
  getParentRoute: () => rootRoute,
  component: Pattern11,
});
const pattern12 = createRoute({
  path: "/12-automatic-query-invalidation",
  getParentRoute: () => rootRoute,
  component: Pattern12,
});
const pattern13 = createRoute({
  path: "/13-global-error-handling",
  getParentRoute: () => rootRoute,
  component: Pattern13,
});
const pattern14 = createRoute({
  path: "/14-optimistic-updates-in-ui",
  getParentRoute: () => rootRoute,
  component: Pattern14,
});
const pattern15 = createRoute({
  path: "/15-optimistic-updates-in-cache",
  getParentRoute: () => rootRoute,
  component: Pattern15,
});
const pattern16 = createRoute({
  path: "/16-suspense-queries",
  getParentRoute: () => rootRoute,
  component: Pattern16,
});
const routeTree = rootRoute.addChildren([
  indexRoute,
  pattern1,
  pattern2,
  pattern3,
  pattern4,
  pattern5,
  pattern6,
  pattern7,
  pattern8,
  pattern9,
  pattern10,
  pattern11,
  pattern12,
  pattern13,
  pattern14,
  pattern15,
  pattern16,
]);

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider forceColorScheme="dark">
        <Notifications />
        <RouterProvider router={router} />
      </MantineProvider>
    </StrictMode>
  );
}
