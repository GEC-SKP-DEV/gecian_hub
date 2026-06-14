import { departments } from "@/data/dept";
import DepartmentCard from "@/components/departments/DepartmentCard";

export default function DepartmentLandingPage() {
  const firstSix = (departments ?? []).slice(0, 6);

  return (
    <div className="min-h-screen p-4 bg-gray-50">


      {/* 🔥 FULL WIDTH RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {firstSix.map((dept) => (
          <DepartmentCard key={dept.slug} dept={dept} />
        ))}
      </div>

    </div>
  );
}