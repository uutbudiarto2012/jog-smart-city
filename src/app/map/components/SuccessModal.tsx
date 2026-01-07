import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  mode: "BUY" | "SELL";
}

export default function SuccessModal({
  isOpen,
  onClose,
  count,
  mode,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-2 animate-in zoom-in duration-300">
            <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Success!
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {mode === "BUY"
                ? `You have successfully purchased ${count} blocks.`
                : `You have successfully listed ${count} blocks for sale.`}
            </p>
          </div>

          <div className="pt-4 w-full">
            <Button
              onClick={onClose}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
