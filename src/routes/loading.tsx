import { createFileRoute } from "@tanstack/react-router";
import { LoadingScreen } from "../components/screens/LoadingScreen";

export const Route = createFileRoute("/loading")({
  head: () => ({
    meta: [{ title: "Analyzing... — NeedBridge" }],
  }),
  component: LoadingScreen,
});
