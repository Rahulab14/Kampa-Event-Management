import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import type { Event } from "../types/event";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);

        const result = await getEvents();

        setEvents(result.events || []);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load events"
        );
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  return {
    events,
    loading,
    error,
  };
}