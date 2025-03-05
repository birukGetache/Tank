"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import qrcode from "qrcode";
import axios from "axios";
import { FaRegWindowClose, FaDownload, FaArrowLeft, FaQrcode } from "react-icons/fa";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";

const BookingDetailsPage = () => {
  const { t, i18n } = useTranslation(); 
  const { _id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    if (_id) {
      const fetchBookingDetails = async () => {
        try {
          const response = await axios.get(`https://tankwas-3.onrender.com/booking/${_id}`);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      };
      fetchBookingDetails();
    }
  }, [_id]);

  useEffect(() => {
    if (data) {
      qrcode.toDataURL(JSON.stringify(data), (err, url) => {
        if (err) console.error("Error generating QR code:", err);
        else setQrUrl(url);
      });
    }
  }, [data]);

  const downloadCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "booking-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  if (!data) return <div className="flex justify-center items-center h-screen bg-gray-900">
  <div className="relative w-20 h-20 flex justify-center items-center">
    {/* Rotating Border */}
    <div className="absolute w-full h-full border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
    {/* Inner Circle */}
    <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
  </div>
</div>;

  return (
    <div className="min-h-screen bg-slate-700 p-8">
      {/* Navbar */}
      <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-indigo-700 to-slate-900 p-4 rounded-xl shadow-lg">
  <button
    onClick={() => router.push("/")}
    className="bg-slate-600 text-white p-3 rounded-full hover:bg-slate-800 transition transform hover:scale-105"
  >
    <FaArrowLeft size={20} />
  </button>

  <div className="flex items-center space-x-4 flex-1 justify-end">
    <button
      onClick={downloadCard}
      className="flex items-center bg-slate-600 text-white max-w-52 py-2 px-4 rounded-lg shadow-lg hover:bg-slate-800 hover:shadow-2xl transform hover:scale-105 transition w-1/2"
    >
      <FaDownload className="mr-2" />
      <span>Download</span>
    </button>

    {qrUrl && (
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-slate-600 text-white p-3 rounded-full hover:bg-slate-800 transition transform hover:scale-105"
      >
        <FaQrcode size={20} />
      </button>
    )}
  </div>
</div>




      {/* Booking Info Card */}
      <div
        ref={cardRef}
        className="bg-gradient-to-br from-white via-slate-100 to-blue-50 shadow-2xl rounded-3xl p-6 border-4 border-slate-600"
      >
        <h1 className="text-xl font-extrabold text-gray-800 mb-6 text-center border-b-4 border-slate-500 pb-3 uppercase">
        {t("BookingInformation")}
        </h1>
        <div className="space-y-4 text-gray-700 font-medium">
          <p>
            <span className="text-slate-700 font-bold">First Name:</span> {data.bookingDetails.firstName}
          </p>
          <p>
            <span className="text-slate-700 font-bold">Last Name:</span> {data.bookingDetails.lastName}
          </p>
          <p>
            <span className="text-slate-700 font-bold">Phone:</span> {data.bookingDetails.phone}
          </p>
          <p>
            <span className="text-slate-700 font-bold">Destination:</span> {data.bookingDetails.destinationLocation}
          </p>
          <p>
            <span className="text-slate-700 font-bold">Departure:</span> {data.bookingDetails.departureLocation}
          </p>
          <p>
            <span className="text-slate-700 font-bold">Passengers:</span> {data.bookingDetails.numberOfPassengers}
          </p>
          <p>
            <span className="text-slate-700 font-bold">Boat Owner Name:</span> {data.boatOwnerDetails.name}
          </p>
          <p>
            <span className="text-slate-700 font-bold">Father's Name:</span> {data.boatOwnerDetails.fatherName}
          </p>
          <p>
            <span className="text-slate-700 font-bold">Promo Code:</span> {data.promocodeDetails.code}
          </p>
        </div>
      </div>

      {/* Modal for QR Code */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <FaRegWindowClose size={24} />
            </button>
            <img src={qrUrl} alt="QR Code" className="w-72 h-72" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsPage;
