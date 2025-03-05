'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaPaypal } from 'react-icons/fa'; // Import PayPal icon from react-icons

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to access query parameters

  const handleClick = async () => {
    try {
      // Access query parameters
      const tempBookingId = searchParams.get('tempBookingId'); // Example: Get 'tempBookingId' from the URL

      // Send the query parameter to the backend
      const response = await axios.post('https://tankwas-3.onrender.com/paypal/return', {
        message: 'Payment Approved',
        tempBookingId: tempBookingId, // Include the query parameter in the request body
      });
if(response.data.message === "Booking created successfully"){
  alert(response.data.message )
  setTimeout(()=>{
    router.push(response.data.return_url); 
  },3000)
 
}
      console.log('Response:', response.data);
      alert('Request successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Request failed!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-700 ">
      <div className="bg-gradient-to-br  from-blue-300 via-white to-blue-200 bg-opacity-20 backdrop-blur-lg shadow-xl rounded-2xl p-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">PayPal Approve</h1>
        <button
          onClick={handleClick}
          className="relative flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all border-2 border-transparent hover:border-blue-400 transform hover:scale-105 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 rounded-xl bg-blue-500 blur-lg opacity-0 hover:opacity-50 transition-opacity"></div>
          <FaPaypal className="w-6 h-6 text-white z-10" /> {/* PayPal Icon */}
          <span className="z-10 text-lg font-medium">Approve with PayPal</span>
        </button>
      </div>
    </div>
  );
}