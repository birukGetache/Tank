import React from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <p className="text-lg text-gray-600 mb-4">Manage your account details here.</p>
      <button 
        onClick={() => navigate("/settings")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Back to Settings
      </button>
    </div>
  );
};

export default AccountPage;
