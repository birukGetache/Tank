// app/components/BottomNavBar.js
'use client'; // Mark this as a Client Component

import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaHandshake, FaInfoCircle, FaCog, FaShieldAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Icon = memo(({ icon, label }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      {icon}
      <span className="text-xs">{t(label)}</span>
    </div>
  );
});

Icon.displayName = 'Icon';

const BottomNavBar = () => {
  const pathname = usePathname();
  const activeTab = pathname || '/';

  const tabs = [
    { path: '/', icon: <FaHome />, label: 'Home' },
    { path: '/home', icon: <FaHandshake />, label: 'Sponser' },
    { path: '/info', icon: <FaInfoCircle />, label: 'Info' },
    { path: '/settings', icon: <FaCog />, label: 'Setting' },
    { path: '/create', icon: <FaShieldAlt />, label: 'Security' },
  ];

  const reorderedTabs = [
    ...tabs.filter((tab) => tab.path !== activeTab).slice(0, 2),
    tabs.find((tab) => tab.path === activeTab),
    ...tabs.filter((tab) => tab.path !== activeTab).slice(2),
  ].filter(Boolean);

  return (
    <div className="pb-20">
      <nav className="fixed bottom-0 left-0 w-full rounded-md bg-slate-700 text-white flex justify-around py-3">
        {reorderedTabs.map((tab) => (
          <Link href={tab.path} key={tab.path} passHref>
            <div
              className={`flex flex-col items-center cursor-pointer ${
                activeTab === tab.path
                  ? 'text-blue-400 translate-y-[-5px] bg-slate-700 rounded-full p-4 -mt-[50%]'
                  : 'text-white'
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