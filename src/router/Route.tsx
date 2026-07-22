import type { RouteObject } from "react-router-dom";

import { routePaths } from "@/router/routes";

export const routes: RouteObject[] = [
  {
    path: routePaths.notFound,
    lazy: async () => {
      const { NotFound } = await import("@/features/errors/NotFound");

      return { Component: NotFound };
    },
  },
];
