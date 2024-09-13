import React from 'react';
import { useNavigate } from 'react-router-dom';
const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center  items-center justify-center">
        <h1 className="text-4xl mb-3 font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600 mb-4">Oops! Not found </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NoPage;
