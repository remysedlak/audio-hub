import React from 'react';
import './tailwind.css'; // Ensure Tailwind CSS is imported
import AudioVisualizer from './comps/AudioVisualiser.jsx';
import KeyInformation from './comps/KeyInformation.jsx';

function App() {

  return (
    <div>
        <h1 className="text-4xl text-center py-4">Audio Visualizer</h1>
        <p className="text-center">Upload an audio file to see the visualization</p>

        <div className="flex justify-center py-10">
          <AudioVisualizer />
        </div>

        <div className="flex justify-center py-10">
          <KeyInformation />
        </div>
        
    </div>
  );
}

export default App;