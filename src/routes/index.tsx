import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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

function Index() {
  const [active, setActive] = useState(SCREENS[0]);
  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <header className="flex items-center gap-4 border-b border-slate-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a3c5e] text-white font-bold">
            N
          </div>
          <span className="font-bold text-[#1a3c5e]">NeedBridge</span>
        </div>
        <nav className="flex flex-wrap gap-1 ml-4">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                active.id === s.id
                  ? "bg-[#1a3c5e] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </header>
      <iframe
        key={active.id}
        src={active.path}
        title={active.label}
        className="flex-1 w-full border-0 bg-white"
      />
    </div>
  );
}
