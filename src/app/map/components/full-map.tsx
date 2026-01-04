"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  ImageOverlay,
  MapContainer,
  Pane,
  Polygon,
  Rectangle,
  TileLayer,
} from "react-leaflet";
import { TerritoryData } from "../types/maps";
import { useTheme } from "next-themes";
import { useAccount } from "wagmi";

interface FullMapProps {
  territories: TerritoryData[];
  fullTerritories: TerritoryData[];
  onSelectTerritory: (territory: TerritoryData | null) => void;
  selectedTerritory: TerritoryData | null;
}

// Max bounds to keep the user focused on DIY area
const maxBounds: L.LatLngBoundsExpression = [
  [-8.5, 109.5], // SouthWest
  [-7.3, 111.4], // NorthEast
];

const colorsOwner = "#6366f1";
const colorsGuest = "#DEA937";
// const colorsNeutral = "#039303";

export default function FullMap({
  territories,
  fullTerritories,
  onSelectTerritory,
  selectedTerritory,
}: FullMapProps) {
  const { resolvedTheme } = useTheme();
  const { address } = useAccount();

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

  const [ele, setEle] = useState<{ coordinates: number[][] }[]>([]);
  const handleSelectTerritory = (territory: TerritoryData | null) => {
    if (territory) {
      setEle([
        ...ele,
        {
          coordinates: territory.coordinates,
        },
      ]);
    }
    // console.log("Selected Territory:", ele);
  };

  return (
    <div
      key={`map-wrapper-${territories.length}-${fullTerritories.length}`}
      className="h-full w-full z-0"
    >
      <MapContainer
        center={[-7.9158, 110.1224]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        maxBounds={maxBounds}
        minZoom={9}
        zoomControl={false}
        style={{ zIndex: 0, opacity: 0.9 }}
      >
        <TileLayer
          key={resolvedTheme}
          className={resolvedTheme === "dark" ? "google-map-dark" : ""}
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
              fillOpacity: 0.6,
              weight: 1,
              lineJoin: "round",
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
                <>
                  <ImageOverlay
                    url={t.image}
                    bounds={bounds}
                    opacity={1}
                    zIndex={1}
                    pane="territory-images"
                  />
                  <Rectangle
                    bounds={bounds}
                    pathOptions={{
                      color: address === t.owner ? colorsOwner : colorsGuest,
                      weight: 0,
                      fill: false,
                    }}
                    pane="territory-images"
                  />
                </>
              )}
              <Polygon
                positions={t.coordinates}
                pathOptions={{
                  color: address === t.owner ? colorsOwner : colorsGuest,
                  fillColor: t.image
                    ? "transparent"
                    : address === t.owner
                    ? colorsOwner
                    : colorsGuest,
                  fillOpacity: t.image ? 0 : 1,
                  weight: selectedTerritory?.id === t.id ? 1 : 1,
                }}
                pane="territory-borders"
                eventHandlers={{
                  click: () => onSelectTerritory(t),
                }}
              ></Polygon>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
