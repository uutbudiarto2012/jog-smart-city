export type Coordinate = [number, number];

interface TerritoryWithCoordinates {
  coordinates: Coordinate[];
}

/**
 * Merges multiple territory blocks into a single bounding box polygon.
 * Ideally used for contiguous rectangular blocks.
 */
export function mergeTerritories(
  territories: TerritoryWithCoordinates[]
): Coordinate[] {
  if (!territories || territories.length === 0) return [];

  // Flatten all coordinates to find the extremes
  const allCoords = territories.flatMap((t) => t.coordinates);

  const lats = allCoords.map((c) => c[0]);
  const lngs = allCoords.map((c) => c[1]);

  const maxLat = Math.max(...lats); // North (closest to 0 for negative lats)
  const minLat = Math.min(...lats); // South
  const maxLng = Math.max(...lngs); // East
  const minLng = Math.min(...lngs); // West

  // Return coordinates for the bounding box:
  // [North-West, North-East, South-East, South-West]
  return [
    [maxLat, minLng],
    [maxLat, maxLng],
    [minLat, maxLng],
    [minLat, minLng],
  ];
}
