import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import { Authentication } from "@/pages/authentication";
import { ProtectedRoute } from "./ui/protected-route";
import { WithSuspense } from "./ui/with-suspense";
import { Layout } from "../layout";

const Companies = lazy(() => import("@/pages/companies"));
const Users = lazy(() => import("@/pages/users"));
const Devices = lazy(() => import("@/pages/devices"));
const Groups = lazy(() => import("@/pages/groups"));
const Meters = lazy(() => import("@/pages/meters"));
const Readings = lazy(() => import("@/pages/readings"));
const Webhooks = lazy(() => import("@/pages/webhooks"));
const NotFound = lazy(() => import("@/pages/not-found"));

export const ROUTER = createBrowserRouter([
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
]);
