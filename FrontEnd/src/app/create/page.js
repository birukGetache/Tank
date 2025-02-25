import React from "react";
import BottomNavBar from "../components/BottomNavBar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-green-400 mb-4 animate-pulse text-center">
          Your Data is Safe & Secure
        </h1>

        {/* Introduction */}
        <p className="text-gray-400 mb-6">
          We prioritize your privacy. Your data is protected with advanced security measures, ensuring that 
          your personal information remains confidential and safe.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* Security Measures */}
          <div>
            <h2 className="text-xl font-semibold text-green-400">1. We Protect Your Privacy</h2>
            <p className="text-gray-400 mt-2">
              We use encryption and secure protocols to ensure your data remains confidential. 
              No unauthorized parties have access to your personal information.
            </p>
          </div>

          {/* No Unauthorized Tracking */}
          <div>
            <h2 className="text-xl font-semibold text-green-400">2. No Unwanted Tracking</h2>
            <p className="text-gray-400 mt-2">
              Unlike many platforms, we do not sell or share your data with third parties. 
              Your browsing habits and personal details remain yours.
            </p>
          </div>

          {/* Secure Transactions */}
          <div>
            <h2 className="text-xl font-semibold text-green-400">3. Secure Transactions</h2>
            <p className="text-gray-400 mt-2">
              All transactions and communications are safeguarded with top-level encryption, 
              ensuring your information stays protected.
            </p>
          </div>

          {/* How You Can Stay Safe */}
          <div>
            <h2 className="text-xl font-semibold text-blue-400">4. Stay in Control</h2>
            <ul className="list-disc list-inside mt-2 text-gray-400">
              <li>Use strong passwords and enable two-factor authentication.</li>
              <li>Regularly review your security settings.</li>
              <li>Be cautious with the information you share online.</li>
            </ul>
          </div>
        </div>

        {/* Positive Footer */}
        <div className="mt-6 p-4 bg-green-600 text-white text-center rounded-md">
          <p className="font-bold">Your Privacy Matters. Your Data is Secure.</p>
        </div>
        <BottomNavBar></BottomNavBar>
      </div>
   
    </div>
  );
};

export default PrivacyPolicy;
