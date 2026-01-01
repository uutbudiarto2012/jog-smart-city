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
          [-7.7754, 110.3699],
          [-7.7754, 110.3708],
          [-7.7763, 110.3708],
          [-7.7763, 110.3699],
        ],
      },
      {
        coordinates: [
          [-7.7754, 110.3708],
          [-7.7754, 110.3717],
          [-7.7763, 110.3717],
          [-7.7763, 110.3708],
        ],
      },
      {
        coordinates: [
          [-7.7754, 110.3717],
          [-7.7754, 110.3726],
          [-7.7763, 110.3726],
          [-7.7763, 110.3717],
        ],
      },
      {
        coordinates: [
          [-7.7754, 110.3726],
          [-7.7754, 110.3735],
          [-7.7763, 110.3735],
          [-7.7763, 110.3726],
        ],
      },
      {
        coordinates: [
          [-7.7763, 110.3708],
          [-7.7763, 110.3717],
          [-7.7772, 110.3717],
          [-7.7772, 110.3708],
        ],
      },
    ]), // Using the helper to merge!
  },
  {
    id: "3",
    name: "Kawasan Industri Biru",
    owner: "User C",
    address: "DI Yogyakarta (East Side)",
    description: "Zona industri User C (Gabungan 2 block)",
    color: "#3B82F6", // Blue-500
    image: "https://lipsum.app/id/25/900x900",
    link: "/map/sample-restaurant",
    coordinates: mergeTerritories([
      {
        coordinates: [
          [-7.7781, 110.3726],
          [-7.7781, 110.3735],
          [-7.779, 110.3735],
          [-7.779, 110.3726],
        ],
      },
      {
        coordinates: [
          [-7.7781, 110.3735],
          [-7.7781, 110.3744],
          [-7.779, 110.3744],
          [-7.779, 110.3735],
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
    link: "/map/sample-restaurant",
    coordinates: mergeTerritories([
      {
        coordinates: [
          [-7.7799, 110.3717],
          [-7.7799, 110.3726],
          [-7.7808, 110.3726],
          [-7.7808, 110.3717],
        ],
      },
      {
        coordinates: [
          [-7.7799, 110.3726],
          [-7.7799, 110.3735],
          [-7.7808, 110.3735],
          [-7.7808, 110.3726],
        ],
      },
      {
        coordinates: [
          [-7.7799, 110.3735],
          [-7.7799, 110.3744],
          [-7.7808, 110.3744],
          [-7.7808, 110.3735],
        ],
      },
      {
        coordinates: [
          [-7.7799, 110.3744],
          [-7.7799, 110.3753],
          [-7.7808, 110.3753],
          [-7.7808, 110.3744],
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
    link: "/map/sample-smartcity",
    coordinates: [
      [-7.7781, 110.3789],
      [-7.7781, 110.3798],
      [-7.779, 110.3798],
      [-7.779, 110.3789],
    ],
  },
];
