"use client";
import { QuickActionButton } from "@/components/QuickActionButton";
import Link from "next/link";
import React from "react";

// Define BusData using type
type BusData = {
  slug: string; // Use slug instead of busNumber
  name: string; // Display name for the bus
};

export const BusButtons = ({ buses }: { buses: BusData[] },) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Bus Timing
        </h1>
        <div className="space-y-3">
          {/* Bus Buttons */}
          {buses.map((bus) => (
            <div key={bus.slug} className="flex justify-center">
              <Link href={`/bus/${bus.slug}`}>
                <QuickActionButton
                  text={bus.name}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
