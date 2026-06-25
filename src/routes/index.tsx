import { createFileRoute } from "@tanstack/react-router";
import { HomeScreen } from "../components/screens/HomeScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeedBridge" },
      { name: "description", content: "NeedBridge — bridging community needs with coordinated response." },
      { property: "og:title", content: "NeedBridge" },
      { property: "og:description", content: "Bridging community needs with coordinated response." },
    ],
  }),
  component: HomeScreen,
});
