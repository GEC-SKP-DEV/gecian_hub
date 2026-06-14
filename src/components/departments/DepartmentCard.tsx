import Link from "next/link";
import { Department } from "@/types/department";

export default function DepartmentCard({ dept }: { dept: Department }) {
  return (
    <Link href={`/department/${dept.slug}`}>
      <div
        className="h-40 sm:h-48 lg:h-56 w-full 
        border-2 border-black rounded-3xl 
        flex items-center justify-center
        bg-white shadow-sm
        hover:bg-black hover:text-white
        transition duration-300
        hover:scale-[1.02] active:scale-95 cursor-pointer"
      >
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {dept.name}
          </h2>

          
        </div>
      </div>
    </Link>
  );
}