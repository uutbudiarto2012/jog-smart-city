"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { dummyTerritories } from "../data/dummy-territories";
import { TerritoryData } from "../types/maps-types";
import { fullTerritories } from "../data/full-territories";
// import { useRouter } from "next/navigation";

import MapSidebar from "./MapSidebar";
import CartSidebar from "./CartSidebar";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

import CheckoutModal from "./CheckoutModal";

const FullMap = dynamic(() => import("./FullMap"), {
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
  const [cart, setCart] = useState<TerritoryData[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (item: TerritoryData) => {
    if (!cart.some((c) => c.id === item.id)) {
      setCart((prev) => [...prev, item]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBuy = () => {
    setIsCheckoutOpen(true);
  };

  const confirmPurchase = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(`Success! Purchased ${cart.length} blocks.`);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsProcessing(false);
  };

  const handleTerritoryClick = (territory: TerritoryData | null) => {
    setSelectedTerritory(territory);

    // Navigate if territory has a link
    // if (territory?.link) {
    //   // console.log("Navigating to:", territory.link);
    //   router.push(territory.link);
    // } else {
    //   // console.log("Territory clicked (no link):", territory);
    // }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <section className="flex h-screen w-full overflow-hidden bg-[#022c22] text-white font-sans selection:bg-emerald-500/30 relative">
      {/* Main Map Area */}
      <div className="flex-1 relative h-full overflow-hidden">
        <FullMap
          territories={dummyTerritories}
          fullTerritories={fullTerritories}
          onSelectTerritory={handleTerritoryClick}
          selectedTerritory={selectedTerritory}
          cart={cart}
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
            className="bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-black dark:text-white border border-zinc-200 dark:border-white/10 shadow-lg backdrop-blur-md relative h-10 w-10 flex items-center justify-center rounded-full"
            size="icon"
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-sm border-2 border-white dark:border-black transform scale-90">
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
          className="z-[40]"
        />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onRemoveFromCart={removeFromCart}
          onBuy={handleBuy}
          onClearCart={clearCart}
          className="z-[41]"
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={confirmPurchase}
          cart={cart}
          isProcessing={isProcessing}
        />
      </div>
    </section>
  );
}
