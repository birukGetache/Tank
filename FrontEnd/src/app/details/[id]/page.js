"use client";
import axios from "axios";
import { usePathname ,useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import BottomNavBar from '@/app/components/BottomNavBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
// import { useNavigation } from "react-router-dom";
const DetailPage = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path of the page
  const id = pathname.split("/").pop(); // Extract the `id` from the URL path
  const dispatch = useDispatch();
  const [cardDetail, setCardDetail] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle
  const [activePage, setActivePage] = useState('service'); // State to toggle between Service and Detail
  const cardData = [
    {id:1, title: "Gonder", description: `5-star hotel with children, chosen `,url:"/gonder.avif" },
    {id:2, title: "Gorgora ", description: `5-star hotel with children, chosen`,url:"/Dembiya.jpg" },
    {id:3, title: "Dembiya", description: `5-star hotel with children, chosen`,url:"/Dembiya.jpg" },
    {id:4, title: " Hamusit", description: "Add a new student to the system" ,url:"/Hamusit.jpg"},
    {id:5, title: "Fogera", description: "Essential items for your trip" ,url:"/gonder.avif"},
    {id:6, title: "Bahita", description: "Price for late home rental" ,url:"/gonder.avif"},
    {id:7, title: "Dek deset", description: "Medicines available for purchase",url:"/gonder.avif" },
    {id:8, title: "Dek deset", description: "Medicines available for purchase",url:"/gonder.avif" },
  ];
 const [first_name, setFirstName] = useState("");
  const [last_name , setLastName] = useState("");
  const [email, setEmail ]=useState("")
  const [phone , setPhone] = useState("");
  const [promocode , setPromoCode] = useState("");
  const [middleName,setMiddleName] = useState("");
  const [amount , setAmount] = useState(100);
  const [card , setCard] = useState({});
  const sanitizedEmail = email.replace(/[^a-zA-Z0-9._-]/g, ''); // Remove invalid characters from email
  const tx_ref = `${sanitizedEmail}-txburusdf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  //const navigator = useNavigation();
  const public_key = 'CHAPUBK_TEST-XQxA1FKglJqifPTKFg1jBlNKYqHBlAgL'
    const triggerConfetti = () => {
        confetti({
          particleCount: 50, // Lower the number of particles
          angle: 90,
          spread: 50, // Reduce spread
          origin: { x: 0.5, y: 0.5 },
          colors: ['#ff0', '#ff6', '#ff8000', '#ff4d4d'],
        });
      };

      useEffect(()=>{
      setCard(cardData.find((card) => card.id === parseInt(id)))
      
      },[id])
  const [formData, setFormData] = useState({
    nationality: '',
    passportNumber: '',
    departureLocation: '',
    destinationLocation: '',
    numberOfPassengers: 1,
    paymentMethod: '',
    currency: 'USD',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e)  => {
    e.preventDefault();
    try {
      const result = await axios.post("https://tankwas-3.onrender.com/PostTransaction", {
        firstName: first_name,
        middleName: middleName,
        lastName: last_name,
        amount: amount,
        email: email,
        preferredDate: formData.preferredDate,
        departureLocation: "Bahir Dar",
        phone: phone,
        promocode: promocode,
        destinationLocation: card.title,
        numberOfPassengers: formData.numberOfPassengers,
        typeOfTransport: formData.typeOfTransport,
        paymentMethod: formData.paymentMethod,
        currency: formData.currency
      });
      console.log("Response:", result.data.paymentUrl);
      if (result.status === 201) {
        const id = result.data.booking._id; // Assuming result.data contains an 'id' field
        console.log(id)
      // router.push(`/congratulation?id=${id}`); // Pass the id as a query parameter
       router.push(result.data.paymentUrl); // Pass the id as a query parameter
      }
    } catch (error) {
      console.error("Error posting transaction:", error);
    }
    e.preventDefault();
  };


  useEffect(() => {
    setCard(cardData.find((card) => card.id === parseInt(id)));
  }, [id]);

  const validatePhone = (phone) => {
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone);
  };

  const handleBidNow = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate required fields
    if (!first_name || !last_name || !formData.preferredDate || !formData.numberOfPassengers || !formData.typeOfTransport || !formData.paymentMethod) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate email or phone
    if (!email && !phone) {
      toast.error("Please provide either an email or a phone number.");
      return;
    }

    // Validate phone format if provided
    if (phone && !validatePhone(phone)) {
      toast.error("Please enter a valid phone number starting with '09' followed by 8 digits.");
      return;
    }

    // If all validations pass, submit the form
    const form = e.target;
    form.submit(); // Submit the form to navigate to the Chapa payment page
  };

  const handleCardSelect = (cardId) => {
    // Save the selected card ID to localStorage
    localStorage.setItem('selectedCard', JSON.stringify(cardId));
    // Optionally, trigger a re-render or action here (e.g., reload the page, or use state updates)
  //  window.location.reload(); // This is a simple way to force a re-render (though not ideal)
  };
  useEffect(() => {
    if (id) {
      // Find the card with the matching ID
      const detail = cardData.find((card) => card.id === parseInt(id));
      setCardDetail(detail);
    }
  }, [id]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToPage = (page) => {
    setActivePage(page);
  };

  if (!cardDetail) {
    return <div>Loading...</div>; // Display loading while fetching data
  }

  return (
    <div className=" space-y-6 bg-white font-playfair text-[#85726a]">

      

      {/* Back to Home Link */}
     

      {/* Content: Conditional rendering of Service or Detail */}
      {activePage === 'service' &&
        <>
        <div className="w-full h-[300px] bg-[url('/boat.avif')] bg-cover bg-center ">
  
        <p className='text-3xl p-5'>
        <Link href="/" passHref className="text-blue-600">
       <FaArrowLeft/>
        </Link>
      </p>
      </div>
        <div className="max-w-4xl mx-auto p-6  shadow-lg ">
        <h2 className="text-2xl font-semibold text-slate-600 mb-6">Book Your Boat Transport</h2>
         <ToastContainer />

        <form onSubmit={handleSubmit}>
  
          {/* User Information */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={first_name}
              onChange={(e)=>{setFirstName(e.target.value)}}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">middle Name</label>
            <input
              type="text"
              id="last Name"
              name="last_name"
              value={middleName}
              onChange={(e)=>{setMiddleName(e.target.value)}}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">Last Name</label>
            <input
              type="text"
              id="last Name"
              name="last_name"
              value={last_name}
              onChange={(e)=>{setLastName(e.target.value)}}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          {/* <div className="mb-4">
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">Passport Number</label>
            <input
              type="text"
              id="passportNumber"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> */}
  
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder='optional'
              onChange={(e)=>{setEmail(e.target.value)}}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phone}
              placeholder='optional'
              onChange={(e)=>{setPhone(e.target.value)}}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Travel Information */}
          <div className="mb-4">
            <label htmlFor="departureLocation" className="block text-sm font-medium text-slate-700">Departure Location</label>
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
            <label htmlFor="promo" className="block text-sm font-medium text-slate-700">Promocode</label>
            <input
              type="text"
              id="promocode"
              name="promocode"
              value={promocode}
              onChange={(e)=>setPromoCode(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="destinationLocation" className="block text-sm font-medium text-slate-700">Destination Location</label>
            <input
              type="text"
              id="destinationLocation"
              name="destinationLocation"
              value={card.title}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="preferredDate" className="block text-sm font-medium text-slate-700">Preferred Date</label>
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
            <label htmlFor="numberOfPassengers" className="block text-sm font-medium text-slate-700">Number of Passengers</label>
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
            <label htmlFor="typeOfTransport" className="block text-sm font-medium text-slate-700">Type of Transport</label>
            <select
              id="typeOfTransport"
              name="typeOfTransport"
              value={formData.typeOfTransport}
              onChange={handleChange}
              className="mt-1 block w-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            >
              <option value="">Select Type</option>
              <option value="ferry">Ferry</option>
              <option value="cargo_ship">Cargo Ship</option>
              <option value="private_yacht">Private Yacht</option>
            </select>
          </div>
  
          {/* Payment Information */}
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="Chapa">Chapa</option>
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="USD">USD</option>
              <option value="Birr">Birr</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
  
          {/* Special Requests */}
          {/* <div className="mb-4">
            <label htmlFor="specialNeeds" className="block text-sm font-medium text-gray-700">Special Needs</label>
            <textarea
              id="specialNeeds"
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div> */}
    {/* <Link href="/Splashing" passHref > */}
    <button
            type="submit"
            className="w-full  bg-gradient-to-r from-blue-500 to-slate-700 hover:from-blue-600 hover:to-slate-800 text-white text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
           >
              Book Now ✨
          </button>
   
    {/* </Link> */}
        
        
        </form>
      </div>
      </>
      }

      <BottomNavBar />
    </div>
  );
};

export default DetailPage;
