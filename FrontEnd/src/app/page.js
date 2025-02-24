"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BottomNavBar from "./components/BottomNavBar";
import { format } from "date-fns";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import WeatherInfo from "./components/Weather";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const users = useSelector((state) => state.counter.users);
  const [activeBlogIndex, setActiveBlogIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [visibleCardId, setVisibleCardId] = useState(null); // Track which card is visible
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredDestinations, setFilteredDestinations] = useState([]); // State for filtered destinations
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const initialDestinationsToShow = 4; // Number of destinations to show initially

  const blogs = [
    { title: "", content: "", url: "image.png" },
    { title: "", content: "", url: "OIP.jpeg" },
    { title: "", content: "", url: "image1.jpeg" },
    { title: "", content: "", url: "image1.jpeg" },
    { title: "", content: "", url: "images.jpg" },
  ];

  const cardData = [
    { id: 1, title: "Gonder", description: `5-star hotel with children, chosen date: ${selectedDate}`, url: "/gonder.avif" },
    { id: 2, title: "Gorgora", description: `5-star hotel with children, chosen date: ${selectedDate}`, url: "/Dembiya.jpg" },
    { id: 3, title: "Dembiya", description: `5-star hotel with children, chosen date: ${selectedDate}`, url: "/Dembiya.jpg" },
    { id: 4, title: "Hamusit", description: "Add a new student to the system", url: "/Hamusit.jpg" },
    { id: 5, title: "Fogera", description: "Fogera is part of the South Gondar Zone, located near Lake Tana, Ethiopia's largest lake.It is a fertile region, known for rice production and livestock, particularly the Fogera cattle breed, which is well-regarded for its milk and meat production.", url: "/gonder.avif" },
    { id: 6, title: "Bahita", description: "are often deeply rooted in local traditions and may not be widely known outside the immediate region unless they hold national or international significance.", url: "/gonder.avif" },
    { id: 7, title: "Dek deset", description: "Medicines available for purchase", url: "/gonder.avif" },
    { id: 8, title: "Dek deset", description: "Medicines available for purchase", url: "/gonder.avif" },
  ];
  const destinationsToShow = showAllDestinations ? cardData : cardData.slice(0, initialDestinationsToShow);
  useEffect(() => {
    const date = new Date();
    setCurrentDate(format(date, "MMMM dd, yyyy"));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBlogIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [blogs.length]);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter destinations based on search query
    const filtered = cardData.filter((card) =>
      card.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  if (loading) {
    return (
      <div className="flex gap-4 bg-slate-700 flex-col justify-center items-center h-screen">
        <div className="h-40 w-40 rounded-md">
          <img src="/mainLog.svg" alt="" className="rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-20 bg-slate-500 ${visibleCardId ? "overflow-hidden  h-screen bg-black bg-opacity-25" : ""}`}>
      <div className="fixed top-0 bg-slate-700 flex justify-center items-center w-full h-12 box-border z-30">
        <div className="grid grid-cols-5 h-fit bg-slate-700 p-6 m-auto z-10 w-full">
          <div className="col-span-1 place-items-center text-lg font-semibold h-10 w-10 bg-white rounded-full">
            <img src="/logo.png" className="rounded-full h-full w-full" alt="logo" />
          </div>
          <div className="flex-2 w-full col-span-4 rounded-3xl place-items-center ml-0">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full h-full rounded-3xl text-slate-600 box-border p-2 bg-blue-50"
            />
          </div>
        </div>
      </div>

      <div className="pl-3 pr-3 pb-3 font-playfair space-y-8 ">
        {/* Display filtered destinations above the main content */}
        {searchQuery && (
          <div className="pt-3 bg-yellow-50">
            <div className="space-y-4">
              <div className="grid grid-cols-2 place-items-center gap-6 overflow-x-auto pb-4">
                {filteredDestinations.map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col rounded-xl p-2 border-2 border-slate-700 bg-white w-full m-auto shadow-lg h-fit text-center cursor-pointer"
                  >
                    <img src={card.url} className="rounded-xl" alt={card.title} />
                    <button
                      className="mx-auto text-sm font-poppins bg-slate-700 rounded-full border-1 border-blue-600 m-4 w-fit p-2 text-blue-100 flex items-center space-x-2"
                      onClick={() => setVisibleCardId(card.id)}
                    >
                      {card.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 ">
          <div className="space-y-4">
            <div className="relative overflow-hidden pb-4 max-w-full">
              <div className="slideTrack marquee">
                {blogs.concat(blogs).map((blog, index) => (
                  <div key={index} className="slides">
                    <img src={blog.url} alt="Blog" className="w-full h-full object-cover rounded-md" />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-2">
              <span className="text-xs font-bold flex items-center w-44 text-slate-600 bg-gray-100 p-2 rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-300 mx-4">
                <span className="w-6 h-6 rounded-full bg-slate-700 flex justify-center items-center">
                  <FaCalendarAlt color="white" />
                </span>
                &nbsp; | {currentDate}
              </span>
              <WeatherInfo />
            </div>
          </div>
        </div>

        <div className="mt-0 pt-0">
          <p className="text-gray-300 text-xl px-6">Destination</p>
          <button
  className="mx-auto text-base font-poppins bg-gradient-to-r from-blue-500 to-slate-700 hover:from-blue-600 hover:to-slate-800 text-white rounded-full border-2 border-blue-500 m-4 w-fit px- py-1 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center space-x-2 p-2"
  onClick={() => setShowAllDestinations(!showAllDestinations)}
>
  {showAllDestinations ? "See Less" : "See More"}
</button>
<div className="grid grid-cols-2 place-items-center gap-6 overflow-x-auto pb-4">
  {destinationsToShow.map((card) => (
   <div
   key={card.id}
   className="flex flex-col rounded-xl p-2 border-2 border-slate-200 bg-gradient-to-br from-white to-slate-700 w-full m-auto shadow-lg h-fit text-center cursor-pointer"
 >
   <img src={card.url} className="rounded-xl" alt={card.title} />
   <button
     className="mx-auto text-base font-poppins bg-gradient-to-r from-blue-500 to-slate-700 hover:from-blue-600 hover:to-slate-800 text-white rounded-full border-2 border-blue-500 m-4 w-fit px-2 py-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center space-x-2 -mt-[20%]"
     onClick={() => setVisibleCardId(card.id)}
   >
     {card.title}
   </button>
 
   {visibleCardId === card.id && (
     <div
       className="bg-black overflow-hidden absolute top-0 left-0 flex justify-center items-center bg-opacity-10 h-screen w-screen"
       onClick={() => setVisibleCardId(null)}
     >
       <div className="flex-1 p-6 rounded-xl bg-slate-700 max-w-64 m-auto shadow-lg h-fit text-center cursor-pointer">
         <h4 className="text-xl font-semibold flex items-start flex-col gap-5">
           <img src={card.url} alt="hellow world" className="h-44" />
           {card.title}
         </h4>
         <p className="mt-2">{card.description}</p>
         <Link href={`/details/${card.id}`} className="w-fit h-6 bg-slate-200 text-blue-400 rounded-md px-2">
  Book
         </Link>
       </div>
     </div>
   )}
 </div>
 
  ))}
</div>
        </div>

        <BottomNavBar />
      </div>
    </div>
  );
};

export default HomePage;