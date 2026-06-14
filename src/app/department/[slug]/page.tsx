import { departments } from "@/data/dept";
import { notFound } from "next/navigation";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dept = departments.find((d) => d.slug === slug);

  if (!dept) {
    notFound();
  }

  return (
    <div className="p-4 space-y-4">

     

     {/* 🔥 Links as Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {dept.links.map((link) => (
    <a
      key={link.url}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="h-full border-2 border-black rounded-2xl p-5 text-center font-medium transition duration-200 
        hover:bg-black hover:text-white hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md">

        <span className="block text-base sm:text-lg">
          {link.name}
        </span>

        {/* subtle hint text */}
        <span className="block text-xs mt-2 opacity-60 group-hover:opacity-100">
          Open link →
        </span>
      </div>
    </a>
  ))}
</div>

    </div>
  );
}