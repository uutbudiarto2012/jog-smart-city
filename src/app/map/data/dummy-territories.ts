import { TerritoryData } from "../types/maps";
import { mergeTerritories } from "../utils/territory";

export const dummyTerritories: TerritoryData[] = [
  {
    id: "1",
    name: "Kawasan Industri Besar User A",
    owner: "User A",
    address: "DI Yogyakarta (Merged Area)",
    description: "Zona industri User A (Gabungan 25 block)",
    color: "#10B981", // Green-500
    image: "https://lipsum.app/id/24/900x900",
    link: "/map/sample-smartcity",
    coordinates: mergeTerritories([
      // --- ROW 1 (Y: -7.92 to -7.94) ---
      {
        coordinates: [
          [-7.92, 110.48],
          [-7.92, 110.5],
          [-7.94, 110.5],
          [-7.94, 110.48],
        ],
      },
      {
        coordinates: [
          [-7.92, 110.5],
          [-7.92, 110.52],
          [-7.94, 110.52],
          [-7.94, 110.5],
        ],
      },
      {
        coordinates: [
          [-7.92, 110.52],
          [-7.92, 110.54],
          [-7.94, 110.54],
          [-7.94, 110.52],
        ],
      },
      {
        coordinates: [
          [-7.92, 110.54],
          [-7.92, 110.56],
          [-7.94, 110.56],
          [-7.94, 110.54],
        ],
      },
      {
        coordinates: [
          [-7.92, 110.56],
          [-7.92, 110.58],
          [-7.94, 110.58],
          [-7.94, 110.56],
        ],
      },

      // --- ROW 2 (Y: -7.94 to -7.96) ---
      {
        coordinates: [
          [-7.94, 110.48],
          [-7.94, 110.5],
          [-7.96, 110.5],
          [-7.96, 110.48],
        ],
      },
      {
        coordinates: [
          [-7.94, 110.5],
          [-7.94, 110.52],
          [-7.96, 110.52],
          [-7.96, 110.5],
        ],
      },
      {
        coordinates: [
          [-7.94, 110.52],
          [-7.94, 110.54],
          [-7.96, 110.54],
          [-7.96, 110.52],
        ],
      },
      {
        coordinates: [
          [-7.94, 110.54],
          [-7.94, 110.56],
          [-7.96, 110.56],
          [-7.96, 110.54],
        ],
      },
      {
        coordinates: [
          [-7.94, 110.56],
          [-7.94, 110.58],
          [-7.96, 110.58],
          [-7.96, 110.56],
        ],
      },

      // --- ROW 3 (Y: -7.96 to -7.98) ---
      {
        coordinates: [
          [-7.96, 110.48],
          [-7.96, 110.5],
          [-7.98, 110.5],
          [-7.98, 110.48],
        ],
      },
      {
        coordinates: [
          [-7.96, 110.5],
          [-7.96, 110.52],
          [-7.98, 110.52],
          [-7.98, 110.5],
        ],
      },
      {
        coordinates: [
          [-7.96, 110.52],
          [-7.96, 110.54],
          [-7.98, 110.54],
          [-7.98, 110.52],
        ],
      },
      {
        coordinates: [
          [-7.96, 110.54],
          [-7.96, 110.56],
          [-7.98, 110.56],
          [-7.98, 110.54],
        ],
      },
      {
        coordinates: [
          [-7.96, 110.56],
          [-7.96, 110.58],
          [-7.98, 110.58],
          [-7.98, 110.56],
        ],
      },

      // --- ROW 4 (Y: -7.98 to -8.00) ---
      {
        coordinates: [
          [-7.98, 110.48],
          [-7.98, 110.5],
          [-8.0, 110.5],
          [-8.0, 110.48],
        ],
      },
      {
        coordinates: [
          [-7.98, 110.5],
          [-7.98, 110.52],
          [-8.0, 110.52],
          [-8.0, 110.5],
        ],
      },
      {
        coordinates: [
          [-7.98, 110.52],
          [-7.98, 110.54],
          [-8.0, 110.54],
          [-8.0, 110.52],
        ],
      },
      {
        coordinates: [
          [-7.98, 110.54],
          [-7.98, 110.56],
          [-8.0, 110.56],
          [-8.0, 110.54],
        ],
      },
      {
        coordinates: [
          [-7.98, 110.56],
          [-7.98, 110.58],
          [-8.0, 110.58],
          [-8.0, 110.56],
        ],
      },

      // --- ROW 5 (Y: -8.00 to -8.02) ---
      {
        coordinates: [
          [-8.0, 110.48],
          [-8.0, 110.5],
          [-8.02, 110.5],
          [-8.02, 110.48],
        ],
      },
      {
        coordinates: [
          [-8.0, 110.5],
          [-8.0, 110.52],
          [-8.02, 110.52],
          [-8.02, 110.5],
        ],
      },
      {
        coordinates: [
          [-8.0, 110.52],
          [-8.0, 110.54],
          [-8.02, 110.54],
          [-8.02, 110.52],
        ],
      },
      {
        coordinates: [
          [-8.0, 110.54],
          [-8.0, 110.56],
          [-8.02, 110.56],
          [-8.02, 110.54],
        ],
      },
      {
        coordinates: [
          [-8.0, 110.56],
          [-8.0, 110.58],
          [-8.02, 110.58],
          [-8.02, 110.56],
        ],
      },
    ]), // Using the helper to merge!
  },
  {
    id: "2",
    name: "Kawasan Industri 409",
    owner: "User B",
    address: "DI Yogyakarta",
    description: "Zona industri 409 (Dimiliki User B)",
    color: "#EF4444", // Red-500
    image: "https://lipsum.app/id/24/900x900",
    link: "/map/sample-restaurant",
    coordinates: [
      [-7.92, 110.58],
      [-7.92, 110.6],
      [-7.94, 110.6],
      [-7.94, 110.58],
    ],
  },
  {
    id: "3",
    name: "Kawasan Industri Biru",
    owner: "User C",
    address: "DI Yogyakarta (East Side)",
    description: "Zona industri User C (Gabungan 2 block)",
    color: "#3B82F6", // Blue-500
    image: "https://lipsum.app/id/25/900x900",
    coordinates: mergeTerritories([
      {
        coordinates: [
          [-7.92, 110.6],
          [-7.92, 110.62],
          [-7.94, 110.62],
          [-7.94, 110.6],
        ],
      },
      {
        coordinates: [
          [-7.94, 110.6],
          [-7.94, 110.62],
          [-7.96, 110.62],
          [-7.96, 110.6],
        ],
      },
    ]),
  },
  {
    id: "4",
    name: "Gudang Kuning",
    owner: "User D",
    address: "DI Yogyakarta (South Side)",
    description: "Gudang Distribusi User D (Gabungan 4 block)",
    color: "#EAB308", // Yellow-500
    image: "https://lipsum.app/id/26/900x900",
    coordinates: mergeTerritories([
      {
        coordinates: [
          [-8.04, 110.5],
          [-8.04, 110.52],
          [-8.06, 110.52],
          [-8.06, 110.5],
        ],
      },
      {
        coordinates: [
          [-8.04, 110.52],
          [-8.04, 110.54],
          [-8.06, 110.54],
          [-8.06, 110.52],
        ],
      },
      {
        coordinates: [
          [-8.06, 110.5],
          [-8.06, 110.52],
          [-8.08, 110.52],
          [-8.08, 110.5],
        ],
      },
      {
        coordinates: [
          [-8.06, 110.52],
          [-8.06, 110.54],
          [-8.08, 110.54],
          [-8.08, 110.52],
        ],
      },
    ]),
  },
  {
    id: "5",
    name: "Pabrik Ungu",
    owner: "User E",
    address: "DI Yogyakarta (Small Factory)",
    description: "Pabrik Produksi User E",
    color: "#A855F7", // Purple-500
    image: "https://lipsum.app/id/27/900x900",
    coordinates: [
      [-7.98, 110.64],
      [-7.98, 110.66],
      [-8.0, 110.66],
      [-8.0, 110.64],
    ],
  },
];
