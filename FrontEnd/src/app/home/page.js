"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLink, FaTwitter, FaFacebook, FaInstagram, FaEdit, FaTrash } from 'react-icons/fa';
import BottomNavBar from '../components/BottomNavBar';
import { useTranslation } from "react-i18next";
const SponsorPage = () => {
  const [sponsors, setSponsors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSponsors();
  }, []);

  // Fetch sponsors from the backend
  const fetchSponsors = async () => {
    try {
      const response = await axios.get('https://tankwas-3.onrender.com/sponser');
      setSponsors(response.data);
    } catch (error) {
      console.error('Failed to fetch sponsors:', error);
    }
  };

  // Delete sponsor
  const deleteSponsor = async (id) => {
    try {
      await axios.delete(`https://tankwas-3.onrender.com/sponser/${id}`);
      fetchSponsors();  // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete sponsor:', error);
    }
  };

  // Filter sponsors based on the search term
  const filteredSponsors = sponsors.filter((sponsor) =>
    sponsor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-500  to-slate-500 flex flex-col items-center p-10">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
      {t('sponsorsTitle')}
      </h1>

      {/* Search Bar */}
      <div className="mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Search sponsors..."
          className="w-full p-3 rounded-lg border border-gray-500 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display Sponsors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredSponsors.length > 0 ? (
          filteredSponsors.map((sponsor) => (
            <div
  key={sponsor._id}
  className="bg-white border-2 border-slate-500 bg-opacity-10 w-full p-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group relative"
>
  {/* Delete Button (Top Right) */}
  <div className="absolute top-2 right-4">
    <button
      onClick={() => deleteSponsor(sponsor._id)}
      className="text-red-400 hover:text-red-500 transition-colors"
    >
      <FaTrash size={20} />
    </button>
  </div>

  {/* Image and Text */}
  <div className="flex items-center mb-4">
    <img
      src={`https://tankwas-3.onrender.com${sponsor.logo}`}
      alt={sponsor.name}
      className="w-16 h-16 rounded-full object-contain mr-4"
    />
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white">{sponsor.name}</h2>
      <p className="text-gray-300 text-sm sm:text-base">{sponsor.description}</p>
    </div>
  </div>

  {/* Sponsor URL */}
  <h5 className='flex justify-center'><a
    href={sponsor.url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-800 text-sm mt-2 inline-block m-auto border-2 border-slate-900 rounded-lg px-2"
  >
    Visit Website
  </a></h5>

  {/* Social Media Links */}
  <div className="flex justify-center space-x-4 mt-4">
    {sponsor.twitter && (
      <a href={sponsor.twitter} target="_blank" rel="noopener noreferrer">
        <FaTwitter className="text-blue-400 hover:text-blue-500 transition-colors" size={20} />
      </a>
    )}
    {sponsor.facebook && (
      <a href={sponsor.facebook} target="_blank" rel="noopener noreferrer">
        <FaFacebook className="text-blue-600 hover:text-blue-700 transition-colors" size={20} />
      </a>
    )}
    {sponsor.instagram && (
      <a href={sponsor.instagram} target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-pink-500 hover:text-pink-600 transition-colors" size={20} />
      </a>
    )}
  </div>
</div>

          ))
        ) : (
          <p className="text-center text-gray-400">No sponsors found for "{searchTerm}"</p>
        )}
      </div>
      <BottomNavBar />
    </div>
  );
};

export default SponsorPage;