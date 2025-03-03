import React, { useState, useEffect } from 'react';
import AudioVisualizer from './AudioVisualizer';

const MusicPlayer = ({ file }) => {
    const [audio, setAudio] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (file) {
            const audioUrl = URL.createObjectURL(file);
            const newAudio = new Audio(audioUrl);
            setAudio(newAudio);

            const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            const newAnalyser = newAudioContext.createAnalyser();
            newAnalyser.fftSize = 256;

            const source = newAudioContext.createMediaElementSource(newAudio);
            source.connect(newAnalyser);
            newAnalyser.connect(newAudioContext.destination);

            setAudioContext(newAudioContext);
            setAnalyser(newAnalyser);

            newAudio.addEventListener('timeupdate', () => {
                setCurrentTime(newAudio.currentTime);
            });

            newAudio.addEventListener('loadedmetadata', () => {
                setDuration(newAudio.duration);
            });

            return () => {
                newAudio.removeEventListener('timeupdate', () => {
                    setCurrentTime(newAudio.currentTime);
                });

                newAudio.removeEventListener('loadedmetadata', () => {
                    setDuration(newAudio.duration);
                });
            };
        }
    }, [file]);

    const playAudio = () => {
        if (audio) {
            audio.play();
            audioContext.resume();
        }
    };

    const pauseAudio = () => {
        if (audio) {
            audio.pause();
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
            {file && <p className="mb-4 text-lg font-semibold">Now playing: {file.name}</p>}
            <div className="flex space-x-4 mb-4">
                <button 
                    onClick={playAudio} 
                    className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Play
                </button>
                <button 
                    onClick={pauseAudio} 
                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Pause
                </button>
                <button 
                    onClick={pauseAudio} 
                    className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Load File
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <span>{formatTime(currentTime)}</span>
                <input 
                    type="range" 
                    min="0" 
                    max={duration} 
                    value={currentTime} 
                    onChange={(e) => audio && (audio.currentTime = e.target.value)} 
                    className="flex-grow"
                />
                <span>{formatTime(duration)}</span>
            </div>
            <AudioVisualizer 
            className="rounded"
            audioContext={audioContext} 
            analyser={analyser} 
            />
        </div>
    );
};

export default MusicPlayer;