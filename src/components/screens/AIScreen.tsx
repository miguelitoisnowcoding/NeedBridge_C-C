import { useEffect, useState } from "react";
import { NeedBridgeOutput } from "@/lib/openrouter";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "../layout/PageLayout";

export function AIScreen() {
  const [showGuide, setShowGuide] = useState(false);
  const [result, setResult] = useState<NeedBridgeOutput | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem("needbridgeResult");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        console.error("Failed to parse stored result");
      }
    }
  }, []);
  
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading result...</p>
      </div>
    );
  }

  const handleFlag = () => {
    const subject = encodeURIComponent("NeedBridge Escalation: Clogged Drainage - Barangay 123");
    const body = encodeURIComponent(
      "Please find attached the AI-generated action plan for escalation review.\n\nIssue: Clogged Drainage\nSeverity: High\nLocation: Barangay 123\n\n— Sent via NeedBridge"
    );
    window.location.href = `mailto:engineering@city.gov.ph?subject=${subject}&body=${body}`;
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <PageLayout>
      {/* Issue Summary Bar */}
      <div className="w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-row items-center gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <svg className="h-10 w-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="m-0 text-[20px] font-bold leading-tight text-gray-900">{result.issue_type}</h1>
                <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">{result.issue_type}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${result.severity === "High" ? "bg-[#C62828]" :
                  result.severity === "Medium" ? "bg-[#F9A825]" :
                  "bg-[#388E3C]"
                }`}>
                  {result.severity} Priority
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {result.barangay_context || "Location not specified"}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                  Today, 08:45 AM
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex w-full gap-3 md:mt-0 md:hidden">
            <button onClick={() => window.print()} className="flex flex-1 items-center justify-center gap-2 rounded border border-gray-400 px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              PDF
            </button>
            <button onClick={handleShare} className="flex flex-1 items-center justify-center gap-2 rounded bg-[#E24B4A] px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c93e3d]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
        <div className="relative flex flex-col gap-8 rounded-xl p-0 md:p-2" style={{ background: "#F5F7FA" }}>
          <div className="relative z-10 px-2 md:px-4">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold" style={{ color: "#185FA5" }}>
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L5.09 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
              AI Recommended Action Plan
            </h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-gray-500">
              Based on the submitted data and historical infrastructure patterns in Barangay 123, the following three-tiered response plan has been generated to address the severe drainage blockage and prevent immediate flooding.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="relative z-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            {/* ActNow Card */}
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 rounded-t-xl p-5 text-white" style={{ background: "#185FA5" }}>
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <h3 className="text-xl font-semibold">ActNow</h3>
              </div>
              <div className="flex flex-grow flex-col gap-6 p-6">
                <div>
                  {/* Immediate Actions */}
                  {result.actnow?.immediate_actions.map((action, i) => (
                    <div key={i} className="flex gap-3 py-2 border-b border-gray-100">
                    <div className="w-6 h-6 rounded-full bg-[#185FA5] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                    </div>
                    <p className="text-sm text-gray-700">{action}</p>
                    </div>
                  ))}

                  {/* Short Term Steps */}
                  {result.actnow?.short_term_steps.map((step, i) => (
                    <p key={i} className="text-sm text-gray-700">• {step}</p>
                  ))}

                  {/* Resources */}
                  {result.actnow?.resources_needed.map((resource, i) => (
                    <p key={i} className="text-sm text-gray-600">• {resource}</p>
                  ))}

                  {/* Escalation button */}
                  <button
                    onClick={() => {
                      const agency = result.actnow.escalation_agency || 
                                     result.gov_escalation?.agency_name || "DPWH";
                      const subject = `Community Issue Report — ${result.issue_type}`;
                      const body = result.gov_escalation?.email_template_draft || 
                                   `We wish to report a ${result.issue_type} issue in our barangay requiring your immediate attention.`;
                      window.open(
                        `mailto:${agency.toLowerCase()}@gov.ph?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                      );
                    }}
                    className="w-full border-2 border-[#185FA5] text-[#185FA5] py-3 rounded-lg font-bold hover:bg-green-50 transition-colors">
                    🚩 Flag for Escalation — {result.gov_escalation?.agency_name || "Gov Agency"}
                    </button>
                </div>
                <div className="mt-auto flex flex-col gap-3 border-t border-gray-200 pt-6">
                  <button onClick={handleFlag} className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#185FA5] bg-white py-3 font-bold text-[#185FA5] transition-colors hover:bg-blue-50">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
                  </svg>
                  Flag for City Engineering Office
                </button>
                </div>
              </div>
            </div>

            {/* BuildIt Card */}
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 rounded-t-xl p-5 text-white" style={{ background: "#E24B4A" }}>
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                </svg>
                <h3 className="text-xl font-semibold">BuildIt</h3>
              </div>

              <div className="flex flex-grow flex-col gap-6 p-6">
                {result.buildit && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-[#0F1E33] text-lg">
                      {result.buildit.solution_name}
                    </h3>

                    <div className="flex gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {result.buildit.difficulty_level}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        ⏱ {result.buildit.estimated_time}
                      </span>
                    </div>

                    {/* Parts list */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Parts Checklist</h4>
                      {result.buildit.parts_list.map((part, i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                          <div>
                            <span className="text-sm font-medium">{part.item}</span>
                            <span className="text-xs text-gray-400 ml-2">x{part.quantity}</span>
                          </div>
                          <span className="text-sm font-bold text-[#0F1E33]">{part.est_price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Build steps */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Build Steps</h4>
                      {result.buildit.build_steps.map((step, i) => (
                        <div key={i} className="flex gap-3 mb-3">
                          <div className="w-7 h-7 rounded-full bg-[#E24B4A] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-sm text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>

                    {/* Shopee button */}
                    <button
                      onClick={() => {
                        const query = result.buildit!.parts_list[0]?.item ||
                                      result.buildit!.solution_name;
                        window.open(
                          `https://shopee.ph/search?keyword=${encodeURIComponent(query)}`,
                          "_blank"
                        );
                      }}
                      className="w-full bg-[#EE4D2D] text-white py-3 rounded-lg font-bold hover:bg-[#D94226] transition-colors"
                    >
                      🛍️ Search Parts on Shopee
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
