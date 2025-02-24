"use client";
import { useRouter } from 'next/navigation';
import BottomNavBar from '../components/BottomNavBar';
import {
  FaUser,          // Account
  FaBell,          // Notification and Sounds
  FaMobileAlt,     // Devices
  FaGlobe,         // Language
  FaQuestionCircle,// Ask Question
  FaInfoCircle,    // Tankwa FAQ
  FaUserPlus,      // Invite Friends
} from 'react-icons/fa';

const settingsList = [
  { id: 6, title: 'Devices', icon: <FaMobileAlt className="inline-block " /> },
  { id: 7, title: 'Language', icon: <FaGlobe className="inline-block " /> },
  { id: 8, title: 'Ask Question', icon: <FaQuestionCircle className="inline-block " /> },
  { id: 9, title: 'Tankwa FAQ', icon: <FaInfoCircle className="inline-block " /> },
  { id: 10, title: 'Invite Friends', icon: <FaUserPlus className="inline-block " /> },
];

export default function Settings() {
  const router = useRouter();

  const handleNavigation = (id) => {
    // Redirect to different pages for each section
    router.push(`/settings/${id}`);
  };

  return (
    <div className=" bg-gradient-to-r bg-slate-500 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white bg-opacity-25 rounded-lg shadow-2xl p-8">
        <h1 className="text-5xl font-extrabold text-center text-slate-800 mb-12">Settings</h1>
        <ul className="space-y-6">
        {settingsList.map((setting) => (
  <li
    key={setting.id}
    className="p-6 bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-blue-500 hover:text-white transition-all duration-300 ease-in-out"
    onClick={() => handleNavigation(setting.id)}
  >
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-gray-800 text-white rounded-full">
        {setting.icon} {/* Render the icon */}
      </div>
      <span className="text-xl font-bold text-gray-100">{setting.title}</span>
    </div>
  </li>
))}

        </ul>
      </div>
      <BottomNavBar />
    </div>
  );
}