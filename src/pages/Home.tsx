import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkIcon, UserPlus, UserCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Share Your Pronouns Easily
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create your personalized pronoun page in multiple languages and share it with others.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
          <div className="text-pink-600 mb-4">
            <UserPlus size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Create Your Profile</h2>
          <p className="text-gray-600 mb-6">
            Register to create your personalized pronoun page with support for multiple languages.
          </p>
          <Link 
            to="/register" 
            className="inline-block px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
          <div className="text-pink-600 mb-4">
            <LinkIcon size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Share Your Pronouns</h2>
          <p className="text-gray-600 mb-6">
            Share your pronoun page with friends, family, or colleagues through a custom link or QR code.
          </p>
          <Link 
            to="/register" 
            className="inline-block px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
          >
            Create Your Link
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-pink-600 font-bold">1</span>
            </div>
            <h3 className="font-bold mb-2">Register an Account</h3>
            <p className="text-gray-600">Create your account with a unique username.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-pink-600 font-bold">2</span>
            </div>
            <h3 className="font-bold mb-2">Set Your Pronouns</h3>
            <p className="text-gray-600">Choose your pronouns in multiple languages.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-pink-600 font-bold">3</span>
            </div>
            <h3 className="font-bold mb-2">Share Your Link</h3>
            <p className="text-gray-600">Share your custom link or QR code with others.</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-md p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6">Create your pronoun page in just a few minutes.</p>
        <Link 
          to="/register" 
          className="inline-block px-6 py-3 bg-white text-pink-600 font-bold rounded-md hover:bg-gray-100 transition-colors"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default Home;