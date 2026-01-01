"use client";

import {
  MapContainer,
  TileLayer,
  Polygon,
  ImageOverlay,
  Pane,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { TerritoryData } from "../types/maps";

// Max bounds to keep the user focused on DIY area
const maxBounds: L.LatLngBoundsExpression = [
  [-8.5, 109.5], // SouthWest
  [-7.3, 111.4], // NorthEast
];

interface FullMapProps {
  territories: TerritoryData[];
  fullTerritories: TerritoryData[];
  onSelectTerritory: (territory: TerritoryData | null) => void;
  selectedTerritory: TerritoryData | null;
}

export default function FullMap({
  territories,
  fullTerritories,
  onSelectTerritory,
  selectedTerritory,
}: FullMapProps) {
  // Fix leaflet icon issue in Next.js
  useEffect(() => {
    // @ts-expect-error: _getIconUrl is missing in type definition
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  const handleSelectTerritory = (territory: TerritoryData | null) => {
    console.log("Selected Territory:", territory);
  };
  return (
    <div
      key={`map-wrapper-${territories.length}-${fullTerritories.length}`}
      className="h-full w-full bg-[#022c22]"
    >
      <MapContainer
        center={[-7.7862, 110.3798]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full"
        maxBounds={maxBounds}
        minZoom={9}
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; Google Maps"
          url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        />

        <Pane name="territory-images" style={{ zIndex: 500 }} />
        <Pane name="territory-borders" style={{ zIndex: 600 }} />

        {/* Pembagian Territories (Base Layer) */}
        {fullTerritories.map((t) => (
          <Polygon
            key={t.id}
            positions={t.coordinates}
            pathOptions={{
              color: t.color,
              fillColor: t.color,
              fillOpacity: 0.4,
              weight: 1,
            }}
            eventHandlers={{
              click: () => handleSelectTerritory(t),
            }}
          ></Polygon>
        ))}

        {/* User Territories (Overlay Layer) */}
        {territories.map((t) => {
          const bounds = L.latLngBounds(t.coordinates);

          return (
            <div key={t.id}>
              {t.image && (
                <ImageOverlay
                  url={t.image}
                  bounds={bounds}
                  opacity={1}
                  zIndex={10}
                  pane="territory-images"
                />
              )}
              <Polygon
                positions={t.coordinates}
                pathOptions={{
                  color: t.color,
                  fillColor: t.image ? "transparent" : t.color,
                  fillOpacity: t.image
                    ? 0
                    : selectedTerritory?.id === t.id
                    ? 1
                    : 0.9,
                  weight: selectedTerritory?.id === t.id ? 2 : 0,
                }}
                pane="territory-borders"
                eventHandlers={{
                  click: () => onSelectTerritory(t),
                }}
              >
                {/* <Popup className="custom-popup" closeButton={false}>
                <div className="p-1">
                  <h3 className="font-bold text-gray-900">{t.name}</h3>
                  <p className="text-xs text-gray-600">{t.owner}</p>
                </div>
              </Popup> */}
              </Polygon>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
