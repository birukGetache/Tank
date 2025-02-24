"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
  
    try {
      const response = await axios.post("https://tankwas-3.onrender.com/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBlogs([...blogs, response.data]);
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Failed to post blog:", error);
    }
  };
  
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">Post a Blog</h1>

      {/* Form for posting a blog */}
      <form
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block font-bold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter blog title"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter blog description"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-bold mb-1">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Post Blog
        </button>
      </form>

      {/* Blog List */}
      <h2 className="text-2xl font-bold text-blue-500 text-center mt-8 mb-4">Blogs</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
            <p className="text-gray-600 mt-2">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
