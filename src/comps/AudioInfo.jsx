import React from 'react';

const AudioInfo = ({ bpm, key }) => {
    
    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold">Audio Information</h2>
            {bpm !== null ? (
                <p className="mt-1">
                    BPM: {bpm} </p>
            ) : (
                <p className="mt-2">Calculating BPM...</p>
            )}

            {bpm !== null ? (
                <p className="mt-1">
                    Key: {key} </p>
            ) : (
                <p className="mt-2">Calculating Key...</p>
            )}
        </div>
    );
};

export default AudioInfo;