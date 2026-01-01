"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { dummyTerritories } from "../data/dummy-territories";
import { TerritoryData } from "../types/maps";
import { fullTerritories } from "../data/full-territories";
import { useRouter } from "next/navigation";

const FullMap = dynamic(() => import("./full-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#022c22] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
    </div>
  ),
});

export default function MainMap() {
  const router = useRouter();
  const [selectedTerritory, setSelectedTerritory] =
    useState<TerritoryData | null>(null);

  const handleTerritoryClick = (territory: TerritoryData | null) => {
    setSelectedTerritory(territory);

    // Navigate if territory has a link
    if (territory?.link) {
      console.log("Navigating to:", territory.link);
      router.push(territory.link);
    } else {
      console.log("Territory clicked (no link):", territory);
    }
  };

  return (
    <section className="flex h-screen w-screen overflow-hidden bg-[#022c22] text-white font-sans selection:bg-emerald-500/30">
      {/* Main Map Area */}
      <div className="flex-1 relative h-full">
        <FullMap
          territories={dummyTerritories}
          fullTerritories={fullTerritories}
          onSelectTerritory={handleTerritoryClick}
          selectedTerritory={selectedTerritory}
        />
      </div>
    </section>
  );
}
