import { Link } from "@tanstack/react-router";
import { PageLayout } from "../layout/PageLayout";
import holdingHands from "../../../assets/holding-hands.jpg";
import { MOCK_SUBMISSIONS } from "@/lib/mockData";

const RECENT_SUBMISSIONS = MOCK_SUBMISSIONS.slice(0, 3);

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


export function HomeScreen() {
  return (
    <PageLayout>
          {/* Hero Section */}
          <section className="relative overflow-hidden py-32" style={{ background: "#0C447C" }}>
            {/* Background image layer */}
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage: `url(${holdingHands})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Dot pattern overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage: "radial-gradient(#185FA5 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
              <h1 className="mb-6 text-[40px] font-bold leading-tight text-white">
                See it. Solve it.
              </h1>
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
                From photo to plan — same day.
              </p>
              <div className="flex flex-col gap-5 sm:flex-row">
                <Link
                  to="/submit"
                  className="rounded-lg px-8 py-3.5 text-lg font-bold text-white shadow-lg transition-colors hover:opacity-90"
                  style={{ background: "#E24B4A" }}
                >
                  Submit a Need
                </Link>
                <Link
                  to="/reports"
                  className="rounded-lg border-2 border-white px-8 py-3.5 text-lg font-bold text-white transition-colors hover:bg-white/10"
                >
                  View Reports
                </Link>
              </div>
            </div>
          </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Large Featured Stat */}
          <div className="relative col-span-1 flex flex-col justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-10 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] lg:col-span-7">
            <div className="pointer-events-none absolute bottom-[-20px] right-[-20px] opacity-[0.03]">
              <svg className="h-60 w-60" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#185FA5" }}>
                <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-2h2v16h-2z" />
              </svg>
            </div>
            <h3 className="relative z-10 mb-3 text-[22px] font-bold" style={{ color: "#185FA5" }}>
              Real-time Impact Tracking
            </h3>
            <p className="relative z-10 mb-8 max-w-md text-base leading-relaxed text-gray-500">
              Our AI validates and prioritizes submissions, generating actionable reports for local government units instantly.
            </p>
            <div className="relative z-10 flex items-end gap-6">
              <div className="text-[48px] font-bold leading-none" style={{ color: "#185FA5" }}>
                1,204
              </div>
              <div className="pb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                Needs Resolved
                <br />
                This Year
              </div>
            </div>
          </div>

          {/* Small Stats */}
          <div className="col-span-1 flex flex-col gap-6 lg:col-span-5">
            <div className="flex flex-grow flex-col justify-center rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]" style={{ borderLeft: "6px solid #185FA5" }}>
              <div className="mb-3 flex items-center gap-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#185FA5" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-lg font-semibold text-gray-700">Verified Submissions</span>
              </div>
              <div className="text-4xl font-bold" style={{ color: "#185FA5" }}>
                89%
              </div>
            </div>
            <div className="flex flex-grow flex-col justify-center rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]" style={{ borderLeft: "6px solid #E24B4A" }}>
              <div className="mb-3 flex items-center gap-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#E24B4A" }}>
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                <span className="text-lg font-semibold text-gray-700">Avg. Response Time</span>
              </div>
              <div className="text-4xl font-bold" style={{ color: "#185FA5" }}>
                48 Hrs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Submissions */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-[28px] font-bold" style={{ color: "#185FA5" }}>
              Recent Submissions
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Latest infrastructure needs reported by the community.
            </p>
          </div>
          <Link
            to="/reports"
            className="hidden items-center font-bold transition-colors sm:flex"
            style={{ color: "#185FA5" }}
          >
            View All
            <svg className="ml-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {RECENT_SUBMISSIONS.map((sub) => (
            <div
              key={sub.id}
              className="flex flex-col rounded-xl border border-gray-100 bg-white p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]"
              style={{ borderTop: `6px solid ${severityColor(sub.severity)}` }}
            >
              <div className="mb-6 flex items-start justify-between">
                <div
                  className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${severityBgClass(sub.severity)}`}
                  style={{ color: severityColor(sub.severity) }}
                >
                  {sub.severity} Priority
                </div>
                <span className="text-sm font-medium text-gray-400">{sub.date}</span>
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-snug text-gray-900">
                {sub.description}
              </h3>
              <p className="mb-8 line-clamp-2 text-base leading-relaxed text-gray-500">
                {sub.location}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {sub.barangay}
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${sub.status === "Resolved" ? "bg-[#DCFCE7] text-[#166534]" : sub.status === "In Progress" ? "bg-[#FEF9C3] text-[#854D0E]" : "bg-[#DBEAFE] text-[#185FA5]"}`}
                >
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/reports"
            className="inline-flex items-center font-bold"
            style={{ color: "#185FA5" }}
          >
            View All Submissions
            <svg className="ml-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
