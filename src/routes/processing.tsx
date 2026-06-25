import { createFileRoute } from "@tanstack/react-router";
import { ProcessingScreen } from "../components/screens/ProcessingScreen";

export const Route = createFileRoute("/processing")({
  head: () => ({
    meta: [{ title: "Processing... — NeedBridge" }],
  }),
  component: ProcessingScreen,
});
