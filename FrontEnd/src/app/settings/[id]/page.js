"use client";
import { useRouter } from 'next/navigation';
import { FaTelegram, FaLinkedin, FaTwitter, FaDiscord, FaYoutube, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import React from 'react';
const settingsDetails = {

  
  6: { title: 'Devices', description: 'Manage your connected devices' },
  7: { title: 'Language', description: 'Choose your preferred language' },
  8: { title: 'Ask Question', description: 'Submit your questions or feedback' },
  9: { title: 'Tankwa FAQ', description: 'Frequently Asked Questions' },
  10: { title: 'Invite Friends', description: 'Invite your friends to join' }
};

export default function SettingDetail({ params }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [copied, setCopied] = useState("");
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  const router = useRouter(); // Initialize the useRouter hook

  const setting = settingsDetails[id];


  const handleCopyLink = (link, platformName) => {
    navigator.clipboard.writeText(link);
    setCopied(platformName);

    // Clear the copied state after 2 seconds
    setTimeout(() => setCopied(""), 2000);
  };

  const platforms = [
    { name: "Telegram", icon: <FaTelegram className="text-blue-400" size={24} />, link: "https://t.me/your_channel" },
    { name: "LinkedIn", icon: <FaLinkedin className="text-blue-700" size={24} />, link: "https://linkedin.com/in/your_profile" },
    { name: "Twitter", icon: <FaTwitter className="text-blue-400" size={24} />, link: "https://twitter.com/your_profile" },
    { name: "Discord", icon: <FaDiscord className="text-indigo-600" size={24} />, link: "https://discord.gg/your_invite_code" },
    { name: "YouTube", icon: <FaYoutube className="text-red-500" size={24} />, link: "https://youtube.com/channel/your_channel" },
    { name: "Instagram", icon: <FaInstagram className="text-pink-500" size={24} />, link: "https://instagram.com/your_profile" },
  ];


  if (!setting) {
    return <div className="text-center text-xl font-semibold">Setting not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-500 flex flex-col items-center justify-center py-12 px-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()} // Go back to the previous page
          className="mb-6 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Back
        </button>
        
        <h2 className="text-4xl font-semibold text-gray-900 mb-6">{setting.title}</h2>
        <p className="text-lg text-gray-700 mb-6">{setting.description}</p>

        {/* Example of settings based on category */}
        {setting.title === "Account" && (
          <div className="space-y-4 p-6 bg-gray-100 rounded-md shadow-sm">
            <h3 className="text-2xl font-medium text-gray-800">Change Email</h3>
            <p className="text-gray-600">Update your email address for notifications and communication.</p>
            {/* Here you can add a form or a button to change email */}
          </div>
        )}

        {setting.title === "Notification and Sounds" && (
          <div className="space-y-4 p-6 bg-gray-100 rounded-md shadow-sm">
            <h3 className="text-2xl font-medium text-gray-800">Notification Settings</h3>
            <p className="text-gray-600">Adjust your notification preferences and sounds.</p>
            {/* Here you can add toggle buttons or options for notifications */}
          </div>
        )}
       {setting.title === "Ask Question" && (
  <div className="space-y-6 p-6 bg-gray-100 rounded-md shadow-lg">
   
    <div className="space-y-4">
      {/* Question Title Input */}
      <label className="block text-gray-700 font-medium">
        Question Title
        <input
          type="text"
          placeholder="Enter your question title"
          className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      {/* Question Description Input */}
      <label className="block text-gray-700 font-medium">
        Description
        <textarea
          placeholder="Provide more details about your question"
          className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          rows="4"
        />
      </label>

      {/* Submit Button */}
      <button
        type="button"
        className="w-full bg-slate-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-slate-800 transition transform hover:scale-105"
      >
        Submit
      </button>
    </div>
  </div>
)}

     {setting.title === "Language" && (
  <div className="space-y-4 p-6 bg-gray-100 rounded-md shadow-sm">
      <h1 className='text-blue-500'>{t('Setting')}</h1>
    <div className="space-y-2">
    <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="language"
          value="Amharic"
          onChange={() => changeLanguage('am')}
          className="text-slate-600 focus:ring-slate-300"
        />
        <span className="text-gray-800">Amharic</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="language"
          value="English"
          onChange={() => changeLanguage('en')}
          className="text-slate-600 focus:ring-slate-300"
        />
        <span className="text-gray-800">English</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="language"
          value="Spanish"
          onChange={() => changeLanguage('sp')}
          className="text-slate-600 focus:ring-slate-300"
        />
        <span className="text-gray-800">Spanish</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="language"
          value="French"
          onChange={() => changeLanguage('fr')}
          className="text-slate-600 focus:ring-slate-300"
        />
        <span className="text-gray-800">French</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="language"
          value="Arabic"
          onChange={() => changeLanguage('ar')}
          className="text-slate-600 focus:ring-slate-300"
        />
        <span className="text-gray-800">Arabic</span>
      </label>

   
    </div>
  </div>
)}
     {setting.title === "Tankwa FAQ" && (
      <div className="space-y-6 p-6 bg-slate-100 rounded-md shadow-lg">
  <h3 className="text-2xl font-medium text-gray-800">Tankwa Sea Transportation FAQ</h3>
  <p className="text-gray-600">Here are some common questions and answers about sea transportation with Tankwa.</p>

  <div className="space-y-4">
    {/* FAQ Item 1 */}
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h4 className="font-semibold text-gray-800">1. What types of cargo can be transported?</h4>
      <p className="text-gray-600">Tankwa Sea Transportation handles a variety of cargo, including bulk goods, containers, and specialized freight.</p>
    </div>

    {/* FAQ Item 2 */}
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h4 className="font-semibold text-gray-800">2. How do I track my shipment?</h4>
      <p className="text-gray-600">You can track your shipment through our online portal or contact our customer support for detailed updates.</p>
    </div>

    {/* FAQ Item 3 */}
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h4 className="font-semibold text-gray-800">3. What are the shipping rates?</h4>
      <p className="text-gray-600">Shipping rates depend on the cargo type, size, and destination. You can request a quote on our website or via customer support.</p>
    </div>

    {/* FAQ Item 4 */}
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h4 className="font-semibold text-gray-800">4. What documents are required for sea transportation?</h4>
      <p className="text-gray-600">Required documents typically include a bill of lading, commercial invoice, packing list, and export license (if applicable).</p>
    </div>

    {/* FAQ Item 5 */}
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h4 className="font-semibold text-gray-800">5. How long does shipping take?</h4>
      <p className="text-gray-600">The shipping duration varies based on the route and weather conditions, but our team ensures timely delivery whenever possible.</p>
    </div>
  </div>
</div>

)}
{setting.title === "Invite Friends" &&(
  <div className="p-6 bg-gray-100 rounded-md shadow-md space-y-4">
  
      <div className="grid grid-cols-4 place-items-center space-x-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="relative">
            <button
              onClick={() => handleCopyLink(platform.link, platform.name)}
              className="p-2 m-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              {platform.icon}
            </button>
            {/* Display "Copied!" popup when the platform is clicked */}
            {copied === platform.name && (
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
)}


        {/* Add other specific settings if needed */}
      </div>
    </div>
  );
}
