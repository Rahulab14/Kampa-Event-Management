export function formatDateTime(isoString: string | undefined | null) {
  if (!isoString) return "Date TBA";
  
  try {
    const date = new Date(isoString);
    
    // Formatting options for a clean, professional look
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',   // e.g., "Sep" (use 'long' for "September")
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true      // Converts to AM/PM format
    }).format(date);
    
  } catch (error) {
    return "Invalid Date";
  }
}