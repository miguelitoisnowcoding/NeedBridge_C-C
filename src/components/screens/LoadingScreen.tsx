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

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
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
        <p className="text-lg font-medium text-white/80">Analyzing your report...</p>
      </div>
    </div>
  );
}
