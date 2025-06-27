import React from 'react';

const SemPage: React.FC = () => {
  const semesters = [
    'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <div className="relative">
            <h1 className="text-[30px] font-bold text-black">Study Material</h1>
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
          <p className="text-xl text-black font-semibold mt-4">SEM</p>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-y-20 gap-4 px-10">
          {semesters.map((sem, index) => (
            <button
              key={index}
              className="bg-white border border-black rounded-lg py-7 text-center shadow-md"
            >
              <span className="text-2xl font-bold text-black">{sem}</span>
            </button>
          ))}
        </div>

        {/* Footer Text */}
        <div className="mt-8 px-2 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            Stay focused, work hard, and believe in yourself
          </p>
        </div>
      </div>
    </div>
  );
};

export default SemPage;
