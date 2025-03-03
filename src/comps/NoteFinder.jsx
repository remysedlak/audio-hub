
import React, { useEffect, useState } from 'react';
// Contains methods and components for the KeyFinder component
const KeyFinder = ({ file }) => {

    useEffect(() => {
  
        console.log("Offline file received:", file);
        async function processFile() {
            if (file) {
                const detectedKeys = await findMostCommonKeys(file);
                setKeys(detectedKeys);
            }
        }
        processFile();
    }, [file]);

    const [keys, setKeys] = useState([]);
    
    //decode via web audio api
    async function decodeMP3(file) {
        const audioContext = new AudioContext();
        const arrayBuffer = await file.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    }

    function computeFFT(audioBuffer) {
        const audioContext = new AudioContext(); // Create a new AudioContext
        const analyser = audioContext.createAnalyser(); // Create AnalyserNode using the correct AudioContext
        analyser.fftSize = 4096; // Set fftSize property of the analyser
        
        const source = audioContext.createBufferSource(); // Create a BufferSource
        source.buffer = audioBuffer; // Set the audio buffer
        source.connect(analyser); // Connect the source to the analyser
        analyser.connect(audioContext.destination); // Connect analyser to destination (output)
    
        // Create an array to store frequency data
        const spectrum = new Float32Array(analyser.frequencyBinCount);
        
        // Get the frequency data from the analyser node
        analyser.getFloatFrequencyData(spectrum);
    
        return { spectrum, sampleRate: audioBuffer.sampleRate };
    }

    function frequencyToNote(frequency) {
        const A4 = 440;
        const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        if (frequency < 20 || frequency > 5000) return null; // Ignore non-musical range
    
        const midi = Math.round(69 + 12 * Math.log2(frequency / A4));
        const note = noteNames[midi % 12];
        return note;
    }

    function detectKey(spectrum, sampleRate) {
        let noteCounts = {};
    
        for (let i = 0; i < spectrum.length; i++) {
            const frequency = (i * sampleRate) / spectrum.length;
            const note = frequencyToNote(frequency);
            if (note) {
                noteCounts[note] = (noteCounts[note] || 0) + 1;
            }
        }
    
        return noteCounts;
    }

    function getTopKeys(noteCounts) {
        return Object.entries(noteCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
            .slice(0, 3) // Get top 3
            .map(entry => entry[0]); // Extract note names
    }

    async function findMostCommonKeys(file) {
        const audioBuffer = await decodeMP3(file);
        const { spectrum, sampleRate } = computeFFT(audioBuffer);
        const noteCounts = detectKey(spectrum, sampleRate);
        return getTopKeys(noteCounts);
    }
    
    return <p>{keys.join(", ")}</p>;
};
export default KeyFinder;
