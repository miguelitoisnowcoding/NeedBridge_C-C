import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export function ProcessingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: "/ai" });
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb]">
      <main className="flex flex-grow items-center justify-center p-4 md:p-8">
        <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          {/* Animated SVG */}
          <div className="h-[120px] w-[120px]">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" stroke="#E2E8F0" strokeWidth="8" />
              <path d="M60 10C32.3858 10 10 32.3858 10 60" stroke="#1a3c5e" strokeLinecap="round" strokeWidth="8">
                <animateTransform
                  attributeName="transform"
                  dur="1.5s"
                  from="0 60 60"
                  repeatCount="indefinite"
                  to="360 60 60"
                  type="rotate"
                />
              </path>
              <circle cx="60" cy="60" r="15" fill="#1a3c5e">
                <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1;0.4;1" />
              </circle>
            </svg>
          </div>

          {/* Steps */}
          <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
              <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sm font-semibold text-gray-500">Identifying issue type... (IBM Watsonx)</span>
            </div>
            <div className="flex items-center gap-4">
              <svg className="h-6 w-6 animate-pulse text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sm font-bold text-gray-900">Determining severity...</span>
            </div>
            <div className="flex items-center gap-4 opacity-50">
              <svg className="h-6 w-6 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
              <span className="text-sm font-semibold text-gray-500">Generating response plan... (Claude API)</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="absolute top-0 left-0 h-full animate-[loading_4s_ease-in-out_infinite] rounded-full" style={{ background: "#1a3c5e" }} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: "#1A3C5E" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-8 py-8 md:flex-row md:justify-between">
          <p className="text-sm text-white/60">&copy; 2024 NeedBridge Civic Technology. Empowering Barangay Governance.</p>
          <nav className="flex flex-wrap justify-center gap-6">
            <span className="text-sm text-white/80 transition-colors hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="text-sm text-white/80 transition-colors hover:text-white cursor-pointer">Terms of Service</span>
            <span className="text-sm text-white/80 transition-colors hover:text-white cursor-pointer">Contact Us</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
