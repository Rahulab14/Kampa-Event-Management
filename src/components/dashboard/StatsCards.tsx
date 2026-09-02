import { CalendarDays, Clock, Zap, Target } from "lucide-react";
import type { Event } from "../../types/event";

interface StatsCardsProps {
  events: Event[];
}

export function StatsCards({ events }: StatsCardsProps) {
  // 1. Calculate Total Events
  const totalEvents = events.length;

  // 2. Calculate Upcoming Events (Dates >= Today)
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter(e => e.startDate >= today).length;

  // 3. Calculate Average Duration (h)
  const eventsWithDuration = events.filter(e => e.durationHours && Number(e.durationHours) > 0);
  const totalHours = eventsWithDuration.reduce((sum, e) => sum + Number(e.durationHours), 0);
  const avgDuration = eventsWithDuration.length > 0 
    ? Math.round(totalHours / eventsWithDuration.length) 
    : 0;

  // 4. Calculate Total Available EE Credits
  const totalEeCredits = events.reduce((sum, e) => sum + (Number(e.eeCredits) || 0), 0);

  const stats = [
    {
      label: "Total Events",
      value: totalEvents.toString(),
      icon: CalendarDays,
      color: "text-[#B82126] bg-[#B82126]/10 border-[#B82126]/20", // Varsity Red Theme
    },
    {
      label: "Upcoming",
      value: upcomingEvents.toString(),
      icon: Target,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "Avg. Hrs",
      value: avgDuration.toString(),
      icon: Clock,
      color: "text-orange-600 bg-orange-50 border-orange-100",
    },
    {
      label: "Total EE Credits",
      value: totalEeCredits.toString(),
      icon: Zap,
      color: "text-[#8B7FF9] bg-[#8B7FF9]/10 border-[#8B7FF9]/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:flex sm:overflow-x-auto pb-4">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="flex sm:min-w-[160px] flex-col rounded-[24px] bg-[#FFFFFF] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 transition-transform hover:-translate-y-1.5 duration-300 ease-out"
        >
          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] border ${stat.color}`}>
            <stat.icon size={22} strokeWidth={2.5} />
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#000000] tracking-tight">
            {stat.value}
          </span>
          <span className="text-[12px] font-bold text-gray-500 mt-1.5 uppercase tracking-wider">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}