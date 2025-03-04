import React, { useEffect, useState } from 'react';
import NoteFinder from './NoteFinder';
import Piano from './Piano';

const SongOverview = ({file}) => {
    console.log({file});

    const [keys, setKeys] = useState([]);

    return (
        <div className= "flex flex-row justify-around items-top p-4 bg-gray-800 text-white rounded-lg shadow-md"> 
            <div className="flex flex-col">
                
                <h4 className="text-xl font-semibold py-2">Spectrogram</h4>
                <canvas id="spectrogram" className="w-1/2 h-1/2"></canvas>

                <h4 className="text-xl font-semibold mb-3">Frequent Notes</h4>
                <p className=""><NoteFinder file={file} setKeys={setKeys}/></p>
                
            </div>
            <div>
                <h4 className="text-xl font-semibold py-2">Audio Features</h4>
                <canvas id="spectrogram" className="w-1/2 h-1/2"></canvas>
            </div>
        </div>
    );
};

export default SongOverview;