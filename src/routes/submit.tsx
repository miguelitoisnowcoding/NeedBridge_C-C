import { createFileRoute } from "@tanstack/react-router";
import { SubmitScreen } from "../components/screens/SubmitScreen";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [{ title: "Submit a Need — NeedBridge" }],
  }),
  component: SubmitScreen,
});
