import { HomePage } from "views";

import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
