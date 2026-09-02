// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Sidebar } from "../components/layout/Sidebar";
// import { Topbar } from "../components/layout/Topbar";

// export function DashboardLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen w-full bg-[#f8fafc] font-sans text-gray-900 overflow-hidden relative">
//       {/* Sidebar handles its own mobile/desktop display logic based on this prop */}
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
//       <div className="flex flex-1 flex-col overflow-hidden w-full">
//         <Topbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        
//         {/* Responsive padding: p-4 on mobile, p-6 on tablet, p-8 on desktop */}
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
//           <div className="mx-auto max-w-[1400px]">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#F4F5F9] font-sans text-[#1E2332] overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar />
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        <div className="max-w-[1400px] w-full mx-auto p-6 lg:p-10 flex-1 flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
