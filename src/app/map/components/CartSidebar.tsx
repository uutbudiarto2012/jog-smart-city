"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, ShoppingCart, Trash2, CreditCard } from "lucide-react";
import { TerritoryData } from "../types/maps-types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: TerritoryData[];
  onRemoveFromCart: (id: string) => void;
  onBuy: () => void;
  onClearCart: () => void;
  className?: string;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onBuy,
  onClearCart,
  className,
}: CartSidebarProps) {
  const totalCartPrice = cart.reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  return (
    <div
      className={cn(
        "absolute right-0 top-0 h-full w-80 bg-white/90 dark:bg-black/80 backdrop-blur-md border-l border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white shadow-2xl z-[1000] flex flex-col transition-transform duration-300 ease-in-out font-sans",
        isOpen ? "translate-x-0" : "translate-x-full",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10">
        <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <ShoppingCart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Your Cart
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white dark:text-black">
            {cart.length}
          </span>
        </h2>
        <div className="flex items-center gap-1">
          {cart.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCart}
              className="h-8 px-2 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-zinc-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          {cart.length === 0 ? (
            <div className="text-center py-10 opacity-50">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-zinc-400 dark:text-gray-500" />
              <p className="text-sm text-zinc-600 dark:text-gray-300">
                Your cart is empty.
              </p>
              <p className="text-xs text-zinc-400 dark:text-gray-500 mt-1">
                Select LISTED blocks to add them here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col gap-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-3 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate pr-2 text-zinc-900 dark:text-white">
                      {item.name || `Block #${item.id}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-zinc-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 -mr-1"
                      onClick={() => onRemoveFromCart(item.id!)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 dark:text-gray-400 font-mono text-[10px]">
                      {item.id}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                      {item.price} USD
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Checkout */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-emerald-500/20 bg-white/50 dark:bg-black/40 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-500 dark:text-gray-400">
              Total
            </span>
            <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {totalCartPrice.toFixed(2)} USD
            </span>
          </div>
          <Button
            className="w-full bg-emerald-500 text-white dark:text-black font-bold hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
            onClick={onBuy}
          >
            <CreditCard className="mr-2 h-4 w-4" /> Checkout ({cart.length})
          </Button>
        </div>
      )}
    </div>
  );
}
