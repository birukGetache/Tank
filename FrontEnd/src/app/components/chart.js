import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  FaCalendarAlt,
  FaShip,
  FaHandshake,
  FaBlog,
  FaUsers,
} from "react-icons/fa"; // Import icons from react-icons

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [boatOwners, setBoatOwners] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsResponse, boatOwnersResponse, sponsorsResponse, blogsResponse, usersResponse] =
          await Promise.all([
            axios.get("https://tankwas-3.onrender.com/bookings"),
            axios.get("https://tankwas-3.onrender.com/boatowners"),
            axios.get("https://tankwas-3.onrender.com/sponser"),
            axios.get("https://tankwas-3.onrender.com/api/blogs"),
            axios.get("https://tankwas-3.onrender.com/users"),
          ]);

        setBookings(bookingsResponse.data);
        setBoatOwners(boatOwnersResponse.data);
        setSponsors(sponsorsResponse.data);
        setBlogs(blogsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Data for the graph
  const chartData = [
    { name: "Bookings", count: bookings.length },
    { name: "Boat Owners", count: boatOwners.length },
    { name: "Sponsors", count: sponsors.length },
    { name: "Blogs", count: blogs.length },
    { name: "Users", count: users.length },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FaCalendarAlt className="text-purple-500 text-2xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Bookings</h2>
          <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FaShip className="text-blue-500 text-2xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Boat Owners</h2>
          <p className="text-2xl font-bold text-gray-900">{boatOwners.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FaHandshake className="text-green-500 text-2xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Sponsors</h2>
          <p className="text-2xl font-bold text-gray-900">{sponsors.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FaBlog className="text-yellow-500 text-2xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Blogs</h2>
          <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FaUsers className="text-red-500 text-2xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Users</h2>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Overview</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;