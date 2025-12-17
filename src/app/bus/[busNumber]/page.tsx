"use client";

import { use } from "react"; // 👈 1. Added use hook
import { notFound, useRouter } from "next/navigation";
import { busRoutes } from "@/data/busRoutes";
import { busData } from "@/data/bus";
import { ArrowLeftIcon } from "lucide-react";

export default function BusRoutePage({
  params: paramsPromise, // 👈 2. Renamed to indicate it's a promise
}: {
  params: Promise<{ busNumber: string }>;
}) {
  const router = useRouter();

  // 👈 3. This line "unwraps" the promise so you can use params.busNumber
  const params = use(paramsPromise); 
  
  // 4. Now these find functions will work correctly
  const busRoute = busRoutes.find((b) => b.slug === params.busNumber);
  const baseBusInfo = busData.find((b) => b.slug === params.busNumber);

  if (!busRoute || !baseBusInfo) return notFound();

  const isCollegeBus = baseBusInfo.category === "college";

  return (
    <div className="min-h-screen bg-white text-black px-4 pt-6 pb-28">
      {/* Back Button */}
      <div className="mb-4">
        <button
          className="border border-gray-400 rounded-full p-2"
          onClick={() => router.push("/bus")}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Heading */}
      <div className="text-center mb-8 relative">
        <h1 className="text-2xl sm:text-3xl font-bold">{busRoute.title}</h1>

        <svg
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-3"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-2 border-black text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-2 border-black">Sl. No</th>
              <th className="p-3 border-2 border-black text-left">
                {isCollegeBus ? "Boarding Point" : "Bus Name / Stop"}
              </th>
              {isCollegeBus ? (
                <>
                  <th className="p-3 border-2 border-black text-center">FN</th>
                  <th className="p-3 border-2 border-black text-center">AN</th>
                </>
              ) : (
                <th className="p-3 border-2 border-black text-center">Time</th>
              )}
            </tr>
          </thead>
          <tbody>
            {busRoute.routes.map((item) => (
              <tr key={item.slNo} className="hover:bg-gray-50">
                <td className="p-3 border border-black text-center">{item.slNo}</td>
                <td className="p-3 border border-black font-medium">{item.point}</td>
                
                {isCollegeBus ? (
                  <>
                    <td className="p-3 border border-black text-center">{item.fn}</td>
                    <td className="p-3 border border-black text-center">{item.an}</td>
                  </>
                ) : (
                  <td className="p-3 border border-black text-center font-bold">
                    {item.fn}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back link */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push("/bus")}
          className="px-6 py-2 border-2 border-black rounded-lg font-bold hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
        >
          Back to Bus List
        </button>
      </div>
    </div>
  );
}