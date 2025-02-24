import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLink, FaTwitter, FaFacebook, FaInstagram, FaEdit, FaTrash } from 'react-icons/fa';
import BottomNavBar from './componentsBottomNavBar';

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-8 text-center">
        Our Amazing Sponsors
      </h1>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-xs">
        <input
          type="text"
          placeholder="Search sponsors..."
          className="w-full p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display Sponsors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredSponsors.length > 0 ? (
          filteredSponsors.map((sponsor) => (
            <div key={sponsor._id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
              <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block text-center mb-4">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="mx-auto mb-4 w-24 h-24 sm:w-32 sm:h-32 object-contain transition-transform transform group-hover:scale-105"
                />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700">{sponsor.name}</h2>
              </a>
              <p className="text-gray-600 text-sm sm:text-base mb-4">{sponsor.description}</p>

              <div className="flex justify-center space-x-4 mb-4">
                {sponsor.twitter && <a href={sponsor.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter className="text-blue-500 hover:text-blue-600" size={18} /></a>}
                {sponsor.facebook && <a href={sponsor.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook className="text-blue-700 hover:text-blue-800" size={18} /></a>}
                {sponsor.instagram && <a href={sponsor.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram className="text-pink-500 hover:text-pink-600" size={18} /></a>}
              </div>

              {/* Delete Button */}
              <button onClick={() => deleteSponsor(sponsor._id)} className="text-red-500 hover:text-red-600">
                <FaTrash size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No sponsors found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default SponsorPage;
