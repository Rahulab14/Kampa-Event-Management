import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/features/EventCard";
import { EventModal } from "../components/features/EventModal";
import { Topbar } from "../components/layout/Topbar1";
import type { Event } from "../types/event";
import { 
  CalendarDays, ChevronDown, ServerCrash, 
  ChevronLeft, ChevronRight,
  SlidersHorizontal, Calendar, Tag, CheckCircle2,
  Check, GraduationCap, Building2,
  RotateCw
} from "lucide-react";
import logo from '../assets/kampa-bg.png';

// ==========================================
// CUSTOM ANIMATED SVG KAMPA LOGO LOADER
// ==========================================
function KampaLoader({ text = "Loading Kampa events..." }: { text?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Glowing background aura */}
        <div className="absolute inset-0 bg-[#B82126]/15 rounded-full blur-2xl animate-pulse"></div>

        {/* Interactive Animated SVG Kampa Logo using Exact Path Data */}
        <svg 
          viewBox="0 0 424 500" 
          className="w-16 h-20 relative z-10 drop-shadow-lg" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Part 1: Left Vertical Stem */}
          <path 
            d="M 192 250 L 192 67 C 192 51 180 39 163 39 L 53 39 C 37 39 24 50 24 66 L 24 448 C 24 457 29 464 37 466 C 44 468 50 464 55 457 L 192 250 Z" 
            fill="#000000"
            className="animate-pulse"
            style={{ animationDuration: '1.2s' }}
          />
          {/* Part 2: Top Right Wing */}
          <path 
            d="M 192 250 L 353 51 C 361 41 369 38 377 39 C 390 41 400 52 400 66 L 400 212 C 400 234 384 250 362 250 L 192 250 Z"
            fill="#000000"
            className="animate-pulse"
            style={{ animationDuration: '0.9s', animationDelay: '0.3s' }}
          />
          {/* Part 3: Bottom Right Wing */}
          <path 
            d="M 192 250 L 392 402 C 401 409 404 418 402 429 C 400 449 388 465 369 465 L 223 465 C 205 465 192 452 192 435 L 192 250 Z"
            fill="#000000"
            className="animate-pulse"
            style={{ animationDuration: '1.5s', animationDelay: '0.6s' }}
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-black uppercase tracking-widest text-black animate-pulse">{text}</p>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B82126]">
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // ==========================================
  // FILTER STATES
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = ["All Events", "Hackathon", "Workshop", "Seminar", "Competition", "Exam", "Symposium"];
  const [categoryIndex, setCategoryIndex] = useState(0);

  const [dateFilter, setDateFilter] = useState<"Upcoming" | "Past" | "All">("Upcoming");
  const [statusFilter, setStatusFilter] = useState<"All" | "Open Registrations">("All");
  
  // Strict Toggles (No "All" option)
  const [is3rdYearOnly] = useState(false);
  const [isCseOnly] = useState(false);
  
  const [activeDropdown, setActiveDropdown] = useState<"date" | "category" | "status" | null>(null);

  // ==========================================
  // HANDLERS & LOGIC
  // ==========================================
  const handlePrevCategory = () => setCategoryIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  const handleNextCategory = () => setCategoryIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  const activeCategory = categories[categoryIndex];

  // Updated Filtering Engine
  const filteredEvents = events.filter((event) => {
    // A. Category Match
    let matchesCategory = true;
    if (activeCategory !== "All Events") {
      const eventType = (event.type || "").toLowerCase();
      const targetCategory = activeCategory.toLowerCase();
      if (targetCategory === "events") {
        matchesCategory = eventType === "event" || eventType === "events" || eventType === "";
      } else {
        matchesCategory = eventType.includes(targetCategory);
      }
    }

    // B. Date Match
    let matchesDate = true;
    const today = new Date().toISOString().split('T')[0];
    if (dateFilter === "Upcoming") {
      matchesDate = event.startDate >= today || !event.startDate;
    } else if (dateFilter === "Past") {
      matchesDate = event.startDate < today && event.startDate !== "";
    }

    // C. Status Match
    let matchesStatus = true;
    if (statusFilter === "Open Registrations") {
      matchesStatus = !!event.registrationUrl;
    }

    

    // F. Search Match
    let matchesSearch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch = 
        (event.name || "").toLowerCase().includes(query) ||
        (event.type || "").toLowerCase().includes(query) ||
        (event.shortDescription || "").toLowerCase().includes(query);
    }

    return matchesCategory && matchesDate && matchesStatus  && matchesSearch;
  });

  // ==========================================
  // LOADING / ERROR STATES
  // ==========================================
  if (loading) {
    return <KampaLoader text="Loading Kampa events..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center p-4">
        <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-gray-100 bg-[#FFFFFF] p-8 sm:p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
           <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[24px] bg-red-50 text-[#B82126] shadow-inner">
            <ServerCrash size={40} strokeWidth={1.5} className="relative z-10" />
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-[#000000]">Synchronization Disrupted</h2>
          <p className="mb-8 text-sm font-medium leading-relaxed text-gray-500 sm:text-base">
            We encountered an interruption while fetching the latest event data.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN RENDER
  // ==========================================
  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-10">
      
      {/* Topbar */}
      <Topbar onSearch={(query) => setSearchQuery(query)} />

      {activeDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
      )}

      {/* DYNAMIC HERO BANNER */}
      <div className="relative w-full h-[280px] sm:h-[340px] rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ backgroundImage: `url(${logo})` }}
        >
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-12">
          <button onClick={handlePrevCategory} className="p-3 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/25 backdrop-blur-md text-[#FFFFFF] transition-all transform hover:scale-110 active:scale-95 border border-white/10">
            <ChevronLeft size={32} />
          </button>
          <h1 className="text-5xl sm:text-[80px] md:text-[100px] font-black text-[#FFFFFF] tracking-tighter drop-shadow-2xl select-none text-center uppercase leading-none">
            {activeCategory}
          </h1>
          <button onClick={handleNextCategory} className="p-3 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/25 backdrop-blur-md text-[#FFFFFF] transition-all transform hover:scale-110 active:scale-95 border border-white/10">
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* FILTER BAR WITH TOGGLES & DROPDOWNS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 text-gray-400 mr-2">
            <SlidersHorizontal size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
          </div>

          {/* Date Filter */}
          <div className="relative z-40">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === "date" ? null : "date")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                dateFilter !== "All" ? "bg-[#000000] text-white shadow-md" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Calendar size={16} className={dateFilter !== "All" ? "text-gray-300" : "text-gray-400"} />
              Date: {dateFilter}
              <ChevronDown size={14} className={`ml-1 opacity-70 transition-transform ${activeDropdown === "date" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "date" && (
              <div className="absolute left-0 top-full mt-2 w-full sm:w-48 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {(["Upcoming", "Past", "All"] as const).map((opt) => (
                  <button key={opt} onClick={() => { setDateFilter(opt); setActiveDropdown(null); }} className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    {opt}
                    {dateFilter === opt && <Check size={16} className="text-[#B82126]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative z-40">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === "category" ? null : "category")}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm"
            >
              <Tag size={16} className="text-gray-400" />
              {activeCategory}
              <ChevronDown size={14} className={`ml-1 opacity-70 transition-transform ${activeDropdown === "category" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "category" && (
              <div className="absolute left-0 top-full mt-2 w-full sm:w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-y-auto max-h-[300px] py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {categories.map((cat, index) => (
                  <button key={cat} onClick={() => { setCategoryIndex(index); setActiveDropdown(null); }} className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    {cat}
                    {activeCategory === cat && <Check size={16} className="text-[#B82126]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative z-40">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === "status" ? null : "status")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                statusFilter === "Open Registrations" ? "bg-[#B82126]/10 text-[#B82126] border border-[#B82126]/20" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
              }`}
            >
              <CheckCircle2 size={16} className={statusFilter === "Open Registrations" ? "text-[#B82126]" : "text-gray-400"} />
              Registrations: {statusFilter}
              <ChevronDown size={14} className={`ml-1 opacity-70 transition-transform ${activeDropdown === "status" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "status" && (
              <div className="absolute left-0 top-full mt-2 w-full sm:w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {(["All", "Open Registrations"] as const).map((opt) => (
                  <button key={opt} onClick={() => { setStatusFilter(opt); setActiveDropdown(null); }} className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    {opt}
                    {statusFilter === opt && <Check size={16} className="text-[#B82126]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3rd Year Toggle Button */}
          <button 
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
              is3rdYearOnly ? "bg-[#B82126] text-white shadow-md scale-105" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            <GraduationCap size={16} className={is3rdYearOnly ? "text-white" : "text-gray-400"} />
            3rd Year
            {is3rdYearOnly && <Check size={14} className="ml-1" />}
          </button>

          {/* CSE Department Toggle Button */}
          <button 
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
              isCseOnly ? "bg-[#B82126] text-white shadow-md scale-105" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            <Building2 size={16} className={isCseOnly ? "text-white" : "text-gray-400"} />
            CSE
            {isCseOnly && <Check size={14} className="ml-1" />}
          </button>
          <button 
            onClick={() => window.location.reload()}
            title="Reload events"
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 active:scale-95 transition-all duration-300 group"
          >
            <RotateCw size={16} className="text-gray-400 transition-transform duration-500 group-hover:rotate-180" />
            Reload
          </button>
        </div>

        {/* Results Counter Badge */}
        <div className="flex items-center gap-3 rounded-2xl bg-[#FFFFFF] p-2 pr-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 w-fit group cursor-default transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#B82126]/10 to-[#B82126]/5 border border-[#B82126]/10 transition-transform duration-300 group-hover:scale-105">
            <CalendarDays size={18} className="text-[#B82126]" strokeWidth={2} />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className="mb-0.5 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Live Results</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black leading-none text-[#000000]">{filteredEvents.length}</span>
              <span className="text-xs font-bold leading-none text-gray-500">{filteredEvents.length === 1 ? 'Event' : 'Events'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* EVENT GRID */}
      {filteredEvents.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-gray-200 bg-[#FFFFFF] p-6 sm:p-10 text-center shadow-sm mt-4">
          <CalendarDays size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-extrabold text-[#000000]">No matches found</h3>
          <p className="mt-2 text-sm font-medium text-gray-500 max-w-sm">
            {searchQuery 
              ? `No results match "${searchQuery}". Try a different keyword.` 
              : "Try adjusting your filters or switching to a different category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-4">
          {filteredEvents.slice().reverse().map((event, index) => (
            <EventCard key={event.id || `fallback-id-${index}`} event={event} onViewDetails={(e) => setSelectedEvent(e)} />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

// import React from 'react';
// import { 
//   Bell, 
//   ChevronRight, 
//   ChevronLeft, 
//   ChevronDown, 
//   Brain, 
//   Star,
//   Bookmark,
//   Home as HomeIcon,
//   BookOpen,
//   GraduationCap,
//   LineChart,
//   MessageSquare,
//   Settings
// } from 'lucide-react';
// import logo from '../assets/logo.png';

// const Home = () => {
//   return (
//     <div className="flex h-screen bg-[#F4F5F9] font-sans text-[#1E2332] overflow-hidden">
      
//       {/* Left Sidebar (Based on image_2ad565.png) */}
//       <aside className="w-[260px] bg-white h-full flex flex-col p-6 shadow-sm z-10 shrink-0">
//       <img src={logo} alt="SmartLearn Logo" className="w-30 h-12 mb-6" />
//       <div className="flex items-center gap-3 mb-6">
//           <div className="bg-[#E0E4F5] p-2 rounded-xl">
//             <Brain className="w-7 h-7 text-[#5C649C]" />
//           </div>
//           <span className="text-2xl font-bold">SmartLearn</span>
//         </div>

//         <hr className="border-gray-100 mb-6" />

//         <p className="text-xs text-gray-500 mb-4 px-2">Main Menu</p>
        
//         <nav className="flex flex-col gap-2">
//           <a href="#" className="flex items-center gap-4 bg-black text-white px-4 py-3.5 rounded-full shadow-md transition-all">
//             <HomeIcon className="w-5 h-5" />
//             <span className="font-medium text-sm">Overview</span>
//           </a>
          
//           <a href="#" className="flex items-center gap-4 text-gray-500 hover:bg-gray-50 hover:text-black px-4 py-3.5 rounded-full transition-all">
//             <BookOpen className="w-5 h-5" />
//             <span className="font-medium text-sm">Courses</span>
//           </a>

//           <a href="#" className="flex items-center gap-4 text-gray-500 hover:bg-gray-50 hover:text-black px-4 py-3.5 rounded-full transition-all">
//             <GraduationCap className="w-5 h-5" />
//             <span className="font-medium text-sm">Students</span>
//           </a>

//           <a href="#" className="flex items-center gap-4 text-gray-500 hover:bg-gray-50 hover:text-black px-4 py-3.5 rounded-full transition-all">
//             <LineChart className="w-5 h-5" />
//             <span className="font-medium text-sm">Analytics</span>
//           </a>

//           <a href="#" className="flex items-center gap-4 text-gray-500 hover:bg-gray-50 hover:text-black px-4 py-3.5 rounded-full transition-all">
//             <MessageSquare className="w-5 h-5" />
//             <span className="font-medium text-sm">Messages</span>
//           </a>

//           <a href="#" className="flex items-center gap-4 text-gray-500 hover:bg-gray-50 hover:text-black px-4 py-3.5 rounded-full transition-all">
//             <Settings className="w-5 h-5" />
//             <span className="font-medium text-sm">Settings</span>
//           </a>
//         </nav>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 flex flex-col h-full overflow-y-auto">
//         <div className="max-w-[1400px] w-full mx-auto p-6 lg:p-10 flex-1 flex flex-col">
          
//           {/* Header just for Profile & Notifications */}
//           <header className="flex justify-end items-center mb-8 gap-4">
//             <button className="bg-white p-3 rounded-full shadow-sm relative">
//               <Bell className="w-5 h-5 text-gray-600" />
//               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
//             </button>
//             <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full shadow-sm cursor-pointer">
//               <img src="https://i.pravatar.cc/150?img=11" alt="Alex" className="w-10 h-10 rounded-full bg-gray-200" />
//               <div className="flex flex-col">
//                 <span className="text-sm font-bold">Alex Rudewel</span>
//                 <span className="text-xs text-[#8B7FF9] font-semibold">4,525</span>
//               </div>
//               <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
//             </div>
//           </header>

//           {/* Welcome & Stats Section */}
//           <div className="flex justify-between items-end mb-8">
//             <div>
//               <h1 className="text-4xl font-bold mb-2">Welcome back, Alex 👋</h1>
//               <p className="text-gray-500 text-lg">Stay focused, keep learning!</p>
//             </div>
            
//             <div className="flex gap-12">
//               <div className="flex flex-col items-center">
//                 <span className="text-4xl font-bold">12</span>
//                 <span className="text-sm text-gray-400 mt-1">Total courses</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <span className="text-4xl font-bold">92<span className="text-2xl">%</span></span>
//                 <span className="text-sm text-gray-400 mt-1">Completion rate</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <span className="text-4xl font-bold">160<span className="text-2xl text-gray-500 font-normal">h</span></span>
//                 <span className="text-sm text-gray-400 mt-1">Total study time</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <span className="text-4xl font-bold flex items-baseline">85<span className="text-xl text-gray-400 font-normal">/100</span></span>
//                 <span className="text-sm text-gray-400 mt-1">Avg. test score</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <span className="text-4xl font-bold">18</span>
//                 <span className="text-sm text-gray-400 mt-1">Total Certs</span>
//               </div>
//             </div>
//           </div>

//           {/* Main Grid Layout (Extended downwards) */}
//           <div className="grid grid-cols-12 gap-6 flex-1 min-h-[500px]">
            
//             {/* My Courses (Extended) */}
//             <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm flex flex-col h-full">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-bold">My Courses</h2>
//                 <button className="text-sm text-gray-400 hover:text-black">See all</button>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
//                 {/* Course 1 */}
//                 <div className="flex flex-col h-full">
//                   <div className="bg-[#F4EBFE] rounded-2xl p-5 mb-4 relative h-48 flex items-end">
//                     <Bookmark className="absolute top-4 right-4 w-5 h-5 text-[#8B7FF9] fill-current" />
//                     <div className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-sm">
//                        <span className="text-xl">🎨</span>
//                        <span className="font-bold">Typography</span>
//                     </div>
//                   </div>
//                   <h3 className="font-bold text-[15px] leading-tight mb-2">Typography in Figma: create readable and stylish text</h3>
//                   <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4">
//                     <span>1/3 lessons <span className="ml-1">1h 35min</span></span>
//                     <div className="flex items-center gap-1 text-[#8B7FF9]">
//                       <span>4.5</span>
//                       <Star className="w-3 h-3 fill-current" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col h-full">
//                   <div className="bg-[#F4EBFE] rounded-2xl p-5 mb-4 relative h-48 flex items-end">
//                     <Bookmark className="absolute top-4 right-4 w-5 h-5 text-[#8B7FF9] fill-current" />
//                     <div className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-sm">
//                        <span className="text-xl">🎨</span>
//                        <span className="font-bold">Typography</span>
//                     </div>
//                   </div>
//                   <h3 className="font-bold text-[15px] leading-tight mb-2">Typography in Figma: create readable and stylish text</h3>
//                   <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4">
//                     <span>1/3 lessons <span className="ml-1">1h 35min</span></span>
//                     <div className="flex items-center gap-1 text-[#8B7FF9]">
//                       <span>4.5</span>
//                       <Star className="w-3 h-3 fill-current" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col h-full">
//                   <div className="bg-[#EBF1FF] rounded-2xl p-5 mb-4 relative h-48 flex items-end">
//                     <Bookmark className="absolute top-4 right-4 w-5 h-5 text-[#4C6FFF] fill-current" />
//                     <div className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-sm">
//                        <span className="text-xl">🐍</span>
//                        <span className="font-bold">Beginners</span>
//                     </div>
//                   </div>
//                   <h3 className="font-bold text-[15px] leading-tight mb-2">Python for Beginners: from zero to first script</h3>
//                   <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4">
//                     <span>5/16 lessons <span className="ml-1">8h 10min</span></span>
//                     <div className="flex items-center gap-1 text-[#4C6FFF]">
//                       <span>4.7</span>
//                       <Star className="w-3 h-3 fill-current" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col h-full">
//                   <div className="bg-[#EBF1FF] rounded-2xl p-5 mb-4 relative h-48 flex items-end">
//                     <Bookmark className="absolute top-4 right-4 w-5 h-5 text-[#4C6FFF] fill-current" />
//                     <div className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-sm">
//                        <span className="text-xl">🐍</span>
//                        <span className="font-bold">Beginners</span>
//                     </div>
//                   </div>
//                   <h3 className="font-bold text-[15px] leading-tight mb-2">Python for Beginners: from zero to first script</h3>
//                   <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4">
//                     <span>5/16 lessons <span className="ml-1">8h 10min</span></span>
//                     <div className="flex items-center gap-1 text-[#4C6FFF]">
//                       <span>4.7</span>
//                       <Star className="w-3 h-3 fill-current" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Course 3 */}
//                 <div className="flex flex-col h-full">
//                   <div className="bg-[#FDF6E3] rounded-2xl p-5 mb-4 relative h-48 flex items-end">
//                     <Bookmark className="absolute top-4 right-4 w-5 h-5 text-[#E6B02E] fill-current" />
//                     <div className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-sm">
//                        <span className="bg-yellow-400 text-black font-bold px-1 rounded">JS</span>
//                        <span className="font-bold">Essentials</span>
//                     </div>
//                   </div>
//                   <h3 className="font-bold text-[15px] leading-tight mb-2">JavaScript Essentials: build logic from scratch</h3>
//                   <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4">
//                     <span>3/12 lessons <span className="ml-1">3h 12min</span></span>
//                     <div className="flex items-center gap-1 text-[#E6B02E]">
//                       <span>4.7</span>
//                       <Star className="w-3 h-3 fill-current" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Schedule (Extended) */}
//             <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm flex flex-col h-full">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h2 className="text-lg font-bold">September 15, 2025</h2>
//                   <p className="text-sm text-gray-400">2 Lessons, Today</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"><ChevronLeft className="w-4 h-4" /></button>
//                   <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"><ChevronRight className="w-4 h-4" /></button>
//                 </div>
//               </div>
              
//               <div className="relative flex-1 overflow-hidden min-h-[300px]">
//                  {/* Time markers */}
//                  <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-400 py-2">
//                    <span>13:00</span>
//                    <span>14:00</span>
//                    <span>15:00</span>
//                    <span>16:00</span>
//                    <span>17:00</span>
//                    <span>18:00</span>
//                  </div>
                 
//                  {/* Timeline Events */}
//                  <div className="ml-14 relative h-full">
//                     {/* Event 1 */}
//                     <div className="absolute top-[5%] left-0 right-0 bg-[#E3F8E8] border-l-4 border-green-400 rounded-lg p-5 h-[35%] shadow-sm">
//                        <div className="flex justify-between items-start">
//                          <div>
//                            <p className="text-sm font-bold mb-2">13:30 - 15:20</p>
//                            <p className="text-sm text-gray-700">Figma fundamentals: first step into UI/UX Design</p>
//                          </div>
//                          <img src="https://i.pravatar.cc/150?img=12" alt="Tutor" className="w-8 h-8 rounded-full" />
//                        </div>
//                     </div>

//                     {/* Event 2 */}
//                     <div className="absolute top-[65%] left-0 right-0 bg-[#E1F3FA] border-l-4 border-blue-400 rounded-lg p-5 h-[30%] shadow-sm">
//                        <div className="flex justify-between items-start">
//                          <div>
//                            <p className="text-sm font-bold mb-2">16:20 - 18:00</p>
//                            <p className="text-sm text-gray-700">Responsive Design Basics: adapt your UI to any screen</p>
//                          </div>
//                          <img src="https://i.pravatar.cc/150?img=13" alt="Tutor" className="w-8 h-8 rounded-full" />
//                        </div>
//                     </div>
//                  </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;

// import { useEvents } from "../hooks/useEvents";
// import { EventCard } from "../components/features/EventCard";

// export function Home() {
//   const { events, loading, error } = useEvents();

//   if (loading) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 p-4 font-bold">Error: {error}</div>;
//   }

//   // Calculate some dynamic stats based on Kampa data
//   const totalEvents = events.length;
//   const totalCredits = events.reduce((sum, e) => sum + (Number(e.eeCredits) || 0), 0);

//   return (
//     <div className="flex flex-col flex-1 pb-10">
      
//       {/* Welcome & Stats Section */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-8">
//         <div>
//           <h1 className="text-4xl font-extrabold mb-3 text-[#1E2332]">Welcome back, Rahul 👋</h1>
//           <p className="text-gray-500 text-lg font-medium">Stay focused, keep learning and attending!</p>
//         </div>
        
//         {/* Kampa Stats replacing the original stats */}
//         <div className="flex flex-wrap gap-8 lg:gap-12">
//           <div className="flex flex-col items-center">
//             <span className="text-4xl font-extrabold">{totalEvents}</span>
//             <span className="text-sm font-semibold text-gray-400 mt-1">Total Events</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span className="text-4xl font-extrabold">5</span>
//             <span className="text-sm font-semibold text-gray-400 mt-1">Registrations</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span className="text-4xl font-extrabold">{totalCredits}<span className="text-2xl text-gray-400 font-normal ml-1">EE</span></span>
//             <span className="text-sm font-semibold text-gray-400 mt-1">Available Credits</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span className="text-4xl font-extrabold flex items-baseline">98<span className="text-xl text-gray-400 font-normal">/100</span></span>
//             <span className="text-sm font-semibold text-gray-400 mt-1">Sync Health</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Events Container (Replaces "My Courses") */}
//       <div className="bg-white rounded-[32px] p-8 shadow-sm flex flex-col flex-1 min-h-[500px]">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-xl font-extrabold text-[#1E2332]">Upcoming Events</h2>
//           <button className="text-sm font-bold text-gray-400 hover:text-black transition">See all</button>
//         </div>
        
//         {events.length === 0 ? (
//           <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
//             No events found.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {events.map((event) => (
//               <EventCard 
//                 key={event.id} 
//                 event={event} 
//                 onViewDetails={(e) => console.log("Open Modal for:", e.id)}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }