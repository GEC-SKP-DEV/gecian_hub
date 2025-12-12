// /bus/page.tsx
"use client";

import { busData } from "@/data/bus";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon,  } from "lucide-react";

const BusPage: React.FC = () => {
  const router = useRouter(); // ✅ FIX: Must be inside the component

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
       <div className="px-6 py-8">
        {/* Back Button */}
        <div className="flex justify-start items-center mb-4">
          <button
            className="border text-black border-gray-400 rounded-full p-2"
            onClick={() => router.push("/home")}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mb-8">
          <div className="relative">
            <h1 className="text-[30px] font-bold text-black">College Bus</h1>

            {/* Decorative wave underline */}
            <svg
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-3"
              viewBox="0 0 96 12"
              fill="none"
            >
              <path
                d="M2 6C8 2, 16 10, 24 6C32 2, 40 10, 48 6C56 2, 64 10, 72 6C80 2, 88 10, 94 6"
                stroke="#000000"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Bus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-y-20 gap-4 px-10">
          {busData.map((bus, index) => (
            <button
              key={index}
              className="bg-white border border-black rounded-lg py-7 text-center shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => router.push(`/bus/${bus.slug}`)} // ✅ FIXED
            >
              <span className="text-2xl font-bold text-black">{bus.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusPage;
