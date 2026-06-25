import { createFileRoute } from "@tanstack/react-router";
import { AIScreen } from "../components/screens/AIScreen";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [{ title: "AI Response — NeedBridge" }],
  }),
  component: AIScreen,
});
