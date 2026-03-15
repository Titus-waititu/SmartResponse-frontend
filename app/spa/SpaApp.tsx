"use client";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

export default function SpaApp() {
  return <RouterProvider router={router} />;
}
