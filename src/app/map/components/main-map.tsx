"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { dummyTerritories } from "../data/dummy-territories";
import { fullTerritories } from "../data/full-territories";
import { TerritoryData } from "../types/maps";
import { Button } from "@/components/ui/button";
import { MapPin, User, ArrowLeft, Search, ExternalLink } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

// Dynamic import for FullMap to avoid SSR
const FullMap = dynamic(() => import("./full-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#022c22] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
    </div>
  ),
});

export default function MainMap() {
  // const router = useRouter();
  const [selectedTerritory, setSelectedTerritory] =
    useState<TerritoryData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerritories = dummyTerritories.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTerritoryClick = (territory: TerritoryData | null) => {
    setSelectedTerritory(territory);

    // Navigate if territory has a link
    // if (territory?.link) {
    //   console.log("Navigating to:", territory.link);
    //   router.push(territory.link);
    // } else {
    //   console.log("Territory clicked (no link):", territory);
    // }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#022c22] text-white font-sans selection:bg-emerald-500/30">
      {/* Main Map Area */}
      <div className="flex-1 relative h-full">
        <FullMap
          territories={dummyTerritories}
          fullTerritories={fullTerritories}
          onSelectTerritory={handleTerritoryClick}
          selectedTerritory={selectedTerritory}
        />

        {/* Floating Back Button */}
        <div className="absolute top-4 left-4 z-[1000]">
          <Link
            href="/"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-[#064e3b]/80 text-white hover:bg-[#059669] transition shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-500/30 backdrop-blur-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="w-96 bg-[#064e3b]/90 border-l border-emerald-500/20 flex flex-col shadow-2xl z-10 backdrop-blur-md">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-emerald-500/20 bg-gradient-to-r from-[#064e3b] to-[#065f46]">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <MapPin className="h-6 w-6 text-emerald-400" />
            <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Java Smart City
            </span>
          </h2>
          <p className="text-sm text-emerald-100/70 mt-1">
            Cultural Park & Smart City Data Center
          </p>

          {/* Search */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Cari user atau wilayah..."
              className="w-full bg-[#022c22]/60 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-emerald-100/30 border border-emerald-500/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-4 w-4 text-emerald-100/50 absolute left-3 top-3" />
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-transparent">
          {filteredTerritories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleTerritoryClick(item)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 group relative overflow-hidden ${
                selectedTerritory?.id === item.id
                  ? "bg-emerald-900/40 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                  : "bg-[#022c22]/40 border-emerald-500/10 hover:bg-[#065f46]/40 hover:border-emerald-500/30"
              }`}
            >
              {/* Active Indicator Line */}
              {selectedTerritory?.id === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              )}

              <div className="flex justify-between items-start mb-2">
                <h3
                  className={`font-semibold text-base ${
                    selectedTerritory?.id === item.id
                      ? "text-emerald-300"
                      : "text-gray-200 group-hover:text-emerald-100"
                  }`}
                >
                  {item.name}
                </h3>
                {/* Status Dot */}
                <span
                  className="h-2 w-2 rounded-full ring-2 ring-white/10"
                  style={{ backgroundColor: item.color }}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-100/60 mb-1">
                <User className="h-3 w-3" />
                <span>{item.owner}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-emerald-100/50">
                <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{item.address}</span>
              </div>
            </div>
          ))}

          {filteredTerritories.length === 0 && (
            <div className="text-center py-10 text-emerald-100/40 text-sm">
              Tidak ada data ditemukan.
            </div>
          )}
        </div>

        {/* Selected Detail View Overlay */}
        {selectedTerritory && (
          <div className="p-5 border-t border-emerald-500/20 bg-[#022c22]/80 backdrop-blur-sm">
            <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-3">
              Detail Wilayah Terpilih
            </h4>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-emerald-100/50 block mb-1">
                  Deskripsi
                </span>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {selectedTerritory.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {selectedTerritory.link ? (
                  <Button
                    asChild
                    className="col-span-2 w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white border-0 shadow-lg shadow-emerald-900/20"
                  >
                    <Link href={selectedTerritory.link}>
                      Lihat Detail Smart City{" "}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button className="col-span-1 bg-emerald-700 hover:bg-emerald-600 text-white text-xs border border-emerald-500/20">
                    Lihat Sertifikat
                  </Button>
                )}

                {!selectedTerritory.link && (
                  <Button
                    variant="outline"
                    className="col-span-1 bg-transparent border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-100 text-xs"
                  >
                    Hubungi Pemilik
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
