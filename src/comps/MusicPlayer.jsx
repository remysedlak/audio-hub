import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioVisualizer from './AudioVisualizer';
import AudioInfo from './AudioInfo';

const MusicPlayer = ({ file }) => {
    const [audio, setAudio] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bpm, setBpm] = useState(null);
    const [key, setKey] = useState(null);
    const navigate = useNavigate();

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

            console.log('Calling detectBeats');
            detectBeats(newAnalyser, newAudioContext);

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

    const detectBeats = (analyser, audioContext) => {
        console.log('detectBeats called');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        let lastTime = 0;
        let beatCount = 0;

        const processAudio = () => {
            analyser.getByteFrequencyData(dataArray);

            // Get the average volume (energy level)
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const avgVolume = sum / bufferLength;

            // Beat detection threshold (adjust this value)
            const threshold = 60; // Lowered threshold value

            console.log(`avgVolume: ${avgVolume}, threshold: ${threshold}`);

            if (avgVolume > threshold) {
                const currentTime = audioContext.currentTime;

                console.log(`currentTime: ${currentTime}, lastTime: ${lastTime}`);

                if (currentTime - lastTime > 0.3) {
                    lastTime = currentTime;
                    beatCount++;

                    // Calculate BPM (beats per minute)
                    const elapsedTime = currentTime || 1;
                    const estimatedBpm = (beatCount / elapsedTime) * 60;
                    setBpm(Math.round(estimatedBpm));
                    console.log(`BPM: ${Math.round(estimatedBpm)}`); // Debug log
                }
            }

            requestAnimationFrame(processAudio); // Keep updating
        };

        processAudio();
    };

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

    useEffect(() => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [file]);

    return (
        <div className="p-4 bg-gray-800 w-full text-white rounded-lg shadow-md">
            {file && <p className="mb-4 text-lg font-semibold">Now playing: {file.name}</p>}
            <div className="flex space-x-4 mb-4 w-full">
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
                    onClick={() => navigate('/')} 
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
            <AudioInfo
                bpm={bpm}
                key= {key}
            />
        </div>
    );
};

export default MusicPlayer;