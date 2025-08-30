"use client";
import Link from "next/link";
import { useState } from "react";
import { bottomTabs } from "@/data/nav";

const BottomNavBar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  


  return (
    <nav className="fixed left-6 right-6 bottom-8 border-t border-gray-300 bg-[var(--main)] max-w-[var(--max-screen-size)] mx-auto text-foreground rounded-2xl">
      <ul className="flex items-center justify-around py-2">
        {bottomTabs.map(({ name, icon: Icon, href, label }) => (
          <li key={name} className="flex flex-col items-center">
            <button
              type="button"
              className="focus:outline-none"
              onClick={() => setActiveTab(name)}
              onMouseEnter={() => setHoveredTab(name)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <Link href={href}>
                <div
                  className={`${
                    activeTab === name
                      ? "bg-black w-full flex text-blue-400 text-center items-center gap-2 p-[4px]  px-2 font-bold rounded-xl transition-all duration-300"
                      : "overflow-hidden transition-all duration-300 hover:bg-black hover:text-blue-400 text-center items-center gap-2 p-[4px] px-2 font-bold rounded-xl"
                  }`}
                >
                  <Icon
                    color={`${
                      activeTab === name || hoveredTab === name
                        ? "var(--main)"
                        : "var(--text)"
                    }`}
                    size="32"
                  />
                  {activeTab === name ? label : ""}
                </div>
              </Link>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavBar;
