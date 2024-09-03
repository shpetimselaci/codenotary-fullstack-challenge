import { HomePage } from "~/views/index";

import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
