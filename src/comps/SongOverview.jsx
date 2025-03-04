import React, { useEffect, useState } from 'react';
import NoteFinder from './NoteFinder';
import Spectrogram from './InteractiveSpectogram';
import InteractiveSpectrogram from './InteractiveSpectogram';

const SongOverview = ({file}) => {
    console.log({file});

    const [keys, setKeys] = useState([]);

    return (
        <div className= "p-4 bg-gray-800 w-full text-gray-300 rounded-lg shadow-md flex flex-col lg:flex-row sm:flex-col md:flex-col xl:flex-row  bg-gray-800 text-white rounded-lg shadow-md w-full"> 

            <div className="flex flex-col justify-around">
                
                    
                <h4 className="text-xl font-semibold w-1/2 ml-2">Frequent Notes</h4>
                <p className="w-1/2 h=1/3 text-sm"><NoteFinder file={file} setKeys={setKeys}/></p>
            </div>

            <div className="flex flex-col justify-around">
            <h4 className="text-xl font-semibold w-1/2 mr-2">Audio Features</h4>
                <InteractiveSpectrogram 
                        className="w-1/3 h=1/3 mr-2"
                        file={file} /> 
                
                
            </div>

        </div>
    );
};

export default SongOverview;