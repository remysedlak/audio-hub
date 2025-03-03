import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './tailwind.css'; // Ensure Tailwind CSS is imported
import StartPage from './pages/StartPage';
import AudioVisualizer from './pages/AudioPage';

function App() {
  const [file, setFile] = useState(null);

  return (
    <Router>
      <div className="bg-gray-700 font-sans text-white overflow-y-auto">
        <Routes>
          <Route path="/" element={<StartPage setFile={setFile} />} />
          <Route path="/visualizer" element={<AudioVisualizer file={file} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;