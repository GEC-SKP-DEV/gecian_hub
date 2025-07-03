'use client';

import ComplaintForm from '@/components/complaint/ComplaintForm';
import { useRouter } from 'next/navigation';

export default function NewComplaintPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      {/* Scrollable Content with Bottom Padding */}
      <div className="overflow-y-auto flex-1 p-4 pb-36">

        

        {/* Title */}
        <div className="mt-12 mb-6 text-center">
          <h1 className="text-2xl font-bold">Complaint</h1>
          <h2 className="text-lg font-medium text-gray-600 mt-2">Add Details</h2>
        </div>

{/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-xl absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-10"
          aria-label="Go Back"
        >
          ←
        </button>
        
        {/* Complaint Form */}
        <ComplaintForm />
      </div>
    </div>
  );
}