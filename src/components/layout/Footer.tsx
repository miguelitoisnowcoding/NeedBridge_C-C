import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-auto" style={{ background: "#1A3C5E" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-8 py-8 md:flex-row md:justify-between">
        <p className="order-2 text-sm font-medium text-white/70 md:order-1">
          &copy; 2024 NeedBridge Civic Technology. Empowering Barangay Governance.
        </p>
        <nav className="order-1 flex flex-wrap justify-center gap-x-8 gap-y-2 md:order-2">
          <Link to="/" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
            About Us
          </Link>
          <Link to="/" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
            Terms of Service
          </Link>
          <Link to="/" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
            Contact Support
          </Link>
        </nav>
      </div>
    </footer>
  );
}
