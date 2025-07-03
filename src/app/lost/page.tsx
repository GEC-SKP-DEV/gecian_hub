'use client';
import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, Filter } from "lucide-react";
import WaveDesign from "./wave/wave_design";
import { Add, Trash, Edit } from "iconsax-react";

// Define Item type
type Item = {
  id: number;
  name: string;
  description: string;
  lastSeenPlace: string;
  contactInfo: string;
  status: "lost" | "found";  // kept for potential future use
};

export default function LostFound() {
  // Only show lost items, no need for status state
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Watch", description: "Lorem ipsum…", lastSeenPlace: "College Ground", contactInfo: "contact@example.com", status: "lost" },
    { id: 2, name: "Water Bottle", description: "Lorem ipsum…", lastSeenPlace: "Library", contactInfo: "contact@example.com", status: "lost" },
  ]);

  // Functionality for editing, deleting, etc.
  const deleteItem = (id: number) =>
    setItems(prev => prev.filter(item => item.id !== id));

  return (
    <div className="p-4 max-w mx-auto relative">
      {/* Header */}
      <div className="flex relative justify-between h-[100px] items-center mb-2">
        <button className="absolute top-0 left-0 border border-gray-400 rounded-full p-2">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="absolute md:left-[40%] left-[24%] text-3xl font-bold">Lost & Found</h1>
        <WaveDesign className='mt-[50px] ml-[60px] md:ml-[520px]' />
        <button className="absolute right-0 bottom-0 border border-gray-400 rounded-full p-2">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Lost Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-[20px]">
        {items.map(item => (
          <div key={item.id} className="mb-4 border rounded-xl overflow-hidden shadow-sm">
            <div className="w-full h-32 bg-gray-300" />
            <div className="p-3">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p className="text-sm text-gray-400">Last Seen: {item.lastSeenPlace}</p>
              <p className="text-sm text-black/[0.7] mt-1">{item.description}</p>
              <p className="text-sm text-black/[0.7] mt-1">Contact: {item.contactInfo}</p>
              <div className="relative flex gap-2 mt-3">
                <button onClick={() => {/* Report logic */}} className="text-black underline font-semibold">Report</button>
                <button onClick={() => {/* Edit logic */}} className="absolute right-10 text-gray-600"><Edit size={25} /></button>
                <button onClick={() => deleteItem(item.id)} className="absolute right-0 text-gray-600"><Trash size={25} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <Link href="/lost/add">
        <button className="fixed bottom-6 right-7 bg-blue-200 border border-black text-black w-12 h-12 rounded-[12px] flex items-center justify-center shadow-lg hover:bg-blue-400 transition-colors">
          <Add size={40} />
        </button>
      </Link>
    </div>
  );
}
