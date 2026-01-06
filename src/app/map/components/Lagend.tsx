import React from "react";

function Lagend() {
  return (
    <div className="absolute bottom-6 right-4 z-[1000] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800">
      <h3 className="text-xs uppercase tracking-wider font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
        Legend
      </h3>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full shadow-sm ring-2 ring-indigo-500/20"
            style={{ backgroundColor: "#6366f1" }}
          ></span>
          <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">
            Owned
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full shadow-sm ring-2 ring-indigo-500/20"
            style={{ backgroundColor: "#9f9f9fff" }}
          ></span>
          <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">
            Not Available
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full shadow-sm ring-2 ring-yellow-500/20"
            style={{ backgroundColor: "#DEA937" }}
          ></span>
          <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">
            Listed
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full shadow-sm ring-2 ring-green-600/20"
            style={{ backgroundColor: "#039303" }}
          ></span>
          <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">
            Block
          </span>
        </div>
      </div>
    </div>
  );
}

export default Lagend;
