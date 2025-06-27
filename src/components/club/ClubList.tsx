// components/club/ClubList.tsx
'use client';

import { useState } from 'react';
import ClubCard from './ClubCard';
import clubData from './ClubData';
import { ArrowLeftIcon, Filter } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function ClubList(){
    const router = useRouter();
    const [filterOpen, setFilterOpen] = useState(false); // State to manage filter dropdown visibility
    const [filter, setFilter] = useState('all'); // State to manage the active filter ('all' or 'enrolled')

    // Filter the clubs based on the current filter state
    const filteredClubs = clubData.filter(club => {
        if (filter === 'enrolled') {
            return club.enrolled;
        }
        return true; // If filter is 'all', show all clubs
    });

    return (
        <div className='p-4 min-h-screen text-white'>
            <div className="flex justify-between items-center mb-2">
                <button
                    className="border text-black border-gray-400 rounded-full p-2"
                    onClick={() => router.push('/home')}
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <div className="relative flex-shrink-0 w-fit mx-auto mb-6">
                    <h1 className="text-4xl text-black font-bold text-center relative">Club</h1>
                    <img
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[50%] h-70 w-auto z-0"
                        src="/wave-line.svg"
                        alt="wave underline"
                    />
                </div>

                <div className="relative">
                    <button
                        className="border text-black border-gray-400 rounded-full p-2"
                        onClick={() => setFilterOpen(prev => !prev)} // Toggle filter dropdown
                    >
                        <Filter className="w-5 h-5" />
                    </button>

                    {filterOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-10">
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${filter === 'all' ? 'font-semibold bg-gray-100' : ''}`}
                                onClick={() => {
                                    setFilter('all');
                                    setFilterOpen(false);
                                }}
                            >
                                All Clubs
                            </button>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${filter === 'enrolled' ? 'font-semibold bg-gray-100' : ''}`}
                                onClick={() => {
                                    setFilter('enrolled');
                                    setFilterOpen(false);
                                }}
                            >
                                Enrolled Clubs
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredClubs.map((club) => ( // Use filteredClubs here
                    <ClubCard key={club.slug} club={club}/>
                ))}
            </div>
        </div>
    );
}