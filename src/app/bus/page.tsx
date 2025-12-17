"use client";

import { useState } from "react"; // Added for tab state
import { busData } from "@/data/bus";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

const BusPage: React.FC = () => {
  const router = useRouter();
  
  // Set Private Bus as default active tab
  const [activeTab, setActiveTab] = useState<"private" | "college">("private");

  // Filter data based on selection
  const filteredBuses = busData.filter((bus) => bus.category === activeTab);

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 sm:px-6 py-6">
        {/* Back Button */}
        <div className="mb-4">
          <button
            className="border border-gray-400 rounded-full p-2 hover:bg-gray-100 transition"
            onClick={() => router.push("/home")}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8 relative">
          <h1 className="text-2xl sm:text-[30px] font-bold uppercase tracking-tight">
            Bus Timings
          </h1>
          <svg
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-3"
            viewBox="0 0 96 12"
          >
            <path
              d="M2 6C8 2,16 10,24 6C32 2,40 10,48 6C56 2,64 10,72 6C80 2,88 10,94 6"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* --- Top Tabs Logic --- */}
        <div className="flex justify-center mb-10 mt-6">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full max-w-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setActiveTab("private")}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                activeTab === "private"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Private Bus
            </button>
            <button
              onClick={() => setActiveTab("college")}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                activeTab === "college"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              College Bus
            </button>
          </div>
        </div>

        {/* Bus Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBuses.map((bus) => (
            <button
              key={bus.slug}
              className="group border-2 border-black rounded-xl py-8 px-4 text-xl font-black uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:bg-gray-50"
              onClick={() => router.push(`/bus/${bus.slug}`)}
            >
              {bus.name.replace("(Private)", "").replace("(private)", "")}
              {/* Added a small helper indicator for routes */}
              {activeTab === "private" && (
                <div className="mt-2 text-[10px] font-bold bg-yellow-300 border border-black inline-block px-2 py-0.5 rounded ml-2">
                  ROUTE
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredBuses.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-medium">
            No buses found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default BusPage;