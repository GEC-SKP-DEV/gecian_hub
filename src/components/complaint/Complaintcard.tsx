'use client';
import { useState } from 'react';

type Complaint = {
  id: number;
  title: string;
  description: string;
  date: string;
  solved: boolean;
  imageUrl?: string;
  comments?: { id: number; text: string; timestamp: string }[];
};

type Props = {
  complaint: Complaint;
};

export default function ComplaintCard({ complaint }: Props) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="border rounded-xl shadow-md p-4 mb-4 bg-white">
      {complaint.imageUrl && (
        <div className="w-full h-40 mb-3 rounded-md overflow-hidden bg-gray-100">
          <img
            src={complaint.imageUrl}
            alt="Complaint"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h2 className="text-lg font-semibold">{complaint.title}</h2>
      <p className="text-sm text-gray-600">
        Complaint Time & Date: {complaint.date}
      </p>
      <p className="mt-2 text-gray-800">{complaint.description}</p>
      
      <button
        onClick={() => setShowComments(!showComments)}
        className="mt-3 text-blue-600 underline text-sm"
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && (
        <div className="mt-4">
          <div className="max-h-40 overflow-y-auto space-y-2 text-sm">
            {complaint.comments && complaint.comments.length > 0 ? (
              complaint.comments.map((comment) => (
                <div key={comment.id} className="border-b pb-1 text-gray-700">
                  {comment.text} (at {new Date(comment.timestamp).toLocaleString()})
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}