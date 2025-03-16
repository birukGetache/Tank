
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationComponent = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    city: null,
    error: null,
  });

  // Function to get the user's location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation((prevState) => ({
        ...prevState,
        error: "Geolocation is not supported by your browser.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation((prevState) => ({
          ...prevState,
          latitude,
          longitude,
          error: null,
        }));

        // Fetch city name using Nominatim
        const cityName = await fetchCityName(latitude, longitude);
        if (cityName) {
          setLocation((prevState) => ({
            ...prevState,
            city: cityName,
          }));
        }
      },
      (error) => {
        setLocation((prevState) => ({
          ...prevState,
          error: error.message,
        }));
      }
    );
  };

  // Function to fetch city name using Nominatim
  const fetchCityName = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.address) {
        const city = data.address.city || data.address.town || data.address.village;
        return city;
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
    }
    return null;
  };

  // Automatically fetch location when the component mounts
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="">
      {location.error && (
        <p className="text-red-500 mt-2">Error: {location.error}</p>
      )}

      {location.city && (
        <div className=" grid items-center  rounded-md">
            <p className="text-[#6ca6c1] text-start text-xl mt-4 capitalize">Your current Location</p>
            <div className="text-base   font-bold flex items-center w-full text-[#6ca6c1] bg-gray-100 p-2 rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-300">
                      <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6ca6c1]">
                       <FaMapMarkerAlt className="text-xl text-white" size={20} /> 
                      </span>
                      &nbsp; | 
                      &nbsp; 
                      <p className="text-[#6ca6c1]"> {location.city}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationComponent;
