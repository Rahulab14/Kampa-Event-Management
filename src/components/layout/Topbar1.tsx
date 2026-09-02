// import { Search, Bell, ChevronDown, Menu } from "lucide-react";

// interface TopbarProps {
//   onOpenSidebar: () => void;
// }

// export function Topbar({ onOpenSidebar }: TopbarProps) {
//   return (
//     <header className="sticky top-0 z-30 flex h-[72px] w-full items-center justify-between bg-white px-4 sm:px-6 lg:px-8 shadow-sm border-b border-gray-100">
      
//       <div className="flex items-center gap-3 flex-1">
//         {/* Hamburger Menu - Hidden on Desktop */}
//         <button 
//           onClick={onOpenSidebar}
//           className="lg:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
//         >
//           <Menu size={24} />
//         </button>

//         {/* Search Bar - Hidden on very small mobile screens, expands on tablet/desktop */}
//         <div className="hidden sm:flex w-full max-w-xl items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 transition-all focus-within:border-brand-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-brand-500">
//           <Search size={18} className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search events, hackathons, workshops..."
//             className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
//           />
//         </div>
//       </div>

//       {/* Right Actions */}
//       <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 ml-auto">
//         {/* Mobile Search Icon (Shows when search bar is hidden) */}
//         <button className="sm:hidden rounded-full p-2 text-gray-500 hover:bg-gray-50">
//           <Search size={20} />
//         </button>

//         <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition">
//           <Bell size={20} />
//           <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
//         </button>

//         <div className="h-6 w-px bg-gray-200 hidden sm:block" />

//         <button className="flex items-center gap-2 sm:gap-3 rounded-full hover:bg-gray-50 p-1 sm:pr-3 transition-colors">
//           <div className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
//             KLU
//           </div>
//           <div className="hidden text-left md:block">
//             <p className="text-sm font-bold text-gray-900">Kalasalingam University</p>
//           </div>
//           <ChevronDown size={16} className="text-gray-400 ml-1 hidden md:block" />
//         </button>
//       </div>
//     </header>
//   );
// }
import { useState } from "react";
import { Search, Command } from "lucide-react";

interface TopbarProps {
  onSearch?: (query: string) => void;
}

export function Topbar({ onSearch }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Pass the search query back to the parent component instantly
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <header className="flex justify-between items-center mb-8 gap-6 shrink-0 w-full">
      
      {/* 1. Expanded, Interactive Search Bar */}
      <div className="flex flex-1 max-w-xl items-center gap-3 bg-[#FFFFFF] px-4 py-2.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 focus-within:border-[#000000]/30 transition-all duration-300">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search events, hackathons, workshops..."
          className="bg-transparent border-none outline-none w-full text-[15px] font-medium text-[#000000] placeholder:text-gray-400"
        />
        
        {/* Premium Keyboard Shortcut Hint */}
        <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-md border border-gray-100 select-none">
          <Command className="w-3 h-3 text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400">K</span>
        </div>
      </div>
      
      {/* 2. University Profile Pill */}
      <button
        type="button"
        className="group inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white py-1.5 pl-1.5 pr-3 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition-all duration-300 ease-out hover:-translate-y-[1px] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2"
        aria-label="Kalasalingam University"
      >
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#EEF1FF] via-[#E3E7F8] to-[#D8DDF2] text-[11px] font-black tracking-[0.12em] text-slate-900 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] ring-1 ring-black/[0.04] transition-transform duration-300 group-hover:scale-[1.04]">
          <span className="relative">KLU</span>
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-transparent" />
        </div>

        <div className="hidden min-w-0 flex-col items-start sm:flex">
          <span className="text-[13px] font-extrabold leading-[16px] tracking-[-0.01em] text-slate-950">
            Kalasalingam
          </span>
          <span className="mt-0.5 text-[9px] font-bold uppercase leading-3 tracking-[0.16em] text-slate-400">
            University
          </span>
        </div>

        <svg className="ml-0.5 h-3.5 w-3.5 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-slate-500" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7 4.5L12.5 10L7 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

    </header>
  );
}