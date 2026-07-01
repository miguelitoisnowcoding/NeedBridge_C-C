import { useState, useEffect } from "react";
import { PageLayout } from "../layout/PageLayout";
import { MOCK_SUBMISSIONS, type MockSubmission } from "@/lib/mockData";

const FILTERS = ["All", "Open", "In Progress", "Resolved"];

function severityColor(severity: string) {
  if (severity === "High") return "#C62828";
  if (severity === "Medium") return "#F9A825";
  return "#388E3C";
}

function severityBgClass(severity: string) {
  if (severity === "High") return "bg-red-50";
  if (severity === "Medium") return "bg-yellow-50";
  return "bg-green-50";
}

function statusDotClass(status: string) {
  if (status === "Open") return "bg-blue-500";
  if (status === "In Progress") return "bg-yellow-400";
  return "bg-green-500";
}

function SeverityBadge({ severity }: { severity: string }) {
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

function StatusPill({ status }: { status: string }) {
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
  onClose: () => void;
}

function DetailPanel({ submission: s, onClose }: DetailPanelProps) {
  const [toast, setToast] = useState(false);

  const subject = encodeURIComponent(
    `[NeedBridge] ${s.severity} — ${s.description} in ${s.location}`
  );
  const body = encodeURIComponent(s.gov_escalation.email_template_draft);

  const handleShare = () => {
    const url = window.location.href + "?report=" + s.id;
    navigator.clipboard.writeText(url).then(() => {
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    });
  };

  return (
    <div className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-xl border-l border-gray-200 overflow-hidden sm:w-[420px]">
      {/* Header */}
      <div className="flex flex-col gap-3 p-6 flex-shrink-0" style={{ background: "#185FA5" }}>
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
          <SeverityBadge severity={s.severity} />
          <StatusPill status={s.status} />
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
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex flex-col gap-3 flex-shrink-0">
        <a
          href={`mailto:contact@${s.gov_escalation.agency_name.toLowerCase()}.gov.ph?subject=${subject}&body=${body}`}
          className="w-full flex items-center justify-center rounded-lg py-3 font-bold transition-colors border-2 hover:bg-blue-50 text-sm"
          style={{ borderColor: "#185FA5", color: "#185FA5" }}
        >
          🚩 Flag for Escalation — {s.gov_escalation.agency_name}
        </a>
        <button
          onClick={handleShare}
          className="w-full rounded-lg py-3 font-bold text-white transition-colors text-sm hover:bg-[#0C447C]"
          style={{ background: "#185FA5" }}
        >
          🔗 Share Report
        </button>
        {toast && (
          <div className="rounded-lg bg-[#388E3C] px-4 py-2 text-center text-sm font-bold text-white">
            🔗 Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export function ReportsScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSubmission, setSelectedSubmission] = useState<MockSubmission | null>(null);

  useEffect(() => {
    const savedId = localStorage.getItem("selectedReportId");
    if (savedId) {
      const found = MOCK_SUBMISSIONS.find((s) => s.id === Number(savedId));
      if (found) setSelectedSubmission(found);
      localStorage.removeItem("selectedReportId");
    }
  }, []);

  const filteredSubmissions =
    activeFilter === "All"
      ? MOCK_SUBMISSIONS
      : MOCK_SUBMISSIONS.filter((s) => s.status === activeFilter);

  return (
    <PageLayout>
      {/* Page Header */}
      <section className="border-b border-gray-200 bg-white py-8 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-[28px] font-bold" style={{ color: "#185FA5" }}>
            Community Reports
          </h1>
          <p className="text-[15px] text-gray-500">
            Browse and filter all submitted infrastructure needs within the barangay. Transparent
            governance in action.
          </p>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-8">
        {/* Search and Filter Row */}
        <section className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row">
          <div className="relative w-full flex-grow">
            <svg
              className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="text"
              placeholder="Search by keyword, location, or report ID..."
              className="w-full rounded-md border border-gray-200 bg-gray-50 py-2.5 pr-4 pl-12 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
              style={{ borderLeft: "4px solid #185FA5" }}
            />
          </div>
          <div className="flex w-full gap-3 overflow-x-auto pb-2 md:w-auto md:pb-0">
            <button className="flex items-center gap-2 whitespace-nowrap rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
              </svg>
              Status
            </button>
            <button className="whitespace-nowrap rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Severity
            </button>
            <button className="whitespace-nowrap rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Category
            </button>
          </div>
        </section>

        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === filter
                  ? "text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-[#185FA5] hover:text-[#185FA5]"
              }`}
              style={activeFilter === filter ? { background: "#185FA5" } : {}}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Reports Grid */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSubmissions.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedSubmission(report)}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#185FA5] hover:scale-[1.01] cursor-pointer"
              style={{ borderLeft: `4px solid ${severityColor(report.severity)}` }}
            >
              <div className="flex flex-grow flex-col gap-4 p-6">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[13px] font-bold uppercase tracking-wide ${severityBgClass(report.severity)}`}
                      style={{ color: severityColor(report.severity) }}
                    >
                      {report.severity}
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      #{String(report.id).padStart(3, "0")}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[13px] font-medium text-gray-500">
                    <span className={`h-2 w-2 rounded-full ${statusDotClass(report.status)}`} />
                    {report.status}
                  </span>
                </div>
                <div>
                  <h3 className="mb-2 text-[17px] font-semibold leading-snug text-gray-900">
                    {report.description}
                  </h3>
                  <p className="line-clamp-2 text-[14px] leading-relaxed text-gray-500">
                    {report.actnow.immediate_actions[0].replace(/^\d+\.\s*/, "")}
                  </p>
                </div>
                {report.status === "Resolved" && (
                  <div
                    className="mt-2 rounded-md border border-dashed border-blue-200 bg-blue-50 p-3 text-[13px]"
                    style={{ color: "#185FA5" }}
                  >
                    <span className="font-bold">Resolution:</span> Barangay action team resolved
                    this issue.
                  </div>
                )}
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5 text-xs font-medium text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {report.location}
                  </span>
                  <span>{report.date}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {filteredSubmissions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg className="h-12 w-12 mb-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
            </svg>
            <p className="text-sm font-medium">No reports found for "{activeFilter}"</p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="rounded-lg border-2 px-8 py-3 text-sm font-bold shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: "#185FA5", color: "#185FA5" }}
          >
            Load More Reports
          </button>
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
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </PageLayout>
  );
}
