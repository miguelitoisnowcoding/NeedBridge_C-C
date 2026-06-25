import { Header } from "./Header";
import { Footer } from "./Footer";
import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export function PageLayout({
  children,
  showHeader = true,
  showFooter = true,
  className = "",
}: PageLayoutProps) {
  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
