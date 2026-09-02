// // import { ArrowRight, CalendarDays, MapPin, Trophy, Users, Zap } from "lucide-react";
// // import type { Event } from "../../types/event";

// // interface EventCardProps {
// //   event: Event;
// //   onViewDetails?: (event: Event) => void;
// // }

// // function formatCurrency(value?: number | string) {
// //   if (!value || value === 0 || value === "0") return "Free";
// //   const num = Number(value);
// //   return isNaN(num) ? String(value) : `₹${num.toLocaleString("en-IN")}`;
// // }

// // const categoryStyles: Record<string, string> = {
// //   Hackathon: "bg-emerald-600 text-white",
// //   Workshop: "bg-sky-500 text-white",
// //   Competition: "bg-violet-500 text-white",
// //   Seminar: "bg-orange-500 text-white",
// //   Technical: "bg-cyan-500 text-white",
// // };

// // export function EventCard({ event, onViewDetails }: EventCardProps) {
// //   // Fallback to a default color if the category isn't in our list
// //   const categoryClass = categoryStyles[event.type] ?? "bg-brand-600 text-white";

// //   // Safely extract the first image if it exists
// //   const imageUrl = event.media && event.media.length > 0 ? event.media[0].url : null;

// //   return (
// //     <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
      
// //       {/* Image Banner */}
// //       <div className="relative h-48 w-full overflow-hidden bg-gray-100">
// //         {imageUrl ? (
// //           <img src={imageUrl} alt={event.name} className="h-full w-full object-cover" />
// //         ) : (
// //           <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
// //             <div className="text-center">
// //               <div className="text-4xl mb-2">🌱</div>
// //               <p className="text-sm font-bold text-emerald-800">Kampa Event</p>
// //             </div>
// //           </div>
// //         )}
        
// //         {/* Top Badges (Using real Kampa fields now) */}
// //         <div className="absolute left-3 top-3 flex gap-2">
// //           <span className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-sm ${categoryClass}`}>
// //             {event.type || "Event"}
// //           </span>
// //         </div>

// //         {event.status && event.status !== "READY" && (
// //           <div className="absolute right-3 top-3 flex gap-2">
// //             <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-md shadow-sm">
// //               {event.status}
// //             </span>
// //           </div>
// //         )}
// //       </div>

// //       {/* Content */}
// //       <div className="flex flex-1 flex-col p-5">
// //         <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{event.name}</h3>
// //         <p className="mt-1 text-sm font-medium text-gray-600 line-clamp-2 min-h-[40px]">
// //           {event.shortDescription || event.description || "No description available."}
// //         </p>

// //         {/* Meta Grid */}
// //         <div className="mt-5 grid grid-cols-2 gap-y-3 gap-x-2 text-sm font-medium text-gray-700">
// //           <div className="flex items-center gap-2">
// //             <CalendarDays size={16} className="text-gray-400 shrink-0" />
// //             <span className="truncate">{event.startDate || "Date TBA"}</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <MapPin size={16} className="text-gray-400 shrink-0" />
// //             <span className="truncate">{event.venue || "Venue TBA"}</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <Users size={16} className="text-gray-400 shrink-0" />
// //             <span className="truncate">{event.teamSize || "All students"}</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <Trophy size={16} className="text-orange-500 shrink-0" />
// //             <span className="truncate text-orange-600 font-bold">{formatCurrency(event.prizePool)}</span>
// //           </div>
// //         </div>

// //         {/* Footer Actions */}
// //         <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
// //           {event.eeCredits ? (
// //             <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-600">
// //               <Zap size={14} className="fill-current" />
// //               {event.eeCredits} EE Credit{Number(event.eeCredits) !== 1 ? 's' : ''}
// //             </div>
// //           ) : (
// //             <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-gray-500">
// //               No EE Credits
// //             </div>
// //           )}
          
// //           <button 
// //             onClick={() => onViewDetails && onViewDetails(event)}
// //             className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
// //           >
// //             View Details <ArrowRight size={16} />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { Bookmark, Star, Clock, Trophy } from "lucide-react";
// import type { Event } from "../../types/event";

// interface EventCardProps {
//   event: Event;
//   onViewDetails?: (event: Event) => void;
// }

// // Map Kampa event types to the pastel color palette from your design
// const categoryTheme: Record<string, { bg: string; text: string; icon: string }> = {
//   Hackathon: { bg: "bg-[#F4EBFE]", text: "text-[#8B7FF9]", icon: "💻" },
//   Workshop: { bg: "bg-[#EBF1FF]", text: "text-[#4C6FFF]", icon: "🛠️" },
//   Competition: { bg: "bg-[#FDF6E3]", text: "text-[#E6B02E]", icon: "🏆" },
//   Seminar: { bg: "bg-[#E3F8E8]", text: "text-[#4ADE80]", icon: "🎤" },
//   default: { bg: "bg-gray-100", text: "text-gray-500", icon: "✨" },
// };

// export function EventCard({ event, onViewDetails }: EventCardProps) {
//   const theme = categoryTheme[event.type] || categoryTheme.default;
//   const imageUrl = event.media?.[0]?.url;

//   return (
//     <div 
//       onClick={() => onViewDetails?.(event)}
//       className="flex flex-col h-full cursor-pointer group"
//     >
//       {/* Top Colored Banner / Image */}
//       <div className={`${theme.bg} rounded-3xl p-5 mb-4 relative h-[200px] flex items-end overflow-hidden transition-transform duration-300 group-hover:-translate-y-1`}>
//         {imageUrl && (
//           <img src={imageUrl} alt={event.name} className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" />
//         )}
        
//         <Bookmark className={`absolute top-5 right-5 w-6 h-6 ${theme.text} fill-current z-10`} />
        
//         <div className="bg-white rounded-xl p-2.5 flex items-center gap-2 shadow-sm relative z-10">
//            <span className="text-xl">{theme.icon}</span>
//            <span className="font-bold text-sm">{event.type || "Event"}</span>
//         </div>
//       </div>

//       {/* Content */}
//       <h3 className="font-bold text-[16px] text-[#1E2332] leading-snug mb-2 line-clamp-2">
//         {event.name}
//       </h3>
//       <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
//         {event.shortDescription || "No description available."}
//       </p>

//       {/* Bottom Meta */}
//       <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mt-auto pt-4 border-t border-gray-100">
//         <div className="flex items-center gap-1.5">
//           <Clock className="w-3.5 h-3.5" />
//           <span>{event.startDate || "TBA"}</span>
//         </div>
        
//         {event.eeCredits ? (
//           <div className={`flex items-center gap-1.5 ${theme.text}`}>
//             <Star className="w-3.5 h-3.5 fill-current" />
//             <span>{event.eeCredits} EE</span>
//           </div>
//         ) : (
//           <div className="flex items-center gap-1.5 text-gray-400">
//             <Trophy className="w-3.5 h-3.5" />
//             <span>{event.prizePool ? `₹${event.prizePool}` : "Free"}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { 
  Bookmark, Clock, Trophy, Zap, 
  Code2, Terminal, Cpu, // Hackathon icons
  Wrench, Lightbulb, Compass, // Workshop icons
  Target, Rocket, Award, // Competition icons
  Mic, MessagesSquare, // Seminar icons
  Sparkles, Hexagon // Default icons
} from "lucide-react";
import type { Event } from "../../types/event";

interface EventCardProps {
  event: Event;
  onViewDetails?: (event: Event) => void;
}

// 1. Dynamic Theme Mapping
// Integrates specific event themes with your core Varsity Red (#B82126) and Pitch Black (#000000) branding
const categoryTheme: Record<string, { bg: string; fg: string; accent: string }> = {
  Competition: { bg: "bg-[#F4EBFE]", fg: "text-[#8B7FF9]", accent: "bg-[#8B7FF9]" }, 
  Workshop: { bg: "bg-[#EBF1FF]", fg: "text-[#4C6FFF]", accent: "bg-[#4C6FFF]" },  
  Hackathon: { bg: "bg-[#FDF6E3]", fg: "text-[#E6B02E]", accent: "bg-[#E6B02E]" }, 
  Seminar: { bg: "bg-[#E3F8E8]", fg: "text-[#4ADE80]", accent: "bg-[#4ADE80]" }, 
  // Fallback uses your professional Varsity Red branding
  default: { bg: "bg-[#F8F9FA]", fg: "text-[#B82126]", accent: "bg-[#B82126]" }, 
};

// 2. Helper to generate 2-letter logo initials
function getInitials(name: string) {
  if (!name) return "EV";
  const words = name.trim().split(" ");
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

// 3. Intelligent Background Watermarks Component
// Renders unique, faint background elements depending on the exact event category
function EventWatermarks({ type }: { type: string }) {
  const eventType = (type || "").toLowerCase();

  // Hackathon: Tech, Code, and Logic symbols
  if (eventType.includes("hackathon")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none text-[#000000] opacity-[0.04]">
        <Code2 className="absolute -bottom-4 -right-4 w-32 h-32 rotate-12 stroke-[1.5]" />
        <Terminal className="absolute top-6 left-4 w-20 h-20 -rotate-12 stroke-[1.5]" />
        <span className="absolute bottom-10 left-8 text-5xl font-black font-mono tracking-tighter">{`</>`}</span>
      </div>
    );
  }
  
  // Workshop: Tools, Ideas, and Creation symbols
  if (eventType.includes("workshop")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none text-[#000000] opacity-[0.04]">
        <Wrench className="absolute -top-4 -right-2 w-28 h-28 rotate-45 stroke-[1.5]" />
        <Lightbulb className="absolute bottom-4 left-6 w-24 h-24 -rotate-12 stroke-[1.5]" />
        <Compass className="absolute bottom-8 right-1/4 w-16 h-16 stroke-[1.5]" />
      </div>
    );
  }

  // Competition: Winning, Goals, and Targets
  if (eventType.includes("competition")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none text-[#000000] opacity-[0.04]">
        <Target className="absolute -bottom-6 -right-4 w-36 h-36 stroke-[1.5]" />
        <Rocket className="absolute top-4 left-6 w-20 h-20 rotate-12 stroke-[1.5]" />
        <Award className="absolute bottom-12 left-1/3 w-16 h-16 -rotate-12 stroke-[1.5]" />
      </div>
    );
  }

  // Seminar/Talks: Communication and Networking
  if (eventType.includes("seminar") || eventType.includes("talk")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none text-[#000000] opacity-[0.04]">
        <Mic className="absolute bottom-0 right-4 w-28 h-28 rotate-12 stroke-[1.5]" />
        <MessagesSquare className="absolute top-4 left-4 w-20 h-20 -rotate-6 stroke-[1.5]" />
        <span className="absolute bottom-8 left-8 text-7xl font-serif font-black">“</span>
      </div>
    );
  }

  // Default Kampa Brand Theme (Abstract/Geometric)
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none text-[#000000] opacity-[0.03]">
      <Hexagon className="absolute -bottom-8 -right-4 w-40 h-40 rotate-12 stroke-[1.5]" />
      <Sparkles className="absolute top-6 left-6 w-16 h-16 stroke-[1.5]" />
      <Cpu className="absolute bottom-10 left-1/4 w-20 h-20 -rotate-12 stroke-[1.5]" />
    </div>
  );
}

export function EventCard({ event, onViewDetails }: EventCardProps) {
  const theme = categoryTheme[event.type] || categoryTheme.default;
  const initials = getInitials(event.name);

  return (
    <article 
      onClick={() => onViewDetails?.(event)}
      className="flex flex-col h-full cursor-pointer group bg-[#FFFFFF] rounded-[32px] p-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-400 ease-out"
    >
      {/* ========================================================= */}
      {/* TOP HERO BOX (Visual Identity)                              */}
      {/* ========================================================= */}
      <div className={`relative h-[220px] rounded-[24px] ${theme.bg} overflow-hidden flex items-center justify-center transition-colors duration-300`}>
        
        {/* Generative Background Graphics */}
        <EventWatermarks type={event.type} />

        {/* Top-Left Category Badge */}
        <div className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#000000]">
            {event.type || "Event"}
          </span>
        </div>

        {/* Top-Right Bookmark Icon */}
        <button className="absolute top-4 right-4 z-10 p-1 rounded-full transition-transform hover:scale-110 active:scale-95">
          <Bookmark className={`w-6 h-6 ${theme.fg} fill-current drop-shadow-sm`} />
        </button>

        {/* Center Floating Identity Pill */}
        <div className="relative z-10 bg-[#FFFFFF] rounded-[20px] p-2 pr-6 flex items-center gap-3.5 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.08)] max-w-[85%] transform transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12)]">
          {/* Accent Initial Block */}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${theme.accent} shadow-inner`}>
            <span className="font-black text-[#FFFFFF] text-[15px] tracking-wide">
              {initials}
            </span>
          </div>
          
          {/* Event Title */}
          <span className="font-extrabold text-[#000000] truncate text-[16px] tracking-tight">
            {event.name}
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BOTTOM METADATA (Information Architecture)                  */}
      {/* ========================================================= */}
      <div className="flex flex-col flex-1 px-4 pt-6 pb-3">
        <h3 className="font-extrabold text-[18px] text-[#000000] leading-tight mb-2 line-clamp-1 group-hover:text-[#B82126] transition-colors duration-300">
          {event.name}
        </h3>
        
        <p className="text-[14px] text-gray-500 line-clamp-2 mb-6 flex-1 font-medium leading-relaxed">
          {event.shortDescription || "Detailed event description will be updated soon."}
        </p>

        {/* Key Data Points */}
        <div className="flex items-center justify-between text-xs font-bold mt-auto pt-4 border-t border-gray-100/80">
          
          {/* Date */}
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
            <span>{event.startDate || "Date TBA"}</span>
          </div>
          
          {/* Reward/Credit Indicator */}
          {event.eeCredits ? (
            <div className={`flex items-center gap-1.5 ${theme.fg} bg-opacity-10 px-2.5 py-1 rounded-md`}>
              <Zap className="w-4 h-4 fill-current" />
              <span>{event.eeCredits} EE Credits</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md">
              <Trophy className="w-4 h-4 text-orange-500" strokeWidth={2.5} />
              <span>{event.prizePool ? `₹${event.prizePool}` : "Free"}</span>
            </div>
          )}
          
        </div>
      </div>
    </article>
  );
}