'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://tankwas-3.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);

        // Save the token to localStorage or sessionStorage
        localStorage.setItem('token', data.token); // Store the token
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data (optional)

        // Redirect to the admin page
        router.push('/admin');
      } else {
        console.error('Login failed:', data.message);
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="bg-white bg-opacity-10 border-2 border-slate-300 p-8 rounded-2xl shadow-lg flex w-full max-w-4xl">
        <div className="w-1/2 flex items-center rounded justify-center p-6 md:flex">
          <div className="shadow-lg rounded-full">
            <Image src="/siite.png" width={250} height={250} alt="Login Illustration" className="rounded-full" />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-gray-400 text-center">Member Login</h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-500">
              Forgot Username / Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}