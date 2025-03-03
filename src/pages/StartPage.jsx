import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = ({ setFile }) => {
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      setFile(file); // Set the file in the App component's state
      navigate('/visualizer'); // Navigate to the visualizer page
    }
  };

  return (
    <div className="flex flex-col items-center justify-around bg-gradient-to-r from-black to-purple-500 h-screen overflow-hidden">
      <h1 className="py-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-full text-center font-bold 
      animate-text text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-teal-500 to-white">Remy's Audio Hub</h1>
      <div>
        <label className="cursor-pointer">
          <h4 className="text-xl font-bold text-gray-400 mb-4 mt-4">Upload file to begin</h4>
          <input 
            type="file" 
            accept="audio/*" 
            className="hidden" 
            onChange={handleFileChange} 
          />
        </label>
      </div>
    </div>
  );
};

export default StartPage;