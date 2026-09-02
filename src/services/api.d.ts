declare module "api" {
  export function getEvents(params?: Record<string, any>): Promise<any>;
  export function getEventById(id: string | number): Promise<any>;
  export function searchEvents(query: string): Promise<any>;
  export function getCategories(): Promise<any>;
  export function getDepartments(): Promise<any>;
  export function getStats(): Promise<any>;
  export function checkHealth(): Promise<any>;
}