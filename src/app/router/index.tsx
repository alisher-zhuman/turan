import { createBrowserRouter } from "react-router";
import { Suspense, lazy, type ReactNode } from "react";

import { Authentication } from "@/pages/authentication";
import { Loader } from "@/shared/ui/loader";
import { Layout } from "../layout";
import { ProtectedRoute } from "./protected";

const Companies = lazy(() => import("@/pages/companies"));
const Users = lazy(() => import("@/pages/users"));
const Devices = lazy(() => import("@/pages/devices"));
const Groups = lazy(() => import("@/pages/groups"));
const Meters = lazy(() => import("@/pages/meters"));
const Readings = lazy(() => import("@/pages/readings"));
const Webhooks = lazy(() => import("@/pages/webhooks"));
const NotFound = lazy(() => import("@/pages/not-found"));

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<Loader />}>{element}</Suspense>
);

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "companies", element: withSuspense(<Companies />) },
      { path: "users", element: withSuspense(<Users />) },
      { path: "devices", element: withSuspense(<Devices />) },
      { path: "groups", element: withSuspense(<Groups />) },
      { path: "meters", element: withSuspense(<Meters />) },
      { path: "readings", element: withSuspense(<Readings />) },
      { path: "webhooks", element: withSuspense(<Webhooks />) },
    ],
  },
  { path: "/sign-in", element: <Authentication /> },
  { path: "/sign-in/forgot", element: <Authentication /> },
  { path: "*", element: withSuspense(<NotFound />) },
]);
