import { Thankyou } from "~/views";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/thank-you")({
  component: Thankyou,
});
