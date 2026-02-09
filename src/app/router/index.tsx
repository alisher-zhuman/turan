import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import { Authentication } from "@/pages/authentication";
import { Layout } from "@/widgets/layout";
import { ROUTES } from "@/shared/constants";
import { ProtectedRoute } from "./ui/protected-route";
import { WithSuspense } from "./ui/with-suspense";

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
  { path: `/${ROUTES.SIGN_IN}`, element: <Authentication /> },
  { path: `/${ROUTES.FORGOT}`, element: <Authentication /> },
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
        path: ROUTES.COMPANIES,
        element: (
          <WithSuspense>
            <Companies />
          </WithSuspense>
        ),
      },
      {
        path: ROUTES.USERS,
        element: (
          <WithSuspense>
            <Users />
          </WithSuspense>
        ),
      },
      {
        path: ROUTES.DEVICES,
        element: (
          <WithSuspense>
            <Devices />
          </WithSuspense>
        ),
      },
      {
        path: ROUTES.GROUPS,
        element: (
          <WithSuspense>
            <Groups />
          </WithSuspense>
        ),
      },
      {
        path: ROUTES.METERS,
        element: (
          <WithSuspense>
            <Meters />
          </WithSuspense>
        ),
      },
      {
        path: ROUTES.READINGS,
        element: (
          <WithSuspense>
            <Readings />
          </WithSuspense>
        ),
      },
      {
        path: ROUTES.WEBHOOKS,
        element: (
          <WithSuspense>
            <Webhooks />
          </WithSuspense>
        ),
      },
    ],
  },
]);
