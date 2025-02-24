"use client"
import React, { useState , useEffect } from 'react';
import {  useSelector } from 'react-redux';
import BottomNavBar from './components/BottomNavBar';
import { format } from 'date-fns';
import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';
import WeatherInfo from './components/Weather';
const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const users = useSelector((state) => state.counter.users);
  const [activeBlogIndex, setActiveBlogIndex] = useState(0);
  const [visible , setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    setCurrentDate(format(date, 'MMMM dd, yyyy')); // format the date to a readable format
  }, []);
  const blogs = [
    { title: "", content: "", url: "image.png" },
    { title: "", content: "", url: "OIP.jpeg" },
    { title: "", content: "", url: "image1.jpeg" },
    { title: "", content: "", url: "image1.jpeg" },
    { title: "", content: "", url: "images.jpg" },
  ];
  const cardData = [
    {id:1, title: "Gonder", description: `5-star hotel with children, chosen date: ${selectedDate}`,url:"/gonder.avif" },
    {id:2, title: "Gorgora ", description: `5-star hotel with children, chosen date: ${selectedDate}`,url:"/Dembiya.jpg" },
    {id:3, title: "Dembiya", description: `5-star hotel with children, chosen date: ${selectedDate}`,url:"/Dembiya.jpg" },
    {id:4, title: " Hamusit", description: "Add a new student to the system" ,url:"/Hamusit.jpg"},
    {id:5, title: "Fogera", description: "Essential items for your trip" ,url:"/gonder.avif"},
    {id:6, title: "Bahita", description: "Price for late home rental" ,url:"/gonder.avif"},
    {id:7, title: "Dek deset", description: "Medicines available for purchase",url:"/gonder.avif" },
  ];

  useEffect(() => {
    const checkAssetsLoaded = async () => {
      // Simulate a delay for loading assets
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust time as needed
      setLoading(false);
    };

    checkAssetsLoaded();
    if (!localStorage.getItem('selectedCard')) {
      localStorage.setItem('selectedCard', JSON.stringify(null)); // or set a default card ID if needed
    }
       // Save the selected card ID to localStorage
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBlogIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 5000); // Increased interval to 5 seconds (slower)

    return () => clearInterval(interval);
  }, [blogs.length]);
  if (loading) {
    return (
      <div className='flex gap-4 bg-blue-400 flex-col justify-center items-center h-screen'>
        <div className='h-40 w-40 rounded-md'>
        <img src='/mainLog.svg' alt="" className='rounded-md'/ >
        </div>
   
  </div>  
    );
  }

  return (
    <div className={`pt-20  ${visible ? "overflow-hidden  h-screen" : ""}`}>
    <div className='fixed top-0 bg-blue-400  flex justify-center items-center w-full h-12  box-border z-30'>
    <div className="grid grid-cols-5 h-fit  bg-blue-400 p-6 m-auto z-10 w-full  ">
      <div className="col-span-1 place-items-center text-lg font-semibold h-10 w-10 bg-white rounded-full">
      {/* <Link href={`/create`} passHref>
      <img
  src={users && users[0] && users[0].fileUrl ? users[0].fileUrl : '/defuser.jpg'}
  className="rounded-full h-full w-full"
  alt="User"
/>
</Link> */}
 <img src='/logo.png' className='rounded-full h-full w-full' alt='logo' />
        </div>
      <div className="flex-2 w-full col-span-3 rounded-3xl place-items-center ml-0 ">
        <input
          type="text"
          placeholder="Search..."
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full h-full rounded-3xl box-border p-2 bg-blue-50"
        />
      </div>
      <div className=" text-lg font-semibold place-items-center col-span-1 flex justify-center items-center">
          <i class="fas fa-bell  text-blue-800 text-3xl mr-2"></i>
      </div>
    </div>
    </div>
    <div className="pl-3 pr-3 pb-3 font-playfair space-y-8 bg-yellow-50">
      {/* Top Section: Profile, Search, Notifications */}
      <div className=' pt-3 bg-yellow-50'>
      
      {/* Blogs Section */}
      <div className="space-y-4 ">
        <div className="relative overflow-hidden pb-4 max-w-full">
        <div className='slideTrack' > {/* Enable horizontal scrolling and snapping */}
 
  {blogs.map((blog, index) => (
    <div
      key={index}
  className='slides'
    >
      <img
        src={blog.url}
        alt="Blog"
        className="w-full h-full object-cover rounded-md" // Updated class to cover the entire div
      />
    </div>
  ))}
</div>
        </div>

        <div className="text-center mt-2">
          <div></div>
          <span className="text-2xl">
              {blogs.map((_, index) => (
                <span
                  key={index}
                  className={`px-2 transition-all duration-300 ${
                    index === activeBlogIndex ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  •
                </span>
              ))}
                <span className="text-xs font-bold flex  items-center w-44 text-blue-600 bg-gray-100 p-2 rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-300 mx-4">
                    <span className='w-6 h-6 rounded-full bg-blue-500 flex justify-center items-center '>
                        <FaCalendarAlt color='white'></FaCalendarAlt>
                    </span>
                    &nbsp; | {currentDate}
                </span>
                <WeatherInfo></WeatherInfo>
            </span>
        </div>
      </div>
    </div>
      {/* Booking Cards Section */}
      <div className="space-y-6">
        <p className='p-10 text-gray-700 text-xl px-6'>Destination</p>
      <div className="grid grid-cols-2 place-items-center gap-6 overflow-x-auto pb-4">
        {cardData.map((card, index) => (
        <>
        <div className="flex flex-col  rounded-xl p-2  bg-white w-full m-auto shadow-lg h-fit text-center cursor-pointer">
          {/* <h4 className="text-xl font-semibold flex flex-col gap-5">
            <span><img src="/y.svg" alt="logo" className='h-12 w-56'/></span>
            {card.title}
          </h4>
          <p className="mt-2">{card.description}</p>
          <button className='w-fit h-6 bg-white text-blue-400 rounded-md px-2' onClick={()=>setVisible(true)}>more</button> */}
          <img src={card.url} className='rounded-xl'></img>
          <div className='bg-white  w-full h-full bg-opacity-45' onClick={()=>setVisible(true)}>
          <p className=" m-auto text-2xl font-bold text-slate-700 ">{card.title}</p>
          </div>
        

        </div>


       {visible&& <div className='bg-black overflow-hidden  absolute top-0 flex justify-center items-center bg-opacity-10 h-screen w-screen' onClick={()=>setVisible(false)}>
        <div className="flex-1 p-6 rounded-xl bg-blue-400 max-w-64 m-auto shadow-lg h-64 text-center cursor-pointer">
          <h4 className="text-xl font-semibold flex flex-col gap-5">
            <span><img src="/y.svg" alt="logo" className='h-12 w-56'/></span>
            {card.title}
          </h4>
          <p className="mt-2">{card.description}</p>
          <Link key={index} href={`/details/${card.id}`}>  <button className='w-fit h-6 bg-white text-blue-400 rounded-md px-2'>Book</button>     </Link>
        </div>
        </div>
  }
        </>
      
        ))}
      </div>
    </div>
      <BottomNavBar></BottomNavBar>
    </div>
    </div>
  );
};

export default HomePage;