import { useState } from "react";
import { PageLayout } from "../layout/PageLayout";
import { MOCK_SUBMISSIONS, MOCK_STATS, type MockSubmission } from "@/lib/mockData";

const SIDEBAR_ITEMS = [
  { label: "Overview", icon: "📊" },
  { label: "Incident Map", icon: "🗺️" },
  { label: "AI Insights", icon: "🧠" },
  { label: "Resource Allocation", icon: "📦" },
];

function severityBadge(severity: string) {
  if (severity === "High")
    return (
      <span className="bg-[#FEE2E2] text-[#C62828] font-bold rounded-full px-3 py-1 text-[13px]">
        {severity}
      </span>
    );
  if (severity === "Medium")
    return (
      <span className="bg-[#FEF9C3] text-[#854D0E] font-bold rounded-full px-3 py-1 text-[13px]">
        {severity}
      </span>
    );
  return (
    <span className="bg-[#DCFCE7] text-[#166534] font-bold rounded-full px-3 py-1 text-[13px]">
      {severity}
    </span>
  );
}

function statusPill(status: string) {
  if (status === "Open")
    return (
      <span className="bg-[#DBEAFE] text-[#185FA5] font-semibold rounded-full px-3 py-1 text-sm">
        {status}
      </span>
    );
  if (status === "In Progress")
    return (
      <span className="bg-[#FEF9C3] text-[#854D0E] font-semibold rounded-full px-3 py-1 text-sm">
        {status}
      </span>
    );
  return (
    <span className="bg-[#DCFCE7] text-[#166534] font-semibold rounded-full px-3 py-1 text-sm">
      {status}
    </span>
  );
}

interface DetailPanelProps {
  submission: MockSubmission;
  statuses: Record<number, string>;
  onClose: () => void;
  onMarkResolved: (id: number) => void;
}

function DetailPanel({ submission: s, statuses, onClose, onMarkResolved }: DetailPanelProps) {
  const effectiveStatus = statuses[s.id] ?? s.status;
  const subject = encodeURIComponent(
    `[NeedBridge] ${s.severity} — ${s.description} in ${s.location}`
  );
  const body = encodeURIComponent(s.gov_escalation.email_template_draft);

  return (
    <div className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-xl border-l border-gray-200 overflow-hidden sm:w-[420px]">
      {/* Header */}
      <div className="flex flex-col gap-3 p-6" style={{ background: "#185FA5" }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <h2 className="font-bold text-lg text-white leading-snug">{s.description}</h2>
            <p className="text-white/70 text-sm">{s.location}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {severityBadge(s.severity)}
          {statusPill(effectiveStatus)}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* ActNow */}
        <div className="p-6 border-b border-gray-100">
          <p className="text-sm font-semibold mb-4" style={{ color: "#185FA5" }}>
            🟢 ActNow — Immediate Steps
          </p>
          <div className="flex flex-col">
            {s.actnow.immediate_actions.map((action, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0"
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: "#185FA5" }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700">{action.replace(/^\d+\.\s*/, "")}</p>
              </div>
            ))}
          </div>
          {s.actnow.short_term_steps.length > 0 && (
            <div className="mt-4 flex flex-col gap-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Short-term Steps
              </p>
              {s.actnow.short_term_steps.map((step, i) => (
                <p key={i} className="text-sm text-gray-500 pl-2">
                  • {step.replace(/^\d+\.\s*/, "")}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* BuildIt */}
        {s.buildit && (
          <div className="p-6 border-b border-gray-100">
            <p className="text-sm font-semibold mb-4" style={{ color: "#E24B4A" }}>
              🔧 BuildIt — Community Fix
            </p>
            <p className="font-bold text-[#0F1E33] mb-3">{s.buildit.solution_name}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                {s.buildit.difficulty_level}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                {s.buildit.estimated_time}
              </span>
            </div>
            <div className="flex flex-col">
              {s.buildit.parts_list.map((part, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
                >
                  <span className="text-sm text-gray-700">
                    {part.item}{" "}
                    <span className="text-gray-400 text-xs">x{part.quantity}</span>
                  </span>
                  <span className="text-sm font-bold" style={{ color: "#185FA5" }}>
                    {part.est_price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex flex-col gap-3">
        <a
          href={`mailto:contact@${s.gov_escalation.agency_name.toLowerCase()}.gov.ph?subject=${subject}&body=${body}`}
          className="w-full flex items-center justify-center rounded-lg py-3 font-bold transition-colors border-2 hover:bg-blue-50"
          style={{ borderColor: "#185FA5", color: "#185FA5" }}
        >
          🚩 Flag for Escalation — {s.gov_escalation.agency_name}
        </a>
        <button
          onClick={() => onMarkResolved(s.id)}
          disabled={effectiveStatus === "Resolved"}
          className="w-full rounded-lg py-3 font-bold text-white transition-colors hover:bg-[#0C447C] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "#185FA5" }}
        >
          {effectiveStatus === "Resolved" ? "✓ Already Resolved" : "✓ Mark as Resolved"}
        </button>
      </div>
    </div>
  );
}

export function DashboardScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<MockSubmission | null>(null);
  const [statuses, setStatuses] = useState<Record<number, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email.trim().toLowerCase() === "coordinator@needbridge.ph" &&
      password === "needbridge2026"
    ) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleMarkResolved = (id: number) => {
    setStatuses((prev) => ({ ...prev, [id]: "Resolved" }));
    setToast("✓ Marked as resolved");
    setTimeout(() => setToast(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "#F5F7FA" }}
      >
        <form
          onSubmit={handleLogin}
          className="w-[380px] max-w-[90%] rounded-2xl border border-gray-100 bg-white p-9 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          style={{ borderTop: "6px solid #E24B4A" }}
        >
          <h2 className="mb-1.5 text-[22px] font-bold" style={{ color: "#185FA5" }}>
            Coordinator Sign In
          </h2>
          <p className="mb-5 text-sm text-gray-500">
            Access restricted to authorized barangay coordinators.
          </p>

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

          {loginError && (
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
        <div className="relative flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className="hidden h-full w-64 shrink-0 flex-col border-r border-gray-200 py-8 md:flex"
            style={{ background: "#0C447C" }}
          >
            <div className="mb-8 flex items-center gap-3 px-6">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
                style={{ background: "#185FA5" }}
              >
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
              {SIDEBAR_ITEMS.map((item, idx) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-3 rounded-r-xl border-l-4 px-3 py-2.5 text-sm transition-all ${
                    idx === 0
                      ? "border-[#E24B4A] font-bold text-white"
                      : "border-transparent text-white/70 hover:bg-white/10"
                  }`}
                >
                  <span className="text-[20px]">{item.icon}</span>
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
            </div>
          </aside>

          {/* Main Content */}
          <main
            className="flex flex-1 flex-col overflow-hidden transition-all duration-300"
            style={{ background: "#F5F7FA" }}
          >
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <div className="mb-2 flex items-center justify-between">
                  <h1 className="text-2xl font-bold" style={{ color: "#185FA5" }}>
                    Overview Dashboard
                  </h1>
                </div>

                {/* Stats Row */}
                <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  <div
                    className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderTop: "4px solid #185FA5" }}
                  >
                    <div className="flex items-center gap-2" style={{ color: "#185FA5" }}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">Total Reports</span>
                    </div>
                    <div className="text-5xl font-bold leading-none" style={{ color: "#185FA5" }}>
                      {MOCK_STATS.totalReports}
                    </div>
                  </div>

                  <div
                    className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderTop: "4px solid #C62828" }}
                  >
                    <div className="flex items-center gap-2" style={{ color: "#C62828" }}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">High Severity</span>
                    </div>
                    <div className="text-5xl font-bold leading-none" style={{ color: "#C62828" }}>
                      {MOCK_STATS.highSeverity}
                    </div>
                  </div>

                  <div
                    className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderTop: "4px solid #F9A825" }}
                  >
                    <div className="flex items-center gap-2" style={{ color: "#F9A825" }}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">In Progress</span>
                    </div>
                    <div className="text-5xl font-bold leading-none" style={{ color: "#F9A825" }}>
                      {MOCK_STATS.inProgress}
                    </div>
                  </div>

                  <div
                    className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderTop: "4px solid #388E3C" }}
                  >
                    <div className="flex items-center gap-2" style={{ color: "#388E3C" }}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">Resolved</span>
                    </div>
                    <div className="text-5xl font-bold leading-none" style={{ color: "#388E3C" }}>
                      {MOCK_STATS.resolved}
                    </div>
                  </div>
                </section>

                {/* Alert Banner */}
                <div
                  className="flex items-center justify-between gap-4 rounded-xl p-4 shadow-sm"
                  style={{ background: "#F9A825" }}
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-6 w-6 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: "#0F1E33" }}
                    >
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                    <p className="text-[15px] font-bold" style={{ color: "#0F1E33" }}>
                      Pattern detected: 3 similar drainage reports in Barangay San Isidro this week.
                    </p>
                  </div>
                  <button
                    className="shrink-0 rounded-lg border px-4 py-2 text-sm font-bold transition-colors hover:bg-black/10"
                    style={{ borderColor: "#0F1E33", color: "#0F1E33" }}
                  >
                    View
                  </button>
                </div>

                {/* Submissions Table */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold" style={{ color: "#185FA5" }}>
                    Recent Submissions
                  </h2>
                  <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="hidden grid-cols-[1fr_130px_110px_110px_110px] gap-4 border-b border-gray-200 bg-gray-50 p-4 text-xs font-bold uppercase tracking-wider text-gray-500 md:grid">
                      <div>Description</div>
                      <div>Type</div>
                      <div>Severity</div>
                      <div>Date</div>
                      <div>Status</div>
                    </div>
                    <div className="flex flex-col">
                      {MOCK_SUBMISSIONS.map((row) => {
                        const isSelected = selectedSubmission?.id === row.id;
                        const effectiveStatus = statuses[row.id] ?? row.status;
                        return (
                          <div
                            key={row.id}
                            onClick={() => setSelectedSubmission(isSelected ? null : row)}
                            className={`grid grid-cols-1 items-center gap-4 border-b border-gray-100 p-4 cursor-pointer transition-colors hover:bg-blue-50 border-l-4 md:grid-cols-[1fr_130px_110px_110px_110px] ${
                              isSelected ? "border-l-[#185FA5] bg-blue-50" : "border-l-transparent"
                            }`}
                          >
                            <div className="flex flex-col gap-0.5 overflow-hidden">
                              <span className="truncate text-base font-medium text-gray-900">
                                {row.description}
                              </span>
                              <span className="text-xs text-gray-400">{row.location}</span>
                            </div>
                            <div>
                              <span className="flex items-center gap-1 text-sm text-gray-600">
                                <span>{row.typeIcon}</span>
                                {row.type}
                              </span>
                            </div>
                            <div>{severityBadge(row.severity)}</div>
                            <div className="hidden text-sm text-gray-600 md:block">{row.date}</div>
                            <div>{statusPill(effectiveStatus)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>

          {/* Mobile overlay */}
          {selectedSubmission && (
            <div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setSelectedSubmission(null)}
            />
          )}

          {/* Detail Panel */}
          {selectedSubmission && (
            <DetailPanel
              submission={selectedSubmission}
              statuses={statuses}
              onClose={() => setSelectedSubmission(null)}
              onMarkResolved={handleMarkResolved}
            />
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-lg bg-[#388E3C] px-6 py-3 text-sm font-bold text-white shadow-lg">
          {toast}
        </div>
      )}
    </PageLayout>
  );
}
