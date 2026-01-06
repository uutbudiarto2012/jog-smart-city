"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, ShoppingCart, Plus, MapPin, Info } from "lucide-react";
import { TerritoryData } from "../types/maps-types";

interface MapSidebarProps {
  selectedTerritory: TerritoryData | null;
  onClose: () => void;
  cart: TerritoryData[];
  onAddToCart: (item: TerritoryData) => void;
  onRemoveFromCart: (id: string) => void;
  mode?: "BUY" | "SELL";
  className?: string;
}

export default function MapSidebar({
  selectedTerritory,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  mode = "BUY",
  className,
}: MapSidebarProps) {
  const isListed = selectedTerritory?.status === "LISTED";
  const isInCart = selectedTerritory
    ? cart.some((item) => item.id === selectedTerritory.id)
    : false;

  const isBuy = mode === "BUY";

  // In BUY mode, we can only add if it's LISTED.
  // In SELL mode, we can add if it's NOT LISTED (assuming it's owned by us, which MainMap filters).
  // Actually, MainMap ensures we only select valid items for the mode.
  // So we can assume if something is selected in SELL mode, it is valid to "Sell" (i.e. Add to Sell List).

  const canAction = isBuy ? isListed : true;

  if (!selectedTerritory) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute left-0 top-0 h-full w-80 bg-white/90 dark:bg-black/80 backdrop-blur-md border-r border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white shadow-2xl z-[1000] flex flex-col transition-all duration-300 ease-in-out font-sans",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10">
        <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Block Details
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-zinc-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              <span>ID: {selectedTerritory.id}</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight text-zinc-900 dark:text-white">
              {selectedTerritory.name || "Unnamed Block"}
            </h2>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-gray-200">
              {selectedTerritory.status || "Unknown Status"}
            </div>
          </div>

          <div className="space-y-4 rounded-xl bg-zinc-50/80 dark:bg-white/5 p-4 border border-zinc-200 dark:border-white/10">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-zinc-400 dark:text-gray-400 mt-0.5" />
              <p className="text-sm text-zinc-600 dark:text-gray-300 leading-relaxed">
                {selectedTerritory.description ||
                  "No description available for this territory block."}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-white/10 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-zinc-500 dark:text-gray-400 block mb-1">
                  Price
                </span>
                <span className="text-lg font-mono text-emerald-600 dark:text-emerald-400">
                  {selectedTerritory.price
                    ? `${selectedTerritory.price} USD`
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 dark:text-gray-400 block mb-1">
                  Owner
                </span>
                <span className="text-xs font-mono text-zinc-700 dark:text-gray-300 truncate block bg-zinc-100 dark:bg-black/20 p-1 rounded">
                  {isListed
                    ? "-"
                    : (selectedTerritory as any).owner || "System"}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-zinc-500 dark:text-gray-400 block mb-1">
                  Block coordinates
                </span>
                <div className="flex flex-col gap-1">
                  {selectedTerritory.coordinates &&
                  selectedTerritory.coordinates.length > 0
                    ? selectedTerritory.coordinates.map((coord, index) => (
                        <span
                          key={index}
                          className="text-xs font-mono text-zinc-700 dark:text-gray-300 break-all block bg-zinc-100 dark:bg-black/20 p-1.5 rounded"
                        >
                          [{coord[0].toFixed(5)}, {coord[1].toFixed(5)}]
                        </span>
                      ))
                    : "No coordinates"}
                </div>
              </div>
            </div>
          </div>

          {canAction ? (
            <Button
              className={cn(
                "w-full font-semibold transition-all duration-300",
                isInCart
                  ? "bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-200 dark:border-red-500/50"
                  : isBuy
                  ? "bg-emerald-500 text-white dark:text-black hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-indigo-500 text-white dark:text-black hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              )}
              disabled={isInCart}
              onClick={() =>
                isInCart
                  ? onRemoveFromCart(selectedTerritory.id!)
                  : onAddToCart(selectedTerritory)
              }
            >
              {isInCart ? (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />{" "}
                  {isBuy ? "Added to Cart" : "Added to List"}
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />{" "}
                  {isBuy ? "Add to Cart" : "Sell This Block"}
                </>
              )}
            </Button>
          ) : (
            <div className="p-3 rounded-lg bg-zinc-100 dark:bg-gray-500/10 border border-zinc-200 dark:border-gray-500/20 text-center text-sm text-zinc-500 dark:text-gray-400">
              This block is currently not for sale.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
