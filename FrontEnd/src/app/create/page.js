"use client"; // Mark this as a Client Component
import React from "react";
import { useTranslation } from "react-i18next";
import BottomNavBar from "../components/BottomNavBar";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-green-400 mb-4 animate-pulse text-center">
          {t('privacyTitle')}
        </h1>

        {/* Introduction */}
        <p className="text-gray-400 mb-6">
          {t('privacyIntro')}
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* Security Measures */}
          <div>
            <h2 className="text-xl font-semibold text-green-400">
              {t('privacyProtect')}
            </h2>
            <p className="text-gray-400 mt-2">
              {t('privacyProtectDesc')}
            </p>
          </div>

          {/* No Unauthorized Tracking */}
          <div>
            <h2 className="text-xl font-semibold text-green-400">
              {t('privacyNoTracking')}
            </h2>
            <p className="text-gray-400 mt-2">
              {t('privacyNoTrackingDesc')}
            </p>
          </div>

          {/* Secure Transactions */}
          <div>
            <h2 className="text-xl font-semibold text-green-400">
              {t('privacySecureTransactions')}
            </h2>
            <p className="text-gray-400 mt-2">
              {t('privacySecureTransactionsDesc')}
            </p>
          </div>

          {/* How You Can Stay Safe */}
          <div>
            <h2 className="text-xl font-semibold text-blue-400">
              {t('privacyStayInControl')}
            </h2>
            <ul className="list-disc list-inside mt-2 text-gray-400">
              {t('privacyStayInControlTips', { returnObjects: true }).map(
                (tip, index) => (
                  <li key={index}>{tip}</li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Positive Footer */}
        <div className="mt-6 p-4 bg-green-600 text-white text-center rounded-md">
          <p className="font-bold">{t('privacyFooter')}</p>
        </div>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default PrivacyPolicy;