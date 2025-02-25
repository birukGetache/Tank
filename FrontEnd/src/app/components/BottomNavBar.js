"use client"; // Mark this component as a Client Component

import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import { FaHome, FaHandshake, FaInfoCircle, FaCog, FaShieldAlt } from "react-icons/fa"; // Import FaShieldAlt

// Memoized Icon component to prevent unnecessary re-renders
const Icon = memo(({ icon, label }) => {
  return (
    <div className="flex flex-col items-center">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );
});

Icon.displayName = "Icon";

const BottomNavBar = () => {
  const pathname = usePathname(); // Get the current pathname
  const activeTab = pathname || "/"; // Default active tab to "/"

  const tabs = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/home", icon: <FaHandshake />, label: "Sponser" },
    { path: "/info", icon: <FaInfoCircle />, label: "Info" },
    { path: "/settings", icon: <FaCog />, label: "Settings" },
    { path: "/create", icon: <FaShieldAlt />, label: "Security" }, // Updated icon here
  ];

  // Reorder tabs to make the active tab the third one
  const reorderedTabs = [
    ...tabs.filter((tab) => tab.path !== activeTab).slice(0, 2), // First two non-active tabs
    tabs.find((tab) => tab.path === activeTab), // Active tab
    ...tabs.filter((tab) => tab.path !== activeTab).slice(2), // Remaining non-active tabs
  ].filter(Boolean); // Filter out undefined values

  return (
    <div className="pb-20">
      <nav className="fixed bottom-0 left-0 w-full rounded-md bg-slate-700 text-white flex justify-around py-3">
        {reorderedTabs.map((tab) => (
          <Link href={tab.path} key={tab.path} passHref>
            <div
              className={`flex flex-col items-center cursor-pointer ${
                activeTab === tab.path
                  ? "text-blue-400 translate-y-[-5px] bg-slate-700 rounded-full p-4 -mt-[50%]"
                  : "text-white"
              } transition-all duration-300`}
              aria-label={tab.label}
            >
              <Icon icon={tab.icon} label={tab.label} />
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavBar;
