import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";

import type { Event } from "../types/event";
import { EventCard } from "../components/dashboard/EventCard";
import { fetchEventsFromSheet } from "../services/sheetsService";

export function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEventsFromSheet();
        setEvents(fetchedEvents);
        setError(null);
      } catch (err) {
        setError("Failed to load events. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleViewDetails = (event: Event) => {
    navigate(`/events/${event.id}`, { state: { event } });
  };

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.shortDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "All" || event.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Get unique event types
  const eventTypes = ["All", ...new Set(events.map((e) => e.type))];

  return (
    <section className="mx-auto max-w-[1180px]">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-950">
            All Events
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Explore {events.length} college events and hackathons
          </p>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search events by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder-slate-400 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
          <Filter size={18} className="text-slate-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white text-sm font-medium text-slate-700 focus:outline-none"
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="mt-8">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-slate-500">Loading events...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
            <p className="text-lg font-semibold text-slate-600">
              No events found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
