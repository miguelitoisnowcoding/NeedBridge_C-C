import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Reports", to: "/reports" },
  { label: "Dashboard", to: "/dashboard" },
];

export function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = router.state.location.pathname;

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md" style={{ background: "#1A3C5E" }}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">
          NeedBridge
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`font-medium transition-colors ${
                isActive(item.to)
                  ? "border-b-2 border-white pb-1 text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/submit"
            className="rounded-lg px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
            style={{ background: "#F57C00" }}
          >
            Submit Need
          </Link>
        </nav>

        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 px-6 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`font-medium transition-colors ${
                  isActive(item.to) ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/submit"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-lg px-5 py-2.5 text-center font-semibold text-white"
              style={{ background: "#F57C00" }}
            >
              Submit Need
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
