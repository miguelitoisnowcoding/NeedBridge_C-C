import { useState } from "react";
import { PageLayout } from "../layout/PageLayout";

const TABLE_ROWS = [
  {
    id: 1,
    title: "Clogged drainage on Rizal St.",
    type: "Water",
    severity: "High",
    severityColor: "#C62828",
    severityBg: "bg-red-100",
    date: "Oct 24, 2024",
    status: "Open",
    statusColor: "#C62828",
    statusBg: "bg-red-100",
  },
  {
    id: 2,
    title: "Broken streetlight near plaza",
    type: "Infrastructure",
    severity: "Medium",
    severityColor: "#F9A825",
    severityBg: "bg-amber-100",
    date: "Oct 23, 2024",
    status: "In Progress",
    statusColor: "#E24B4A",
    statusBg: "bg-amber-100",
  },
  {
    id: 3,
    title: "Deep pothole on Mabini Ave",
    type: "Infrastructure",
    severity: "High",
    severityColor: "#C62828",
    severityBg: "bg-red-100",
    date: "Oct 22, 2024",
    status: "Resolved",
    statusColor: "#185FA5",
    statusBg: "bg-green-100",
  },
];

const SIDEBAR_ITEMS = [
  { label: "Overview", icon: "dashboard", active: true },
  { label: "Incident Map", icon: "map", active: false },
  { label: "AI Insights", icon: "psychology", active: false },
  { label: "Resource Allocation", icon: "conveyor_belt", active: false },
];

export function DashboardScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === "coordinator@needbridge.ph" && password === "needbridge2026") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "#F5F7FA" }}>
        <form
          onSubmit={handleLogin}
          className="w-[380px] max-w-[90%] rounded-2xl border border-gray-100 bg-white p-9 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          style={{ borderTop: "6px solid #E24B4A" }}
        >
          <h2 className="mb-1.5 text-[22px] font-bold" style={{ color: "#185FA5" }}>
            Coordinator Sign In
          </h2>
          <p className="mb-5 text-sm text-gray-500">Access restricted to authorized barangay coordinators.</p>

          <label className="mb-1.5 block text-[13px] font-semibold" style={{ color: "#185FA5" }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="coordinator@needbridge.ph"
            className="mb-3.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          />

          <label className="mb-1.5 block text-[13px] font-semibold" style={{ color: "#185FA5" }}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          />

          {error && (
            <div className="mb-2.5 text-[13px]" style={{ color: "#C62828" }}>
              Invalid credentials.
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg py-3 text-[15px] font-bold text-white"
            style={{ background: "#E24B4A" }}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="flex h-screen flex-col overflow-hidden" style={{ background: "#F5F7FA" }}>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-gray-200 py-8 md:flex" style={{ background: "#0C447C" }}>
            <div className="mb-8 flex items-center gap-3 px-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full" style={{ background: "#185FA5" }}>
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white line-clamp-1">Barangay Coordinator</h2>
                <p className="text-xs text-white/70">District IV HQ</p>
              </div>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-3">
              {SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-3 rounded-r-xl border-l-4 px-3 py-2.5 text-sm transition-all ${
                    item.active
                      ? "border-[#E24B4A] font-bold text-white"
                      : "border-transparent text-white/70 hover:bg-white/10"
                  }`}
                >
                  <span className="text-[20px]">{item.label === "Overview" ? "📊" : item.label === "Incident Map" ? "🗺️" : item.label === "AI Insights" ? "🧠" : "📦"}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4 px-6 pb-4">
              <button
                onClick={() => window.print()}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
                style={{ background: "#E24B4A" }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                Generate Report
              </button>
              <div className="flex flex-col gap-1 border-t border-white/20 pt-4">
                <span className="flex items-center gap-3 py-2 text-sm text-white/70 transition-colors hover:text-white cursor-pointer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  Support
                </span>
                <span className="flex items-center gap-3 py-2 text-sm text-white/70 transition-colors hover:text-white cursor-pointer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 19c-1.1-.9-2-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                  Archive
                </span>
                <span className="flex items-center gap-3 py-2 text-sm text-white/70 transition-colors hover:text-white cursor-pointer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L5.09 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                  </svg>
                  Settings
                </span>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex flex-1 flex-col overflow-hidden" style={{ background: "#F5F7FA" }}>
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <div className="mb-2 flex items-center justify-between">
                  <h1 className="text-2xl font-bold" style={{ color: "#185FA5" }}>
                    Overview Dashboard
                  </h1>
                </div>

                {/* Stats Row */}
                <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  <div className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm" style={{ borderTop: "4px solid #185FA5" }}>
                    <div className="flex items-center gap-2" style={{ color: "#185FA5" }}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">Total Reports</span>
                    </div>
                    <div className="text-[42px] font-bold leading-none" style={{ color: "#185FA5" }}>
                      124
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm" style={{ borderTop: "4px solid #C62828" }}>
                    <div className="flex items-center gap-2" style={{ color: "#C62828" }}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">High Severity</span>
                    </div>
                    <div className="text-[42px] font-bold leading-none" style={{ color: "#185FA5" }}>
                      18
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm" style={{ borderTop: "4px solid #E24B4A" }}>
                    <div className="flex items-center gap-2" style={{ color: "#E24B4A" }}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">In Progress</span>
                    </div>
                    <div className="text-[42px] font-bold leading-none" style={{ color: "#185FA5" }}>
                      42
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm" style={{ borderTop: "4px solid #185FA5" }}>
                    <div className="flex items-center gap-2" style={{ color: "#185FA5" }}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">Resolved</span>
                    </div>
                    <div className="text-[42px] font-bold leading-none" style={{ color: "#185FA5" }}>
                      64
                    </div>
                  </div>
                </section>

                {/* Alert Banner */}
                <div className="flex items-center justify-between gap-4 rounded-xl p-4 shadow-sm text-white" style={{ background: "#E24B4A" }}>
                  <div className="flex items-center gap-3">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                    <p className="text-[15px] font-bold">
                      Pattern detected: 3 similar drainage reports in Barangay San Isidro this week.
                    </p>
                  </div>
                  <button className="shrink-0 rounded-lg border border-white/30 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/20">
                    View
                  </button>
                </div>

                {/* Submissions Table */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold" style={{ color: "#185FA5" }}>Recent Submissions</h2>
                  <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    {/* Table Header */}
                    <div className="hidden grid-cols-[80px_1fr_140px_120px_120px_120px] gap-4 border-b border-gray-200 bg-gray-50 p-4 text-xs font-bold uppercase tracking-wider text-gray-500 md:grid">
                      <div className="text-center">Photo</div>
                      <div>Description</div>
                      <div>Type</div>
                      <div>Severity</div>
                      <div>Date</div>
                      <div>Status</div>
                    </div>
                    {/* Table Body */}
                    <div className="flex flex-col">
                      {TABLE_ROWS.map((row, idx) => (
                        <div
                          key={row.id}
                          className={`grid grid-cols-1 items-center gap-4 border-b border-gray-100 p-4 transition-colors hover:bg-blue-50 md:grid-cols-[80px_1fr_140px_120px_120px_120px] ${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100 md:flex">
                            <svg className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1 overflow-hidden">
                            <span className="truncate text-base font-medium text-gray-900">{row.title}</span>
                            <span className="text-xs text-gray-500 md:hidden">{row.date}</span>
                          </div>
                          <div>
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                              <span>{row.type === "Water" ? "💧" : "⚡"}</span>
                              {row.type}
                            </span>
                          </div>
                          <div>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-[13px] font-bold uppercase tracking-widest border ${row.severityBg}`}
                              style={{ color: row.severityColor, borderColor: row.severityColor + "30" }}
                            >
                              {row.severity}
                            </span>
                          </div>
                          <div className="hidden text-sm text-gray-600 md:block">{row.date}</div>
                          <div>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-sm font-bold border ${row.statusBg}`}
                              style={{ color: row.statusColor, borderColor: row.statusColor + "30" }}
                            >
                              {row.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageLayout>
  );
}
