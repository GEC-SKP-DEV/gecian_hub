"use client";

import Link from "next/link";
import { departments } from "@/data/dept";

export default function DeptButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {departments.map((dept) => (
        <Link key={dept.slug} href={`/department/${dept.slug}`}>
          <div className="border-2 border-black rounded-2xl p-4 text-center font-semibold hover:bg-black hover:text-white transition cursor-pointer">
            {dept.name}
          </div>
        </Link>
      ))}
    </div>
  );
}