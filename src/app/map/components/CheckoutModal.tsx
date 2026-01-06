import React from "react";
import { TerritoryData } from "../types/maps-types";
import { Button } from "@/components/ui/button";
import { X, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cart: TerritoryData[];
  isProcessing?: boolean;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  cart,
  isProcessing = false,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-black/20">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            Confirm Purchase
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isProcessing}
            className="h-8 w-8 text-zinc-500 hover:text-red-500 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            You are about to purchase the following territories. Please review
            your order details below.
          </p>

          <div className="bg-zinc-50 dark:bg-white/5 rounded-xl p-4 space-y-3 border border-zinc-100 dark:border-white/5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                Total Blocks
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {cart.length}
              </span>
            </div>
            <div className="border-t border-zinc-200 dark:border-white/10 my-2"></div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-zinc-700 dark:text-zinc-300">
                Total Price
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {totalAmount.toFixed(2)} USD
              </span>
            </div>
          </div>

          <div className="text-xs text-zinc-400 text-center italic">
            * By confirming, you verify that you have reviewed the selected
            blocks.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-black/20 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 border-zinc-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isProcessing}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/20"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Confirm Payment
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
