import type { ReactNode } from "react";
import { Sidebar } from "../components/layout/Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-[#F4F5F9] font-sans text-[#1E2332] overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar />
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        <div className="max-w-[1400px] w-full mx-auto p-6 lg:p-10 flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
