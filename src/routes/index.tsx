import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeedBridge" },
      { name: "description", content: "NeedBridge — bridging community needs with coordinated response." },
      { property: "og:title", content: "NeedBridge" },
      { property: "og:description", content: "Bridging community needs with coordinated response." },
    ],
  }),
  component: Index,
});

const SCREENS = [
  { id: 1, label: "Home", path: "/screens/1.html" },
  { id: 6, label: "Submit a Need", path: "/screens/6.html" },
  { id: 7, label: "Processing", path: "/screens/7.html" },
  { id: 4, label: "Loading", path: "/screens/4.html" },
  { id: 2, label: "Community Reports", path: "/screens/2.html" },
  { id: 5, label: "AI Response", path: "/screens/5.html" },
  { id: 3, label: "Coordinator Dashboard", path: "/screens/3.html" },
];

const TARGET_TO_ID: Record<string, number> = {
  home: 1,
  submit: 6,
  processing: 7,
  loading: 4,
  reports: 2,
  ai: 5,
  dashboard: 3,
};

function Index() {
  const [active, setActive] = useState(SCREENS[0]);

  useEffect(() => {
    function onMsg(e: MessageEvent) {
      const data = e.data as { type?: string; target?: string } | undefined;
      if (!data || data.type !== "nb-nav" || !data.target) return;
      const id = TARGET_TO_ID[data.target];
      const next = SCREENS.find((s) => s.id === id);
      if (next) setActive(next);
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-white">
      <iframe
        key={active.id}
        src={active.path}
        title={active.label}
        className="flex-1 w-full border-0 bg-white"
      />
    </div>
  );
}
