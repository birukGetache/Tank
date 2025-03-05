"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegWindowClose, FaThumbsUp, FaHeart, FaThumbtack, FaComment } from "react-icons/fa";
import BottomNavBar from "../components/BottomNavBar";
import { useTranslation } from "react-i18next";
const App = () => {
  const [blogPost, setBlogPost] = useState(null);
  const [comment, setComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(2);
  const { t } = useTranslation();
  useEffect(() => {
    axios.get("https://tankwas-3.onrender.com/api/blogs")
      .then((response) => {
        if (response.data.length > 0) {
          setBlogPost({
            ...response.data[0],
            comments: response.data[0].comments || [],
          });
        }
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, []);

  const handleCommentSubmit = () => {
    if (comment.trim() && blogPost) {
      axios.post(`https://tankwas-3.onrender.com/api/blogs/${blogPost._id}/comments`, { comment })
        .then((response) => {
          setBlogPost(response.data);
          setComment("");
        })
        .catch((error) => console.error("Error adding comment:", error));
    }
  };

  const handleLike = () => {
    if (blogPost) {
      axios.post(`https://tankwas-3.onrender.com/api/blogs/${blogPost._id}/like`)
        .then((response) => setBlogPost(response.data))
        .catch((error) => console.error("Error liking the blog:", error));
    }
  };

  const handleFavorite = () => {
    if (blogPost) {
      axios.post(`https://tankwas-3.onrender.com/api/blogs/${blogPost._id}/favorite`)
        .then((response) => setBlogPost(response.data))
        .catch((error) => console.error("Error updating favorite state:", error));
    }
  };

  const handlePin = () => {
    if (blogPost) {
      axios.post(`https://tankwas-3.onrender.com/api/blogs/${blogPost._id}/pin`)
        .then((response) => setBlogPost(response.data))
        .catch((error) => console.error("Error updating pin state:", error));
    }
  };

  if (!blogPost) {
    return <div className="flex justify-center items-center h-screen bg-gray-900">
    <div className="relative w-20 h-20 flex justify-center items-center">
      {/* Rotating Border */}
      <div className="absolute w-full h-full border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
      {/* Inner Circle */}
      <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
    </div>
  </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r  from-slate-500 to-slate-500 p-8">
 <p className="text-slate-900 m-auto w-full font-bold text-3xl">
        {t('blogsTitle')}
      </p>

      <div className="mt-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img className="w-full h-48 object-cover" src={blogPost.imageUrl} alt={blogPost.title} />
        <div className="p-6">
          <h2 className="text-xl font-bold text-blue-500">{blogPost.title}</h2>
          <p className="mt-2 text-gray-600">{blogPost.description}</p>

          <div className="mt-4 flex space-x-4">
            <button onClick={handleLike} className="text-blue-500 hover:text-blue-700 flex items-center">
              <FaThumbsUp className="mr-1" /> {blogPost.likes} Likes
            </button>
            <button onClick={handleFavorite} className={`flex items-center ${blogPost.isFavorite ? "text-red-500" : "text-gray-500"} hover:text-red-700`}>
              <FaHeart className="mr-1" /> {blogPost.isFavorite ? "Favorited" : "Favorite"}
            </button>
            <button onClick={handlePin} className={`flex items-center ${blogPost.isPinned ? "text-yellow-500" : "text-gray-500"} hover:text-yellow-700`}>
              <FaThumbtack className="mr-1" /> {blogPost.isPinned ? "Pinned" : "Pin"}
            </button>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded-l-lg focus:outline-none"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700"
              >
                <FaComment size={20} />
              </button>
            </div>

            <div className="mt-4">
              {blogPost.comments.slice(0, visibleComments).map((comment, index) => (
                <div key={index} className="text-gray-700 bg-gray-100 p-2 rounded-lg mt-2">
                  {comment}
                </div>
              ))}
            </div>

            {blogPost.comments.length > visibleComments && (
              <button
                onClick={() => setVisibleComments((prev) => prev + 2)}
                className="mt-2 text-blue-500 hover:text-blue-700"
              >
                Show More
              </button>
            )}
            {visibleComments > 2 && (
    <button
      onClick={() => setVisibleComments(2)}
      className="mt-2 text-blue-500 hover:text-blue-700"
    >
      Show Less
    </button>
  )}
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default App;
