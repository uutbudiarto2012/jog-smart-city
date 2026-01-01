export interface TerritoryData {
  id: string;
  name: string;
  owner: string;
  address: string;
  description: string;
  color: string;
  image?: string;
  coordinates: [number, number][]; // Simple polygon path for Leaflet
  link?: string; // Added for the link requirement
}
