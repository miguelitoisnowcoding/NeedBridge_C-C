import { PageLayout } from "../layout/PageLayout";
import { MOCK_SUBMISSIONS } from "@/lib/mockData";

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

export function ReportsScreen() {
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

        {/* Reports Grid */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_SUBMISSIONS.map((report) => (
            <div
              key={report.id}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
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

        <div className="flex justify-center">
          <button
            className="rounded-lg border-2 px-8 py-3 text-sm font-bold shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: "#185FA5", color: "#185FA5" }}
          >
            Load More Reports
          </button>
        </div>
      </main>
    </PageLayout>
  );
}
