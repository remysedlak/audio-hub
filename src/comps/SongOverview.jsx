import React from 'react';

const SongOverview = ({file}) => {
    
    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
            
            <h4 className="text-xl font-semibold py-2">Spectrogram</h4>
            <canvas id="spectrogram" className="w-1/2 h-1/2"></canvas>
            <h4 className="text-xl font-semibold">Key</h4>
            <h4 className="text-xl font-semibold">BPM </h4>
            
        </div>
    );
};

export default SongOverview;