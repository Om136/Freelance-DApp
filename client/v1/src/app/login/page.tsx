"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    role: '' // Add role field
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation
    if (!formData.email || !formData.password) {
      alert("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      setLoading(false);
      return;
    }

    if (!isLogin && !formData.role) {
      alert("Please select a role");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? 'http://localhost:8080/login' : 'http://localhost:8080/signUp';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          ...((!isLogin && formData.name) && { username: formData.name }),
          ...((!isLogin && formData.role) && { role: formData.role })
        }),
      });

      const data = await response.json();
      console.log(data);


      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store the token if provided in the response
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      router.push('/dashboard');
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left side - Image/Branding */}
      <div className="md:w-1/2 relative overflow-hidden">
        {/* Unsplash Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Blockchain Technology" 
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-purple-900/40" />
        </div>
        
        {/* Content positioned on top of the image */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-10">
          <Link href="/" className="mb-10">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">TalentChain</h1>
          </Link>
          
          <div className="mt-8 text-center max-w-md">
            <h2 className="text-3xl font-semibold mb-4 text-white drop-shadow-lg">
              Decentralized Talent Network
            </h2>
            <p className="text-gray-100 text-lg drop-shadow-md">
              Connect, collaborate, and transact securely with global talent through blockchain-verified contracts.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Login/Signup Form */}
      <div className="md:w-1/2 p-10 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-800 rounded-full p-1 inline-flex">
                <button 
                  onClick={() => setIsLogin(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    isLogin ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-300'
                  }`}
                >
                  Login
                </button>
                <button 
                  onClick={() => setIsLogin(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    !isLogin ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-300'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              
              {/* Role selection for registration (appears only in signup form) */}
              {!isLogin && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Select Role</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label 
                      className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                        formData.role === 'recruiter' 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                      }`}
                    >
                      <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="font-medium">Recruiter</span>
                      <span className="text-xs text-gray-400 mt-1">Hire talent</span>
                      <input 
                        type="radio" 
                        name="role" 
                        value="recruiter" 
                        checked={formData.role === 'recruiter'} 
                        onChange={handleChange} 
                        className="sr-only"
                      />
                    </label>
                    <label 
                      className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                        formData.role === 'freelancer' 
                          ? 'border-purple-500 bg-purple-900/20' 
                          : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                      }`}
                    >
                      <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <span className="font-medium">Freelancer</span>
                      <span className="text-xs text-gray-400 mt-1">Offer services</span>
                      <input 
                        type="radio" 
                        name="role" 
                        value="freelancer" 
                        checked={formData.role === 'freelancer'} 
                        onChange={handleChange} 
                        className="sr-only" 
                      />
                    </label>
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {!isLogin && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                  />
                </div>
              )}
              
              {isLogin && (
                <div className="mb-6 flex justify-end">
                  <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
              )}
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all flex justify-center items-center"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </form>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            By creating an account, you agree to our <Link href="/terms" className="text-blue-400 hover:text-blue-300">Terms of Service</Link> and <Link href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
