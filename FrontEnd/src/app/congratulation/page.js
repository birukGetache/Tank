"use client"; // Marks the file as client-side rendered

import React, { useState, useEffect, useRef } from 'react';
import qrcode from 'qrcode';  
import { FaRegWindowClose, FaDownload, FaArrowLeft } from 'react-icons/fa'; 
import html2canvas from 'html2canvas'; 
import { useRouter } from 'next/navigation'; // Import Next.js router

const App = () => {
  const router = useRouter(); // Next.js router for navigation

  const [data] = useState({
    nationality: 'Ethiopia',
    passportNumber: '09090909',
    email: 'example@example.com',
    phoneNumber: '+251123 456 7890',
    departureLocation: 'Bahir Dar',
    destinationLocation: 'Gonder',
    preferredDate: '2025-03-15',
    numberOfPassengers: 2,
    typeOfTransport: 'Ferris',
    paymentMethod: 'Chapa',
    currency: 'Birr',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const cardRef = useRef(null);

  useEffect(() => {
    qrcode.toDataURL(JSON.stringify(data), (err, url) => {
      if (err) console.error('Error generating QR code:', err);
      else setQrUrl(url);
    });
  }, [data]);

  const downloadCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'booking-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r bg-slate-800 flex flex-col items-center justify-center p-8 overflow-hidden">
      
      {/* Back Button */}
      <button
        onClick={() => router.push('http://localhost:3000')}
        className="absolute top-6 left-6 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Card Container */}
      <div ref={cardRef} className="p-6 rounded-xl bg-white shadow-lg w-full sm:w-96 relative overflow-hidden">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Booking Information</h1>

        <div className="space-y-4 mb-4 text-gray-700">
          <p><strong className="text-indigo-700">Nationality:</strong> {data.nationality}</p>
          <p><strong className="text-indigo-700">Passport Number:</strong> {data.passportNumber}</p>
          <p><strong className="text-indigo-700">Email:</strong> {data.email}</p>
          <p><strong className="text-indigo-700">Phone Number:</strong> {data.phoneNumber}</p>
          <p><strong className="text-indigo-700">Departure Location:</strong> {data.departureLocation}</p>
          <p><strong className="text-indigo-700">Destination Location:</strong> {data.destinationLocation}</p>
          <p><strong className="text-indigo-700">Preferred Date:</strong> {data.preferredDate}</p>
          <p><strong className="text-indigo-700">Passengers:</strong> {data.numberOfPassengers}</p>
          <p><strong className="text-indigo-700">Transport Type:</strong> {data.typeOfTransport}</p>
          <p><strong className="text-indigo-700">Payment Method:</strong> {data.paymentMethod}</p>
          <p><strong className="text-indigo-700">Currency:</strong> {data.currency}</p>
        </div>

        {/* QR Code */}
        {qrUrl && (
          <div className="absolute bottom-4 right-4">
            <img
              src={qrUrl}
              alt="QR Code"
              className="w-20 h-20 cursor-pointer hover:opacity-90 transition-opacity duration-300"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Download Button Below the Card */}
      <button
        onClick={downloadCard}
        className="mt-6 w-full sm:w-96 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center"
      >
        <FaDownload className="mr-2" /> Download Card
      </button>

      {/* Modal Popup (QR Code) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 p-1 rounded-full text-gray-500 hover:text-gray-800"
            >
              <FaRegWindowClose size={24} />
            </button>
            <div className="flex justify-center mb-6">
              <img src={qrUrl} alt="QR Code" className="w-64 h-64" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
