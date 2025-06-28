"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function EditProfile() {
  const router = useRouter();
  const [sem, setSem] = useState("");
  const [dept, setDept] = useState("");
  const [course, setCourse] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <button onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="text-gray-700" />
        </button>

        <h1 className="text-2xl font-semibold text-center mb-1">Profile</h1>
        <p className="text-center text-gray-500 mb-6">Edit Profile</p>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-sm text-gray-600 mb-2">
            Upload Image
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Your Sem"
            value={sem}
            onChange={(e) => setSem(e.target.value)}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ring-gray-300"
          />
          <input
            type="text"
            placeholder="Enter Your Department"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ring-gray-300"
          />
          <div className="relative">
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full appearance-none px-4 py-2 border rounded-md outline-none focus:ring-2 ring-gray-300"
            >
              <option value="">Select Your Course</option>
              <option value="btech">B.Tech</option>
              <option value="mtech">M.Tech</option>
              <option value="mba">MBA</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
          </div>
          <button className="w-full py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
