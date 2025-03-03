import React, { useEffect, useState } from 'react';
import MusicPlayer from '../comps/MusicPlayer';
import AudioVisualizer from '../comps/AudioVisualizer';
import SongOverview from '../comps/SongOverview';

const AudioPage = ({ file }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAudioSrc(objectUrl);
    }
  }, [file]);

  return( <>
    <h1 className="mb-10 text-4xl text-center font-bold text-purple-400 mb-4 mt-4">Audio Hub</h1>

    {/* container for live and overview of song */}
    <div className="flex w-full h-screen justify-around"> 
      
      {/* {audioSrc && (
        <audio controls src={audioSrc} className="mb-10">
          Your browser does not support the audio element.
        </audio>
      )} */}
      <div className="w-1/3">
        <h4 className="text-2xl text-center font-bold text-gray-400 mb-4">Live Song Info</h4>
        <MusicPlayer file={file}/>
      </div>
      <div className="w-1/3">
        <h4 className="text-2xl text-center font-bold text-gray-400 mb-4">Song Overview</h4>
        <SongOverview/>
      </div>
  
    </div>
    </>
    
  );
};

export default AudioPage;