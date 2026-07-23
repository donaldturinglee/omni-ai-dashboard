import type { RouteObject } from "react-router-dom";

import { routePaths } from "@/router/routes";

export const routes: RouteObject[] = [
  {
    path: routePaths.home,
    lazy: async () => {
      const { Dashboard } = await import("@/features/dashboard/Dashboard");

      return { Component: Dashboard };
    },
  },
  {
    path: routePaths.signIn,
    lazy: async () => {
      const { Signin } = await import("@/features/auth/Signin");

      return { Component: Signin };
    },
  },
  {
    path: routePaths.notFound,
    lazy: async () => {
      const { NotFound } = await import("@/features/errors/NotFound");

      return { Component: NotFound };
    },
  },
];
