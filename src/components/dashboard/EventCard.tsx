import { ArrowRight, CalendarDays, MapPin, Trophy, Users, Zap } from "lucide-react";
import type { Event } from "../../types/event";

interface EventCardProps {
  event: Event;
  onViewDetails?: (event: Event) => void;
}

function formatCurrency(value?: number | string) {
  if (!value || value === 0 || value === "0") return "Free";
  const num = Number(value);
  return isNaN(num) ? String(value) : `₹${num.toLocaleString("en-IN")}`;
}

const categoryStyles: Record<string, string> = {
  Hackathon: "bg-emerald-500 text-white",
  Workshop: "bg-sky-500 text-white",
  Competition: "bg-violet-500 text-white",
  Seminar: "bg-orange-500 text-white",
  Conference: "bg-indigo-500 text-white",
  Technical: "bg-cyan-500 text-white",
};

export function EventCard({ event, onViewDetails }: EventCardProps) {
  const categoryClass = categoryStyles[event.type] ?? "bg-emerald-500 text-white";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      {/* IMAGE CONTAINER */}
      <div className="relative h-[185px] shrink-0 overflow-hidden bg-slate-100">
        {event.media?.[0]?.url ? (
          <img
            src={event.media[0].url}
            alt={event.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
            <div className="text-center">
              <div className="text-4xl mb-2">🌱</div>
              <p className="text-sm font-bold text-emerald-800">Kampa Event</p>
            </div>
          </div>
        )}

        <div className="absolute left-4 top-4">
          <span className={`rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${categoryClass}`}>
            {event.type || "Event"}
          </span>
        </div>

        {event.status && (
          <div className="absolute right-4 top-4">
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
              {event.status}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1">{event.name}</h3>
        <p className="mt-1 text-sm font-semibold text-slate-500 line-clamp-1">{event.shortDescription || "No description available."}</p>

        {/* EVENT INFO GRID */}
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4">
          <div className="flex min-w-0 items-center gap-2">
            <CalendarDays size={17} className="shrink-0 text-slate-400" />
            <span className="truncate text-xs font-semibold text-slate-700">
              {event.startDate || "Date TBA"}
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <MapPin size={17} className="shrink-0 text-slate-400" />
            <span className="truncate text-xs font-semibold text-slate-700">
              {event.venue || "Venue TBA"}
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <Users size={17} className="shrink-0 text-slate-400" />
            <span className="truncate text-xs font-semibold text-slate-700">
              {event.teamSize || "All students"}
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <Trophy size={17} className="shrink-0 text-orange-500" />
            <span className="truncate text-xs font-bold text-orange-600">
              {formatCurrency(event.prizePool)}
            </span>
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="mt-auto pt-6 flex items-center justify-between gap-2">
          {event.eeCredits ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700">
              <Zap size={14} fill="currentColor" />
              {event.eeCredits} EE Credit{Number(event.eeCredits) !== 1 ? "s" : ""}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-500">
              No EE Credits
            </span>
          )}

          <button
            onClick={() => onViewDetails?.(event)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-700"
          >
            View Details
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}