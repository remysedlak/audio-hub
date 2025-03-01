import React from 'react';
import './tailwind.css'; // Ensure Tailwind CSS is imported
import StartPage from './pages/StartPage';

function App() {

  return (
    <div className="bg-gray-700 flex flex-col h-screen">
        <StartPage/>
        <AudioVisualizer/>
    </div>
  );
}

export default App;