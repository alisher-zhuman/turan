import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import { Authentication } from "@/pages/authentication";
import { ProtectedRoute } from "./ui/protected-route";
import { WithSuspense } from "./ui/with-suspense";
import { Layout } from "../layout";

const Companies = lazy(() =>
  import("@/pages/companies").then((m) => ({ default: m.Companies })),
);
const Users = lazy(() =>
  import("@/pages/users").then((m) => ({ default: m.Users })),
);
const Devices = lazy(() =>
  import("@/pages/devices").then((m) => ({ default: m.Devices })),
);
const Groups = lazy(() =>
  import("@/pages/groups").then((m) => ({ default: m.Groups })),
);
const Meters = lazy(() =>
  import("@/pages/meters").then((m) => ({ default: m.Meters })),
);
const Readings = lazy(() =>
  import("@/pages/readings").then((m) => ({ default: m.Readings })),
);
const Webhooks = lazy(() =>
  import("@/pages/webhooks").then((m) => ({ default: m.Webhooks })),
);
const NotFound = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFound })),
);

export const ROUTER = createBrowserRouter([
  { path: "/sign-in", element: <Authentication /> },
  { path: "/sign-in/forgot", element: <Authentication /> },
  {
    path: "*",
    element: (
      <WithSuspense>
        <NotFound />
      </WithSuspense>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "companies",
        element: (
          <WithSuspense>
            <Companies />
          </WithSuspense>
        ),
      },
      {
        path: "users",
        element: (
          <WithSuspense>
            <Users />
          </WithSuspense>
        ),
      },
      {
        path: "devices",
        element: (
          <WithSuspense>
            <Devices />
          </WithSuspense>
        ),
      },
      {
        path: "groups",
        element: (
          <WithSuspense>
            <Groups />
          </WithSuspense>
        ),
      },
      {
        path: "meters",
        element: (
          <WithSuspense>
            <Meters />
          </WithSuspense>
        ),
      },
      {
        path: "readings",
        element: (
          <WithSuspense>
            <Readings />
          </WithSuspense>
        ),
      },
      {
        path: "webhooks",
        element: (
          <WithSuspense>
            <Webhooks />
          </WithSuspense>
        ),
      },
    ],
  },
]);
