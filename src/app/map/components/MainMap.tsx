"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { dummyTerritories } from "../data/dummy-territories";
import { OwnerTerritory, TerritoryData } from "../types/maps-types";
import { fullTerritories } from "../data/full-territories";
// import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import MapSidebar from "./MapSidebar";
import CartSidebar from "./CartSidebar";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

import CheckoutModal from "./CheckoutModal";
import SuccessModal from "./SuccessModal";
import { useLandBlock } from "@/modules/land-block/useLandBlock";

const FullMap = dynamic(() => import("./FullMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#022c22] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
    </div>
  ),
});

const OWNED_TERRITORIES_KEY = "map_owned_territories";
const AVAILABLE_TERRITORIES_KEY = "map_available_territories";

export default function MainMap() {
  const { sellMultiple, buyMultiple } = useLandBlock()
  const [urlScanner, setUrlScanner] = useState('')
  const { address } = useAccount();
  // const router = useRouter();

  // Initialize owned territories with the dummy data
  const [ownedTerritories, setOwnedTerritories] =
    useState<OwnerTerritory[]>(dummyTerritories);
  // Initialize available territories (market) with full data
  const [availableTerritories, setAvailableTerritories] =
    useState<TerritoryData[]>(fullTerritories);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedOwned = localStorage.getItem(OWNED_TERRITORIES_KEY);
    const savedAvailable = localStorage.getItem(AVAILABLE_TERRITORIES_KEY);

    if (savedOwned) {
      try {
        setOwnedTerritories(JSON.parse(savedOwned));
      } catch (e) {
        console.error(
          "Failed to parse owned territories from local storage",
          e
        );
      }
    }

    if (savedAvailable) {
      try {
        setAvailableTerritories(JSON.parse(savedAvailable));
      } catch (e) {
        console.error(
          "Failed to parse available territories from local storage",
          e
        );
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        OWNED_TERRITORIES_KEY,
        JSON.stringify(ownedTerritories)
      );
    }
  }, [ownedTerritories, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        AVAILABLE_TERRITORIES_KEY,
        JSON.stringify(availableTerritories)
      );
    }
  }, [availableTerritories, isLoaded]);

  const [selectedTerritory, setSelectedTerritory] =
    useState<TerritoryData | null>(null);
  const [cart, setCart] = useState<TerritoryData[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  const [mode, setMode] = useState<"BUY" | "SELL">("BUY");

  const toggleMode = (newMode: "BUY" | "SELL") => {
    if (newMode !== mode) {
      setMode(newMode);
      setCart([]); // Clear cart/selection on mode switch
      setSelectedTerritory(null);
    }
  };

  const addToCart = (item: TerritoryData) => {
    if (!cart.some((c) => c.id === item.id)) {
      setCart((prev) => [...prev, item]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const confirmTransaction = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (mode === "BUY") {
      // Add purchased items to ownedTerritories
      const newPurchase: OwnerTerritory = {
        id: `purchase-${Date.now()}`,
        name: "My New Territory",
        owner: address || "0xCurrentUser",
        address: "New Location",
        description: `Purchased on ${new Date().toLocaleDateString()}`,
        coordinates: cart.map((item) => ({ ...item, status: "OWNED" })),
      };
      const ids = newPurchase.coordinates.map(i => Number(i.id)) 
      const resultSC = await buyMultiple(ids)
      setUrlScanner(`https://testnet.bscscan.com/tx/${resultSC}`)
      setOwnedTerritories((prev) => [...prev, newPurchase]);
    } else if (mode === "SELL") {
      const ids = cart.map(i => Number(i.id)) 
      const resultSC = await sellMultiple(ids)
      setUrlScanner(`https://testnet.bscscan.com/tx/${resultSC}`)
      // 1. Remove sold items from ownedTerritories
      setOwnedTerritories((prev) => {
        return (
          prev
            .map((group) => ({
              ...group,
              // Filter out items that are in the cart (sold)
              coordinates: group.coordinates.filter(
                (t) => !cart.some((c) => c.id === t.id)
              ),
            }))
            // Remove groups that became empty
            .filter((group) => group.coordinates.length > 0)
        );
      });

      // 2. Make sure sold items appear as LISTED in the market
      setAvailableTerritories((prev) =>
        prev.map((t) => {
          if (cart.some((c) => c.id === t.id)) {
            return { ...t, status: "LISTED" };
          }
          return t;
        })
      );
    }

    setSuccessCount(cart.length);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsProcessing(false);
    setIsSuccessOpen(true);
  };

  const handleTerritoryClick = (territory: TerritoryData | null) => {
    // Only allow selection if it matches the mode
    if (!territory) {
      setSelectedTerritory(null);
      return;
    }

    // In BUY mode, only show LISTED
    if (mode === "BUY" && territory.status === "LISTED") {
      setSelectedTerritory(territory);
    }
    // In SELL mode, only show owned
    else if (mode === "SELL") {
      setSelectedTerritory(territory);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <section className="flex h-screen w-full overflow-hidden bg-[#022c22] text-white font-sans selection:bg-emerald-500/30 relative">
      {/* Mode Toggle - Top Center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[45] bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 flex shadow-xl">
        <button
          onClick={() => toggleMode("BUY")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
            mode === "BUY"
              ? "bg-emerald-500 text-white shadow-lg"
              : "text-zinc-300 hover:text-white hover:bg-white/5"
          }`}
        >
          Buy Land
        </button>
        <button
          onClick={() => toggleMode("SELL")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
            mode === "SELL"
              ? "bg-indigo-500 text-white shadow-lg"
              : "text-zinc-300 hover:text-white hover:bg-white/5"
          }`}
        >
          Sell Land
        </button>
      </div>

      {/* Instruction for Drag Select */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[44] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white/90 text-[10px] md:text-xs font-medium shadow-sm flex items-center gap-1.5">
          <span className="bg-white/20 px-1.5 rounded text-[10px] py-0.5 border border-white/10 font-mono">
            SHIFT
          </span>
          <span className="opacity-60">+</span>
          <span>
            {mode === "BUY" ? "Drag to buy multiple" : "Drag to sell multiple"}
          </span>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative h-full overflow-hidden">
        <FullMap
          territories={ownedTerritories}
          fullTerritories={availableTerritories}
          onSelectTerritory={handleTerritoryClick}
          selectedTerritory={selectedTerritory}
          cart={cart}
          mode={mode}
          onMultiSelect={(items) => {
            const newItems = items.filter(
              (item) => !cart.some((c) => c.id === item.id)
            );
            if (newItems.length > 0) {
              setCart((prev) => [...prev, ...newItems]);
              setIsCartOpen(true);
            }
          }}
        />

        {/* Cart Toggle Button - Top Right */}
        <div className="absolute top-4 right-4 z-[39]">
          <Button
            onClick={() => setIsCartOpen((prev) => !prev)}
            className={`bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-black dark:text-white border border-zinc-200 dark:border-white/10 shadow-lg backdrop-blur-md relative h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
              mode === "SELL" ? "ring-2 ring-indigo-500/50" : ""
            }`}
            size="icon"
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span
                className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm border-2 border-white dark:border-black transform scale-90 ${
                  mode === "BUY" ? "bg-emerald-500" : "bg-indigo-500"
                }`}
              >
                {cart.length}
              </span>
            )}
          </Button>
        </div>
        {/* Details Sidebar - Left Side */}
        <MapSidebar
          selectedTerritory={selectedTerritory}
          onClose={() => setSelectedTerritory(null)}
          cart={cart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          mode={mode}
          className="z-[40]"
        />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onRemoveFromCart={removeFromCart}
          onBuy={handleCheckout}
          onClearCart={clearCart}
          mode={mode}
          className="z-[41]"
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={confirmTransaction}
          cart={cart}
          isProcessing={isProcessing}
          mode={mode}
        />

        <SuccessModal
          isOpen={isSuccessOpen}
          // isOpen={true}
          onClose={() => setIsSuccessOpen(false)}
          count={successCount}
          mode={mode}
          urlScanner={urlScanner}
        />
      </div>
    </section>
  );
}
