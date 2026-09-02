import { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventModal } from "../components/features/EventModal";
import type { Event } from "../types/event";
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  MapPin, Clock, ServerCrash, RefreshCcw 
} from "lucide-react";

// ==========================================
// CUSTOM ANIMATED SVG KAMPA LOADER
// ==========================================
function KampaLoader({ text = "Loading Kampa Calendar..." }: { text?: string }) {
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
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B82126]"></div>
      </div>
    </div>
  );
}

const categoryTheme: Record<string, { bg: string; border: string; text: string; dot: string; solid: string }> = {
  Hackathon: { bg: "bg-[#F4EBFE]", border: "border-[#8B7FF9]", text: "text-[#8B7FF9]", dot: "bg-[#8B7FF9]", solid: "bg-[#8B7FF9] text-white" },
  Workshop: { bg: "bg-[#EBF1FF]", border: "border-[#4C6FFF]", text: "text-[#4C6FFF]", dot: "bg-[#4C6FFF]", solid: "bg-[#4C6FFF] text-white" },
  Competition: { bg: "bg-[#FDF6E3]", border: "border-[#E6B02E]", text: "text-[#E6B02E]", dot: "bg-[#E6B02E]", solid: "bg-[#E6B02E] text-white" },
  Seminar: { bg: "bg-[#E3F8E8]", border: "border-[#4ADE80]", text: "text-[#4ADE80]", dot: "bg-[#4ADE80]", solid: "bg-[#4ADE80] text-white" },
  default: { bg: "bg-[#F8F9FA]", border: "border-[#B82126]", text: "text-[#B82126]", dot: "bg-[#B82126]", solid: "bg-[#B82126] text-white" },
};

function getInitials(name: string) {
  if (!name) return "KLU";
  const words = name.trim().split(" ");
  return words.length >= 2 ? (words[0][0] + words[1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
}

function toISODate(date: Date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
}

export function MySchedule() {
  const { events, loading, error } = useEvents();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"Month" | "Week" | "Day">("Day");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handlePrev = () => {
    const prev = new Date(currentDate);
    if (view === "Day") prev.setDate(prev.getDate() - 1);
    if (view === "Week") prev.setDate(prev.getDate() - 7);
    if (view === "Month") prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const handleNext = () => {
    const next = new Date(currentDate);
    if (view === "Day") next.setDate(next.getDate() + 1);
    if (view === "Week") next.setDate(next.getDate() + 7);
    if (view === "Month") next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const handleToday = () => setCurrentDate(new Date());

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentDate]);

  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(lastDay);
    if (endDate.getDay() !== 6) endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const days = [];
    let current = new Date(startDate);
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, [currentDate]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, Event[]> = {};
    events.forEach(event => {
      if (!event.startDate) return;
      const dateKey = event.startDate.split('T')[0];
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(event);
    });
    Object.keys(map).forEach(key => {
      map[key].sort((a, b) => {
        const timeA = a.startDate.split('T')[1] || "09:00";
        const timeB = b.startDate.split('T')[1] || "09:00";
        return timeA.localeCompare(timeB);
      });
    });
    return map;
  }, [events]);

  let headerTitle = "";
  if (view === "Day") {
    headerTitle = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } else if (view === "Week") {
    const start = weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    headerTitle = `${start} - ${end}`;
  } else {
    headerTitle = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  // Updated Loading State using KampaLoader
  if (loading) {
    return <KampaLoader text="Loading Kampa Calendar..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <ServerCrash size={40} className="mx-auto mb-4 text-[#B82126]" />
          <h2 className="mb-2 text-xl font-bold text-black">Calendar Sync Failed</h2>
          <p className="mb-6 text-sm text-gray-500">{error}</p>
          <button onClick={() => window.location.reload()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition-transform active:scale-95">
            <RefreshCcw size={16} /> Retry Sync
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-12 w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-sm font-bold text-[#B82126] flex items-center gap-2">
            <CalendarIcon size={16} /> My Schedule
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#000000] mt-1 tracking-tight">
            Event Calendar
          </h1>
        </div>
        <div className="flex bg-white rounded-xl p-1 border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] w-fit">
          {(["Month", "Week", "Day"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${view === v ? "bg-[#000000] text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-gray-50"}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">{headerTitle}</h2>
          <div className="flex items-center gap-3">
            <button onClick={handleToday} className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">Today</button>
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full border border-gray-200">
              <button onClick={handlePrev} className="p-2 rounded-full hover:bg-white hover:shadow-sm text-gray-600 transition-all"><ChevronLeft size={20} /></button>
              <button onClick={handleNext} className="p-2 rounded-full hover:bg-white hover:shadow-sm text-gray-600 transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>

        {view === "Day" && (() => {
          const isoDate = toISODate(currentDate);
          const todaysEvents = eventsByDate[isoDate] || [];

          return (
            <div className="relative pt-4">
              {todaysEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100"><CalendarIcon size={28} className="text-gray-300" /></div>
                  <h3 className="text-lg font-bold text-gray-900">No events scheduled</h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-xs">Use the arrows above to check other days.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-8 relative before:absolute before:inset-y-0 before:left-[4.5rem] sm:before:left-[5.5rem] before:w-px before:bg-gray-100">
                  {todaysEvents.map((event, index) => {
                    const theme = categoryTheme[event.type] || categoryTheme.default;
                    const startTime = event.startDate.includes('T') ? new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : `${9 + (index * 2)}:00 AM`;
                    const endHour = parseInt(startTime) + (Number(event.durationHours) || 2);
                    const endTime = `${endHour > 12 ? endHour - 12 : endHour}:00 ${endHour >= 12 ? 'PM' : 'AM'}`;

                    return (
                      <div key={event.id} className="relative flex items-start gap-4 sm:gap-8 group">
                        <div className="w-14 sm:w-20 pt-4 shrink-0 text-right">
                          <span className="text-sm font-bold text-gray-600 block">{startTime.split(' ')[0]}</span>
                          <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">{startTime.split(' ')[1]}</span>
                        </div>
                        <div className={`absolute left-[4.5rem] sm:left-[5.5rem] top-6 -ml-[5px] h-2.5 w-2.5 rounded-full ring-4 ring-white shadow-sm z-10 transition-transform group-hover:scale-150 ${theme.dot}`}></div>
                        
                        <div onClick={() => handleEventClick(event)} className={`flex-1 rounded-[24px] p-5 sm:p-6 shadow-sm border-l-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer relative overflow-hidden ${theme.bg} ${theme.border}`}>
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-bold text-gray-900 bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm">{startTime} - {endTime}</span>
                                <span className={`text-[11px] font-extrabold uppercase tracking-wider ${theme.text}`}>{event.type}</span>
                              </div>
                              <h3 className="text-lg sm:text-xl font-extrabold text-[#000000] leading-tight mb-2 pr-8">{event.name}</h3>
                              <p className="text-sm text-gray-700 font-medium line-clamp-2 max-w-xl">{event.shortDescription || "No detailed description provided."}</p>
                              <div className="flex flex-wrap items-center gap-4 mt-5">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-white/50 px-2.5 py-1.5 rounded-lg"><MapPin size={14} className={theme.text} />{event.venue || "Venue TBA"}</div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-white/50 px-2.5 py-1.5 rounded-lg"><Clock size={14} className={theme.text} />{event.durationHours ? `${event.durationHours} Hours` : "2 Hours"}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 bg-white/40 p-2 pr-4 rounded-full backdrop-blur-sm">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner ${theme.solid} font-black text-xs tracking-wider`}>{getInitials(event.organizer)}</div>
                              <div className="hidden sm:block">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Organizer</p>
                                <p className="text-xs font-extrabold text-black truncate max-w-[100px]">{event.organizer || "KLU"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}

        {view === "Week" && (
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 border-t border-gray-100 pt-6">
            {weekDays.map((day, i) => {
              const isToday = toISODate(day) === toISODate(new Date());
              const dayEvents = eventsByDate[toISODate(day)] || [];
              return (
                <div key={i} className="flex flex-col gap-4 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-0 pb-4 sm:pb-0 pr-0 sm:pr-4">
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <div className={`mx-auto mt-1 flex h-8 w-8 items-center justify-center rounded-full text-lg font-black ${isToday ? 'bg-[#000000] text-white shadow-md' : 'text-gray-900'}`}>{day.getDate()}</div>
                  </div>
                  <div className="flex flex-col gap-2 h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                    {dayEvents.map(event => {
                      const theme = categoryTheme[event.type] || categoryTheme.default;
                      return (
                        <div key={event.id} onClick={() => handleEventClick(event)} className={`p-3 rounded-xl border-l-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group relative ${theme.bg} ${theme.border}`}>
                          <p className="text-[10px] font-bold text-gray-500 mb-0.5 opacity-80">{event.startDate.includes('T') ? new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "09:00 AM"}</p>
                          <p className="text-xs font-bold text-[#000000] leading-tight line-clamp-2">{event.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {view === "Month" && (
          <div className="w-full">
            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-t-xl overflow-hidden">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-gray-50 py-3 text-center text-xs font-extrabold text-gray-500 uppercase tracking-widest">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200 border-x border-b border-gray-200 rounded-b-xl overflow-hidden">
              {monthDays.map((day, i) => {
                const dateKey = toISODate(day);
                const dayEvents = eventsByDate[dateKey] || [];
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const isToday = dateKey === toISODate(new Date());

                return (
                  <div key={i} className={`min-h-[120px] bg-white p-2 transition-colors hover:bg-gray-50 ${!isCurrentMonth ? 'opacity-40' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${isToday ? 'bg-[#000000] text-white shadow-md' : 'text-gray-900'}`}>{day.getDate()}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 overflow-hidden">
                      {dayEvents.slice(0, 3).map(event => {
                        const theme = categoryTheme[event.type] || categoryTheme.default;
                        return (
                          <div key={event.id} onClick={() => handleEventClick(event)} className={`truncate rounded px-2 py-1 text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity ${theme.solid}`} title={event.name}>
                            {event.name}
                          </div>
                        );
                      })}
                      {dayEvents.length > 3 && <div className="text-[10px] font-bold text-gray-400 pl-1">+ {dayEvents.length - 3} more</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}