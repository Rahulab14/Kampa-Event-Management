const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not configured in .env");
}

async function request(params: Record<string, any> = {}) {
  const query = new URLSearchParams(params);

  const response = await fetch(`${API_URL}?${query.toString()}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "API returned an error");
  }

  return data;
}

export async function getEvents(params: Record<string, any> = {}) {
  return request({
    action: "events",
    ...params,
  });
}

export async function getEventById(id: string | number) {
  return request({
    action: "event",
    id,
  });
}

export async function searchEvents(query: string) {
  return request({
    action: "search",
    q: query,
  });
}

export async function getCategories() {
  return request({
    action: "categories",
  });
}

export async function getDepartments() {
  return request({
    action: "departments",
  });
}

export async function getStats() {
  return request({
    action: "stats",
  });
}

export async function checkHealth() {
  return request({
    action: "health",
  });
}