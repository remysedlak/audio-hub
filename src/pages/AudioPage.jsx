import React, { useEffect, useState } from 'react';
import MusicPlayer from '../comps/MusicPlayer';

const AudioVisualizer = ({ file }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAudioSrc(objectUrl);
    }
  }, [file]);

  return (
    <div className="flex flex-col items-center bg-gray-700 h-screen">
      <h1 className="mb-10 text-4xl text-center font-bold text-gray-800 mb-4">Audio Visualizer</h1>
      {/* {audioSrc && (
        <audio controls src={audioSrc} className="mb-10">
          Your browser does not support the audio element.
        </audio>
      )} */}
      <h4 className="text-2xl text-center font-bold text-gray-400 mb-4">Basic Song Info</h4>
      <MusicPlayer file={file}/>
    </div>
  );
};

export default AudioVisualizer;