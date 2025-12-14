// bus/[busnumber]/page.tsx
"use client"
import { notFound } from "next/navigation";
import { busRoutes } from "@/data/busRoutes";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon,  } from "lucide-react";

export default function BusRoutePage({ params }: { params: { busNumber: string } }) {
  const { busNumber } = params;
  const router = useRouter();
  const bus = busRoutes.find((b) => b.slug === busNumber);

  if (!bus) return notFound();

  return (
    <div className="min-h-screen bg-white p-6 text-black">
      {/* Heading */}
       <div className="flex justify-start items-center mb-4">
          <button
            className="border text-black border-gray-400 rounded-full p-2"
            onClick={() => router.push("/home")}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        </div>
      <div className="text-center mb-6 relative">
        <h1 className="text-3xl font-bold">{bus.title}</h1>
        <svg
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-3"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-black text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border border-black">Sl. No</th>
              <th className="p-3 border border-black">Boarding Point</th>
              <th className="p-3 border border-black">FN</th>
              <th className="p-3 border border-black">AN</th>
            </tr>
          </thead>
          <tbody>
            {bus.routes.map((item) => (
              <tr key={item.slNo} className="border border-black">
                <td className="p-3 border border-black">{item.slNo}</td>
                <td className="p-3 border border-black">{item.point}</td>
                <td className="p-3 border border-black">{item.fn}</td>
                <td className="p-3 border border-black">{item.an}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back Button */}
      <div className="mt-6 flex justify-center">
        <a
          href="/bus"
          className="px-4 py-2 border border-black rounded-md hover:bg-gray-200"
        >
          Back to Bus List
        </a>
      </div>
    </div>
  );
}
