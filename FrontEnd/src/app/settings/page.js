"use client";
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import BottomNavBar from '../components/BottomNavBar';
import {
  FaUser,
  FaBell,
  FaMobileAlt,
  FaGlobe,
  FaQuestionCircle,
  FaInfoCircle,
  FaUserPlus,
} from 'react-icons/fa';

const settingsList = [
  { id: 6, title: 'Devices', icon: <FaMobileAlt className="inline-block" /> },
  { id: 7, title: 'Language', icon: <FaGlobe className="inline-block" /> },
  { id: 8, title: 'AskQuestion', icon: <FaQuestionCircle className="inline-block" /> },
  { id: 9, title: 'TankwaFAQ', icon: <FaInfoCircle className="inline-block" /> },
  { id: 10, title: 'InviteFriends', icon: <FaUserPlus className="inline-block" /> },
];

export default function Settings() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleNavigation = (id) => {
    router.push(`/settings/${id}`);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-gradient-to-r bg-slate-500 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white bg-opacity-25 rounded-lg shadow-2xl p-8">
        <h1 className="text-5xl font-extrabold text-center text-slate-800 mb-12">
          {t('Settings')}
        </h1>
        <ul className="space-y-6">
          {settingsList.map((setting) => (
            <li
              key={setting.id}
              className="p-6 bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-blue-500 hover:text-white transition-all duration-300 ease-in-out"
              onClick={() => handleNavigation(setting.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-800 text-white rounded-full">
                  {setting.icon}
                </div>
                <span className="text-xl font-bold text-gray-100">
                  {t(setting.title)}
                </span>
              </div>
            </li>
          ))}
        </ul>
        {/* <div className="mt-8 space-x-4">
          <button
            onClick={() => changeLanguage('en')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('am')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Amharic
          </button>
        </div> */}
      </div>
      <BottomNavBar />
    </div>
  );
}