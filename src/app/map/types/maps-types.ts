export interface OwnerTerritory {
  id: string;
  name: string;
  owner: string;
  address: string;
  description: string;
  image?: string;
  coordinates: TerritoryData[]; // Simple polygon path for Leaflet
  link?: string; // Added for the link requirement
}

export interface TerritoryData {
  id?: string;
  name?: string;
  description?: string;
  link?: string;
  image?: string;
  price?: number;
  status?: string;
  coordinates: [number, number][];
}
