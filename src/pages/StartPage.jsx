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
    <div className="flex flex-col items-center bg-gray-700 h-screen">
      <h1 className="mb-10 text-4xl text-center font-bold text-gray-800 mb-4">Welcome to harmoniX</h1>
      <div>
        <label className="cursor-pointer">
          <h4 className="text-2xl text-center font-bold text-gray-400 mb-4">Upload file to begin</h4>
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