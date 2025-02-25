import React, { useState, useEffect } from "react";
import axios from "axios";

const BoatOwner = () => {
  const [boatOwners, setBoatOwners] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    middleName: "",
    phone: "",
    id: "",
  });

  // Fetch boat owners data
  const fetchBoatOwners = async () => {
    try {
      const response = await axios.get("https://tankwas-3.onrender.com/boatowners");
      setBoatOwners(response.data);
    } catch (error) {
      console.error("Error fetching boat owners:", error);
    }
  };

  useEffect(() => {
    fetchBoatOwners();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Create or Update boat owner
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing boat owner
      await axios.put(`https://tankwas-3.onrender.com/boatowners/${formData.id}`, formData);
    } else {
      // Create new boat owner
      await axios.post("https://tankwas-3.onrender.com/boatowners", formData);
    }
    setFormData({
      name: "",
      fatherName: "",
      middleName: "",
      phone: "",
      id: "",
    });
    fetchBoatOwners();
  };

  // Handle delete
  const handleDelete = async (id) => {
    await axios.delete(`https://tankwas-3.onrender.com/boatowners/${id}`);
    fetchBoatOwners();
  };

  // Handle edit
  const handleEdit = (owner) => {
    setFormData({
      name: owner.name,
      fatherName: owner.fatherName,
      middleName: owner.middleName,
      phone: owner.phone,
      id: owner._id,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Boat Owner Management</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father Name:</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name:</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Submit
          </button>
        </form>
      </div>

      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Boat Owners List</h2>
        {boatOwners.map((owner) => (
          <div key={owner._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <p className="text-gray-700"><span className="font-semibold">Name:</span> {owner.name}</p>
            <p className="text-gray-700"><span className="font-semibold">Father Name:</span> {owner.fatherName}</p>
            <p className="text-gray-700"><span className="font-semibold">Middle Name:</span> {owner.middleName}</p>
            <p className="text-gray-700"><span className="font-semibold">Phone:</span> {owner.phone}</p>
            <div className="mt-3">
              <button onClick={() => handleEdit(owner)} className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(owner._id)} className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoatOwner;