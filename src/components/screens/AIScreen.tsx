import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "../layout/PageLayout";

export function AIScreen() {
  const [showGuide, setShowGuide] = useState(false);

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
                <h1 className="m-0 text-[20px] font-bold leading-tight text-gray-900">Clogged Drainage</h1>
                <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">Infrastructure</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded bg-[#C62828] px-3 py-1 text-sm font-bold uppercase tracking-wider text-white">High Severity</span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Barangay 123
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
                  <h4 className="mb-3 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">Immediate Actions</h4>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3 text-[14px] text-gray-500">
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#185FA5" }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="pt-0.5">Clear surface debris (leaves, plastic) blocking the primary grate.</span>
                    </li>
                    <li className="flex items-start gap-3 text-[14px] text-gray-500">
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#185FA5" }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="pt-0.5">Place temporary warning signs or cones around the flooded zone.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">Short-Term Coordination</h4>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3 text-[14px] text-gray-500">
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#185FA5" }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="pt-0.5">Organize 5-person volunteer cleanup detail for safe perimeter clearing.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">Resources Needed</h4>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3 text-[14px] text-gray-500">
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#185FA5" }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="pt-0.5">Trash bags, work gloves, safety vests, traffic cones.</span>
                    </li>
                  </ul>
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
                <div>
                  <h4 className="mb-3 text-base font-bold text-gray-900">Perimeter Seal & Debris Snake</h4>
                  <div className="mb-2 flex flex-wrap gap-3">
                    <span className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-gray-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Medium Difficulty
                    </span>
                    <span className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-gray-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                      4 Hours
                    </span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="mb-3 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">Parts Checklist</h4>
                  <ul className="mt-4 overflow-hidden rounded-lg border border-gray-200">
                    <li className="flex items-center justify-between border-b border-gray-200 bg-white p-3 text-[14px] text-gray-900">
                      <span className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </svg>
                        Heavy-duty drain snake (10m)
                      </span>
                      <span className="font-mono text-sm font-semibold text-gray-500">₱850.00</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-gray-200 bg-white p-3 text-[14px] text-gray-900">
                      <span className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </svg>
                        Fast-setting hydraulic cement (5kg)
                      </span>
                      <span className="font-mono text-sm font-semibold text-gray-500">₱320.00</span>
                    </li>
                    <li className="flex items-center justify-between bg-white p-3 text-[14px] text-gray-900">
                      <span className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </svg>
                        Joint reinforcing mesh
                      </span>
                      <span className="font-mono text-sm font-semibold text-gray-500">₱150.00</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto flex flex-col gap-3 border-t border-gray-200 pt-6">
                  <button onClick={() => setShowGuide(!showGuide)} className="flex w-full items-center justify-center gap-2 rounded-lg py-3 font-bold text-white transition-colors hover:opacity-90" style={{ background: "#E24B4A" }}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.41.21.75-.19.75-.65V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                    </svg>
                    View Full Build Guide
                  </button>
                  <a
                    href="https://shopee.ph/search?keyword=drain+snake+hydraulic+cement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-400 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                    Search on Shopee
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Build Guide */}
          {showGuide && (
            <div className="mx-2 rounded-xl border border-gray-300 bg-white p-6 md:mx-4" style={{ marginTop: "24px" }}>
              <h3 className="mb-4 text-xl font-bold" style={{ color: "#185FA5" }}>Full Build Guide</h3>
              <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-gray-700">
                <li>Secure the perimeter with cones and warning signage.</li>
                <li>Use the heavy-duty drain snake to clear the primary blockage.</li>
                <li>Inspect joints; apply hydraulic cement to any cracked sections.</li>
                <li>Embed reinforcing mesh over patched joints before final smoothing.</li>
                <li>Flush the line with water to confirm flow is restored.</li>
                <li>Document the repair with photos and update the report status.</li>
              </ol>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
}
