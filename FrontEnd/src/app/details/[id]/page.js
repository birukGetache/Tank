"use client";
import axios from "axios";
import { usePathname ,useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import BottomNavBar from '@/app/components/BottomNavBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
// import { useNavigation } from "react-router-dom";
const DetailPage = () => {
    const { t, i18n } = useTranslation(); // Get the current language from i18n
  const router = useRouter();
  const pathname = usePathname(); // Get the current path of the page
  const id = pathname.split("/").pop(); 
  const [destinations, setDestinations] = useState('');
  useEffect(() => {
      const fetchDestinations = async () => {
        try {
          const response = await fetch(`http://localhost:5000/destinations/${id}`); // Replace with your API endpoint
          const data = await response.json();
          setDestinations(data.titles[i18n.language]);
          console.log(data)
        } catch (error) {
          console.error("Error fetching destinations:", error);
        }
      };
  
      fetchDestinations();
    }, []);
 
  
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    promocode:'',
    middleName:'',
    amount :100,
    departureLocation: 'Bahir Dar',
    destinationLocation: '',
    numberOfPassengers: 1,
    paymentMethod: '',
    currency: 'USD',
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      destinationLocation: destinations, // Update the formData state
    }));
  }, [destinations]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect all required fields except 'promocode', 'email', and 'phone'
    const requiredFields = Object.entries(formData).filter(([key]) => !["promocode", "email", "phone"].includes(key));

    // Find empty fields (excluding 'promocode', 'email', and 'phone')
    const emptyFields = requiredFields.filter(([key, value]) => !value).map(([key]) => key);

    // Check if either 'email' or 'phone' is filled
    const hasEmail = formData.email && formData.email.trim() !== "";
    const hasPhone = formData.phone && formData.phone.trim() !== "";

    if (!hasEmail && !hasPhone) {
        emptyFields.push("email or phone"); // Indicate missing contact info
    }

    if (emptyFields.length > 0) {
        // Display a toast with the list of missing fields
        toast.error(`Please fill in all the fields! Missing fields: ${emptyFields.join(", ")}`);
        return;
    }

    // If all required fields are filled, proceed with form submission
    try {
        const response = await axios.post("http://localhost:5000/PostTransaction", formData);
        console.log(response.data);

        // Corrected payment method condition
        if ( formData.paymentMethod === "paypal") {
            console.log("Redirecting to payment URL...");
            window.location.href = response.data.url; // Redirect to payment URL
            console.log(response.data.paymentUrl)
        } else if(formData.paymentMethod === "Chapa"){
            console.log("Redirecting to checkout URL...");
            //window.location.href = response.data.checkoutUrl; // Redirect to checkout URL
            window.location.href = response.data.paymentUrl; // Redirect to checkout URL
            console.log( response.data.paymentUrl)
        }else if(formData.paymentMethod === "stripe"){
            console.log("Redirecting to checkout URL...");
            //window.location.href = response.data.checkoutUrl; // Redirect to checkout URL
            window.location.href = response.data.checkoutUrl; 
        }
        
    } catch (error) {
        console.error("Transaction failed:", error);
        toast.error("Transaction failed. Please try again.");
    }
};






  const validatePhone = (phone) => {
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone);
  };



  

  if (!destinations) {
    return <div className="flex justify-center items-center h-screen bg-gray-900">
    <div className="relative w-20 h-20 flex justify-center items-center">
      {/* Rotating Border */}
      <div className="absolute w-full h-full border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
      {/* Inner Circle */}
      <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
    </div>
  </div>;; // Display loading while fetching data
  }

  return (
    <div className=" space-y-6 bg-white font-playfair text-[#85726a]">
      
        <div className="w-full h-[300px] bg-[url('/boat.avif')] bg-cover bg-center ">
  
        <p className='text-3xl p-5'>
        <Link href="/" passHref className="text-blue-600">
       <FaArrowLeft/>
        </Link>
      </p>
      </div>
        <div className="max-w-4xl mx-auto p-6  shadow-lg ">
        <h2 className="text-2xl font-semibold text-slate-600 mb-6">{t('BookBoatTransport')}</h2>
         <ToastContainer />

        <form onSubmit={handleSubmit}>
  
          {/* User Information */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">{t("FirstName")}</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">{t("MiddleName")}</label>
            <input
              type="text"
              id="last Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">{t("LastName")}</label>
            <input
              type="text"
              id="last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
  
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">{t('Email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder='optional'
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700">{t("Phone")}</label>
            <input
              type="text"
              id="phoneNumber"
              name="phone"
              value={formData.phone}
              placeholder='optional'
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Travel Information */}
          <div className="mb-4">
            <label htmlFor="departureLocation" className="block text-sm font-medium text-slate-700">{t('Departure')}</label>
            <input
              type="text"
              id="departureLocation"
              name="departureLocation"
              value="Bahir Dar"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="promo" className="block text-sm font-medium text-slate-700">{t('Promocode')}</label>
            <input
              type="text"
              id="promocode"
              name="promocode"
              value={formData.promocode}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="destinationLocation" className="block text-sm font-medium text-slate-700">{t('DestinationLocation')}</label>
            <input
              type="text"
              id="destinationLocation"
              name="destinationLocation"
              // value={destinations.titles[i18n.language]} 
              value={destinations}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="preferredDate" className="block text-sm font-medium text-slate-700">{t('Preferred')}</label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="numberOfPassengers" className="block text-sm font-medium text-slate-700">{t('Passengers')}</label>
            <input
              type="number"
              id="numberOfPassengers"
              name="numberOfPassengers"
              value={formData.numberOfPassengers}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="typeOfTransport" className="block text-sm font-medium text-slate-700">{t('Transport')}</label>
            <select
              id="typeOfTransport"
              name="typeOfTransport"
              value={formData.typeOfTransport}
              onChange={handleChange}
              className="mt-1 block w-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            >
              <option value="">{t('SelectType')}</option>
              <option value="ferry">{t('Ferry')}</option>
              <option value="cargo_ship">{t('Cargo')}</option>
              <option value="private_yacht">{t('PrivateYacht')}</option>
            </select>
          </div>
  
          {/* Payment Information */}
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">{t('PaymentMethod')}</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
                <option value="">{t('SelectType')}</option>
              <option value="stripe">{t('CreditCard')}</option>
              <option value="paypal">{t('PayPal')}</option>
              <option value="Chapa">{t('Chapa')}</option>
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">{t('Currency')}</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="USD">{t('USD')}</option>
              <option value="Birr">{t('Birr')}</option>
              <option value="EUR">{t('EUR')}</option>
              <option value="GBP">{t('GBP')}</option>
            </select>
          </div>
    <button
            type="submit"
            className="w-full  bg-gradient-to-r from-blue-500 to-slate-700 hover:from-blue-600 hover:to-slate-800  text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
           >
              {t('BookNow')} ✨
          </button>
   
    {/* </Link> */}
        
        
        </form>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default DetailPage;
