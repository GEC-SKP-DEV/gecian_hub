//this map can we done in two ways
// 1)make your own map using svg and uploading as pdf 
// 2) make a madpeddin map of your college or school and in home page redirect to that map
'use client';
import { FloorButtons } from '@/components/map/floorButton';
import { floorData } from '@/data/map';

export default function CollegeMapPage() {
  return (
    <div>
      <FloorButtons floors={floorData} />
    </div>
  );
}