"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <button onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="text-gray-700" />
        </button>

        <h1 className="text-2xl font-semibold text-center mb-1">Profile</h1>
        <div className="w-24 h-1 bg-gray-300 mx-auto rounded-full mb-6"></div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4" />

          <h2 className="text-lg font-medium">Name</h2>
          <p className="text-sm text-gray-500">Sem - Dept</p>

          <button
            onClick={() => router.push("/profile/editProfile")}
            className="mt-6 px-6 py-2 border border-gray-600 rounded-md hover:bg-gray-100 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
