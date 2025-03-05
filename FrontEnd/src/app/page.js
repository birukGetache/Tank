"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BottomNavBar from "./components/BottomNavBar";
import { format } from "date-fns";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import WeatherInfo from "./components/Weather";
import Marquee from 'react-fast-marquee';
import { useTranslation } from "react-i18next";

import './i18n';

const HomePage = () => {
  const { t, i18n } = useTranslation(); // Get the current language from i18n
  const [selectedDate, setSelectedDate] = useState("");
  const users = useSelector((state) => state.counter.users);
  const [activeBlogIndex, setActiveBlogIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [visibleCardId, setVisibleCardId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [destinations, setDestinations] = useState([]); // State to store fetched destinations

  const initialDestinationsToShow = 8;

  const blogs = [
    { title: "", content: "", url: "image.png" },
    { title: "", content: "", url: "OIP.jpeg" },
    { title: "", content: "", url: "image1.jpeg" },
    { title: "", content: "", url: "image1.jpeg" },
    { title: "", content: "", url: "images.jpg" },
  ];

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

  // Fetch destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('https://tankwas-3.onrender.com/destinations'); // Replace with your API endpoint
        const data = await response.json();
        setDestinations(data);
        setFilteredDestinations(data); // Initialize filtered destinations
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter destinations based on the search query and current language
    const filtered = destinations.filter((destination) =>
      destination.titles[i18n.language]?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  // Determine which destinations to show
  const destinationsToShow = showAllDestinations
    ? filteredDestinations
    : filteredDestinations.slice(0, initialDestinationsToShow);

  if (loading) {
    return (
      <div className="flex gap-4 bg-slate-700 flex-col justify-center items-center h-screen">
        <img src="/mainLog.svg" alt="Logo" className="rounded-md h-20" />
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white animate-gradient">
          TANKWA
        </p>
      </div>
    );
  }

  return (
    <div className={`pt-20 bg-slate-500 ${visibleCardId ? "overflow-hidden h-screen bg-black bg-opacity-25" : ""}`}>
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

      <div className="pl-3 pr-3 pb-3 font-playfair space-y-8">
        {searchQuery && (
          <div className="pt-3 bg-yellow-50">
            <div className="space-y-4">
              <div className="grid grid-cols-2 place-items-center gap-6 overflow-x-auto pb-4">
                {filteredDestinations.map((destination) => (
                  <div
                    key={destination._id} // Use _id instead of id
                    className="flex flex-col rounded-xl p-2 border-2 border-slate-700 bg-white w-full m-auto shadow-lg h-fit text-center cursor-pointer"
                  >
                    <img src={destination.image} className="rounded-xl" alt={destination.titles[i18n.language]} />
                    <button
                      className="mx-auto text-sm font-poppins bg-slate-700 rounded-full border-1 border-blue-600 m-4 w-fit p-2 text-blue-100 flex items-center space-x-2"
                      onClick={() => setVisibleCardId(destination._id)} // Use _id instead of id
                    >
                      {destination.titles[i18n.language]} {/* Use language-specific title */}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pt-3">
          <div className="space-y-4">
            <div className="relative overflow-hidden pb-4 max-w-full">
              <Marquee>
                {blogs.map((blog, index) => (
                  <div key={index} className="slides">
                    <img src={blog.url} alt="Blog" className="w-full h-full object-cover rounded-md" />
                  </div>
                ))}
              </Marquee>
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
          <h1 className="text-gray-300 text-xl px-6">
            {t('destinationTitle')}
          </h1>

          <div className="grid grid-cols-2 place-items-center gap-6 overflow-x-auto pb-4">
            {destinationsToShow.map((destination) => (
              <div
                key={destination._id} // Use _id instead of id
                className="flex flex-col rounded-xl p-2 border-2 border-slate-200 bg-gradient-to-br from-white to-slate-700 w-full m-auto shadow-lg h-fit text-center cursor-pointer"
              >
                <img src={destination.image} className="rounded-xl" alt={destination.titles[i18n.language]} />
                <button
                  className="mx-auto text-base font-poppins bg-gradient-to-r from-blue-500 to-slate-700 hover:from-blue-600 hover:to-slate-800 text-white rounded-full border-2 border-blue-500 m-4 w-fit px-2 py-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center space-x-2 -mt-[20%]"
                  onClick={() => setVisibleCardId(destination._id)} // Use _id instead of id
                >
                  {destination.titles[i18n.language]} {/* Use language-specific title */}
                </button>

                {visibleCardId === destination._id && (
                  <div
                    className="bg-black overflow-hidden absolute top-0 left-0 flex justify-center items-center bg-opacity-50 z-40 h-screen w-screen"
                    onClick={() => setVisibleCardId(null)}
                  >
                    <div className="flex-1 p-6 rounded-xl bg-slate-700 max-w-64 m-auto shadow-lg h-fit text-center cursor-pointer">
                      <h4 className="text-xl font-semibold flex items-start flex-col gap-5">
                        <img src={destination.image} alt="hello world" className="h-44" />
                        {destination.titles[i18n.language]} {/* Use language-specific title */}
                      </h4>
                      <p className="mt-2">{destination.descriptions[i18n.language]}</p> {/* Use language-specific description */}
                      <Link href={`/details/${destination._id}`} className="w-fit h-6 bg-slate-200 text-blue-400 rounded-md px-2">
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