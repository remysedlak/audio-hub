import React, { useEffect, useState } from 'react';
import MusicPlayer from '../comps/MusicPlayer';
import AudioVisualizer from '../comps/AudioVisualizer';
import SongOverview from '../comps/SongOverview';
import Piano from '../comps/Piano';

const AudioPage = ({ file }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAudioSrc(objectUrl);
    }
  }, [file]);

  return( 
  <>
    <div className=" flex flex-col h-screen bg-gray-700 ">
    <h1 className="py-4 lg:py-2 lg:mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-4xl max-w-full text-center font-bold 
      animate-text text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-400 to-white">Remy's Audio Hub</h1>
      <hr className= "py-10 m-4 lg:pt-0 sm:py-10 lg:py-0 lg:m-0"></hr>
      <div className="py-8 sm:py-6 m-4 lg:py-0"></div>
      {/* container for live and overview of song */}
      <div className=" my-8 flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row w-full px-4 h-screen justify-center items-center"> 
        
        {/* {audioSrc && (
          <audio controls src={audioSrc} className="mb-10">
            Your browser does not support the audio element.
          </audio>
        )} */}

        <div className="py-14"></div>
        
        <div className="sm:w-full md:w-full w-full lg:w-1/2 lg:mr-2">
          <h4 className="text-2xl text-white text-center font-bold my-4">Live Song Info</h4>
          <MusicPlayer file={file}/>
          
        </div>
        <div className="sm:w-full md:w-full w-full lg:w-1/2 lg:ml-2">
          <h4 className="text-2xl text-center font-bold text-white my-4">Song Overview</h4>
          <SongOverview file={file}/>
        </div>
        
        <div className="mb-20 lg:mb-0 lg:py-0"></div>

        </div>
        <div className="py-11 lg:py-0"></div>
        <a className="mt-4 lg:mt-0 text-sm opacity-10 text-center align-bottom" href="https://github.com/remysedlak/audio-hub">
            &copy; {new Date().getFullYear()} Remy Sedlak. Feel free to use and share this content.
          </a>
        
        </div>
        
      </>
      
    
  );
};

export default AudioPage;