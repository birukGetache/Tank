import React from "react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: October 10, 2023
          </p>
        </div>

        {/* Introduction Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At Telegram Clone, we are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            information when you use our services. By using our app, you agree to
            the terms outlined in this policy.
          </p>
        </section>

        {/* Data Collection Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Data We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We collect the following types of information to provide and improve
            our services:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>Your name, email address, and phone number.</li>
            <li>Messages, media, and files you send or receive.</li>
            <li>Device information, such as IP address and operating system.</li>
            <li>Usage data, including app activity and interactions.</li>
          </ul>
        </section>

        {/* Data Usage Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            How We Use Your Data
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We use your data for the following purposes:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>To provide and maintain our services.</li>
            <li>To improve user experience and app functionality.</li>
            <li>To communicate with you about updates and support.</li>
            <li>To ensure the security and integrity of our platform.</li>
          </ul>
        </section>

        {/* Data Sharing Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Data Sharing
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not share your personal data with third parties except in the
            following cases:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>With your explicit consent.</li>
            <li>To comply with legal obligations or court orders.</li>
            <li>To protect the rights, property, or safety of our users.</li>
          </ul>
        </section>

        {/* Security Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We take the security of your data seriously. We use industry-standard
            encryption and security practices to protect your information from
            unauthorized access, disclosure, or misuse.
          </p>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p className="mt-2 text-blue-600 hover:text-blue-700">
            <a href="mailto:privacy@telegramclone.com">
              privacy@telegramclone.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;