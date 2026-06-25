import { createFileRoute } from "@tanstack/react-router";
import { ReportsScreen } from "../components/screens/ReportsScreen";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [{ title: "Community Reports — NeedBridge" }],
  }),
  component: ReportsScreen,
});
