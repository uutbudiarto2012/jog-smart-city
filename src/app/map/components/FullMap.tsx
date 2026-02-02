"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Pane,
  Polygon,
  TileLayer,
  ZoomControl,
  useMap,
  Rectangle,
  useMapEvents,
} from "react-leaflet";
import { OwnerTerritory, TerritoryData } from "../types/maps-types";
import { useTheme } from "next-themes";
import { useAccount } from "wagmi";
import Lagend from "./Lagend";
import {
  COLOR_IN_CART,
  COLOR_LISTED,
  COLOR_NEUTRAL,
  COLOR_NOT_AVAILAIBLE,
  COLOR_OWNER,
  COLOR_SELECTED,
} from "@/static/color-block-map";

interface FullMapProps {
  territories: OwnerTerritory[];
  fullTerritories: TerritoryData[];
  onSelectTerritory: (territory: TerritoryData | null) => void;
  selectedTerritory: TerritoryData | null;
  cart: TerritoryData[];
  onMultiSelect?: (territories: TerritoryData[]) => void;
  mode?: "BUY" | "SELL";
}

// Max bounds to keep the user focused on DIY area
const maxBounds: L.LatLngBoundsExpression = [
  [-8.5, 109.5], // SouthWest
  [-7.3, 111.4], // NorthEast
];

// Helper component for Shift + Drag selection
function BoxSelection({
  onSelect,
  fullTerritories,
  userTerritories,
  mode = "BUY",
  userAddress,
}: {
  onSelect: (territories: TerritoryData[]) => void;
  fullTerritories: TerritoryData[];
  userTerritories: OwnerTerritory[];
  mode?: "BUY" | "SELL";
  userAddress?: string;
}) {
  const map = useMap();
  const [startPoint, setStartPoint] = useState<L.LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<L.LatLng | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    // Disable default Box Zoom to allow Shift+Drag for selection
    map.boxZoom.disable();

    return () => {
      map.boxZoom.enable();
    };
  }, [map]);

  useMapEvents({
    mousedown(e) {
      if (e.originalEvent.shiftKey) {
        map.dragging.disable();
        setStartPoint(e.latlng);
        setEndPoint(e.latlng);
        setIsSelecting(true);
      }
    },
    mousemove(e) {
      if (isSelecting && startPoint) {
        setEndPoint(e.latlng);
      }
    },
    mouseup() {
      if (isSelecting && startPoint && endPoint) {
        const bounds = L.latLngBounds(startPoint, endPoint);

        let candidates: TerritoryData[] = [];

        if (mode === "BUY") {
          candidates = fullTerritories;
        } else {
          // For SELL mode, gather all user's blocks
          // Filter for owned by this user
          candidates = userTerritories
            .filter(
              (ut) => ut.address === userAddress || ut.owner === userAddress,
            ) // Check robust match
            .flatMap((ut) => ut.coordinates);
        }

        const selected = candidates.filter((t) => {
          // Extra status check for BUY
          if (mode === "BUY" && t.status !== "LISTED") return false;

          // Check intersection
          const lat = t.coordinates[0][0];
          const lng = t.coordinates[0][1];
          return bounds.contains([lat, lng]);
        });

        if (selected.length > 0) {
          onSelect(selected);
        }

        // Reset
        setIsSelecting(false);
        setStartPoint(null);
        setEndPoint(null);
        map.dragging.enable();
      }
    },
  });

  if (!isSelecting || !startPoint || !endPoint) return null;

  return (
    <Rectangle
      bounds={L.latLngBounds(startPoint, endPoint)}
      pathOptions={{
        color: mode === "BUY" ? "#3b82f6" : "#8b5cf6", // Blue for Buy, Purple for Sell
        weight: 1,
        fillColor: mode === "BUY" ? "#3b82f6" : "#8b5cf6",
        fillOpacity: 0.2,
        dashArray: "5, 5",
      }}
    />
  );
}

export default function FullMap({
  territories,
  fullTerritories,
  onSelectTerritory,
  selectedTerritory,
  cart,
  onMultiSelect,
  mode = "BUY",
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

  const filteredFullTerritories = useMemo(() => {
    // Create a Set of stringified coordinates from the user's territories for efficient lookup
    const occupiedCoords = new Set<string>();

    territories.forEach((ter) => {
      ter.coordinates.forEach((subBlock) => {
        // Use JSON.stringify for coordinate comparison
        // Assuming coordinates are consistent (order and precision)
        occupiedCoords.add(subBlock.id);
      });
    });

    // Filter fullTerritories to exclude those that are already in occupiedCoords
    return fullTerritories.filter((t) => {
      return !occupiedCoords.has(t.id);
    });
  }, [territories, fullTerritories]);

  return (
    <div
      key={`map-wrapper-${territories.length}-${fullTerritories.length}`}
      className="h-full w-full z-0 relative"
    >
      <MapContainer
        center={[-7.9158, 110.1224]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
        maxBounds={maxBounds}
        minZoom={9}
        zoomControl={false}
        style={{ zIndex: 0, opacity: 0.9 }}
      >
        <TileLayer
          key={resolvedTheme}
          attribution="&copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
          url={
            resolvedTheme === "dark"
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          }
        />
        <ZoomControl position="bottomleft" />
        <Pane name="territory-images" style={{ zIndex: 500 }} />
        <Pane name="territory-borders" style={{ zIndex: 600 }} />

        {/* Shift+Drag Selection Logic */}
        {onMultiSelect && (
          <BoxSelection
            onSelect={onMultiSelect}
            fullTerritories={filteredFullTerritories}
            userTerritories={territories}
            mode={mode}
            userAddress={address}
          />
        )}

        {/* Pembagian Territories (Base Layer) */}
        {filteredFullTerritories.map((t) => {
          const isSelected = selectedTerritory?.id === t.id;
          const isInCart = cart.some((c) => c.id === t.id);

          let fillColor = COLOR_NEUTRAL;
          let strokeColor = COLOR_NEUTRAL;

          if (t.status === "LISTED") {
            fillColor = COLOR_LISTED;
            strokeColor = COLOR_LISTED;
          }

          if (isInCart) {
            fillColor = COLOR_IN_CART;
            strokeColor = COLOR_IN_CART;
          }

          // Selected overrides stroke color for highlighting
          if (isSelected) {
            strokeColor = COLOR_SELECTED;
          }

          return (
            <Polygon
              key={t.id}
              positions={t.coordinates}
              pathOptions={{
                color: strokeColor,
                fillColor: fillColor,
                fillOpacity: isSelected || isInCart ? 0.8 : 0.6,
                weight: isSelected ? 3 : 1,
                lineJoin: "round",
              }}
              eventHandlers={{
                click: () => {
                  if (mode === "SELL") return;
                  if (t.status === "LISTED") {
                    onSelectTerritory(t);
                  }
                },
              }}
            ></Polygon>
          );
        })}

        {/* User Territories (Overlay Layer) */}
        {territories.map((ter) => {
          // const bounds = L.latLngBounds(t.coordinates);
          return ter.coordinates.map((t) => {
            const isSelected = selectedTerritory?.id === t.id;
            const isInCart = cart.some((c) => c.id === t.id);
            const isOwner = address === ter.owner;

            let fillColor = isOwner ? COLOR_OWNER : COLOR_NOT_AVAILAIBLE;
            let strokeColor = isOwner ? COLOR_OWNER : COLOR_NOT_AVAILAIBLE;

            if (isInCart) {
              fillColor = COLOR_IN_CART;
              strokeColor = COLOR_IN_CART;
            }

            if (isSelected) {
              strokeColor = COLOR_SELECTED;
            }

            const hasImage = !!ter.image || !!t.image;
            if (hasImage) {
              fillColor = "transparent";
            }

            return (
              <div key={t.id}>
                {/* {t.image && (
                <>
                  <ImageOverlay
                    url={t.image}
                    bounds={bounds}
                    opacity={1}
                    zIndex={1}
                    pane="territory-images"
                    // ...
                  />
                  // ...
                </>
              )} */}
                <Polygon
                  positions={t.coordinates}
                  pathOptions={{
                    color: strokeColor,
                    fillColor: fillColor,
                    fillOpacity: hasImage
                      ? 0
                      : isSelected || isInCart
                        ? 0.8
                        : 0.6,
                    weight: isSelected ? 3 : 1,
                    lineJoin: "round",
                  }}
                  pane="territory-borders"
                  eventHandlers={{
                    click: () => {
                      if (mode === "SELL" && !isOwner) return;
                      onSelectTerritory(t);
                    },
                  }}
                ></Polygon>
              </div>
            );
          });
        })}
      </MapContainer>

      <Lagend />
    </div>
  );
}
