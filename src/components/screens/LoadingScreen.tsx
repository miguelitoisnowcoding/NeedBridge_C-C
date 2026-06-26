import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: "/ai" });
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (isAnalyzing) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full text-center">
        <div className="text-5xl mb-6">🔍</div>
        <h2 className="text-xl font-bold text-[#0F1E33] mb-8">
          Analyzing your report...
        </h2>
        <div className="space-y-4 text-left">
          {[
            { label: "Identifying issue type", sub: "WatsonX Classifier" },
            { label: "Determining severity", sub: "" },
            { label: "Generating response plan", sub: "OpenRouter — Gemini 2.0 Flash" }
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 
                              flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <div>
                <span className="text-sm font-medium text-gray-800">
                  {step.label}
                </span>
                {step.sub && (
                  <span className="text-xs text-gray-400 ml-2">
                    {step.sub}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
}
