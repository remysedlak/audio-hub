import React from 'react';
import './tailwind.css'; // Ensure Tailwind CSS is imported
import AudioVisualizer from './comps/AudioVisualiser.jsx';
import KeyInformation from './comps/KeyInformation.jsx';
import UploadButton from './comps/UploadButton.jsx';

function App() {

  return (
    <div>
        <h1 className="text-4xl text-center py-4 font-serif">Audio Visualizer</h1>
        <p className="text-center font-serif">
          This website transforms audio files into visual representations using the Web Audio API.
          </p>

        <div className="border hover:bg-gray-100 flex justify-center py-10">
          <UploadButton />
        </div>

        <h1 className="text-4xl text-center py-4 font-serif">Key Information</h1>
        <p className="text-center font-serif">
          Find's the key of the song you uploaded.
        </p>



        <div className="flex justify-center text-center py-10 font-serif">
          <AudioVisualizer />
        </div>

        <div className="flex justify-center py-10">
          <KeyInformation />
        </div>

        

        
        
    </div>
  );
}

export default App;