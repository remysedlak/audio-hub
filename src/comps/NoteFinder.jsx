import React, { useEffect, useState } from 'react';

const NoteFinder = ({ file }) => {
    const [keys, setKeys] = useState([]);
    
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
    
    //decode via web audio api
    async function decodeMP3(file) {
        const audioContext = new AudioContext();
        const arrayBuffer = await file.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    }

    function computeFFT(audioBuffer) {
        // Create a new offline context for analysis
        const offlineContext = new OfflineAudioContext(
            audioBuffer.numberOfChannels,
            audioBuffer.length,
            audioBuffer.sampleRate
        );
        
        // Create source from the audio buffer
        const source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;
        
        // Create analyzer
        const analyser = offlineContext.createAnalyser();
        analyser.fftSize = 4096;
        
        // Connect source to analyzer
        source.connect(analyser);
        analyser.connect(offlineContext.destination);
        
        // Start the source
        source.start(0);
        
        // Process the audio
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        
        // Create a promise to render the audio
        return offlineContext.startRendering().then(() => {
            // Once rendering is complete, get the frequency data
            analyser.getFloatFrequencyData(dataArray);
            
            // Return the data and sample rate
            return { 
                spectrum: dataArray, 
                sampleRate: audioBuffer.sampleRate 
            };
        });
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
        
        // Convert negative dB values to relative magnitude
        const normalizedSpectrum = Array.from(spectrum).map(value => 
            // Convert from dB scale (negative values) to a positive scale
            Math.pow(10, value / 20)
        );
        
        for (let i = 0; i < normalizedSpectrum.length; i++) {
            const frequency = (i * sampleRate) / (2 * normalizedSpectrum.length); // Nyquist frequency adjustment
            const magnitude = normalizedSpectrum[i];
            
            // Only count frequencies with significant magnitude
            if (magnitude > 0.005) { // Threshold to filter out noise
                const note = frequencyToNote(frequency);
                if (note) {
                    noteCounts[note] = (noteCounts[note] || 0) + magnitude;
                }
            }
        }
    
        return noteCounts;
    }

    function getTopKeys(noteCounts) {
        // If no notes were detected, return an empty array
        if (Object.keys(noteCounts).length === 0) {
            return ["No keys detected"];
        }
        
        return Object.entries(noteCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
            .slice(0, 3) // Get top 3
            .map(entry => entry[0]); // Extract note names
    }

    async function findMostCommonKeys(file) {
        try {
            const audioBuffer = await decodeMP3(file);
            const { spectrum, sampleRate } = await computeFFT(audioBuffer);
            const noteCounts = detectKey(spectrum, sampleRate);
            return getTopKeys(noteCounts);
        } catch (error) {
            console.error("Error analyzing audio:", error);
            return ["Error analyzing audio"];
        }
    }
    console.log({keys});


    const pianoKeys = [
    { note: "C", hasBlack: true },
    { note: "D", hasBlack: true },
    { note: "E", hasBlack: false },
    { note: "F", hasBlack: true },
    { note: "G", hasBlack: true },
    { note: "A", hasBlack: true },
    { note: "B", hasBlack: false }
  ];

  return (
    <ul className="flex bg-gray-800 rounded p-2">
      {pianoKeys.map(({ note, hasBlack }, index) => (
        <li key={index} className="relative">
          {/* White Key */}
          <div
            className={`w-10 h-40 border border-gray-400 ${
              keys.includes(note) ? "bg-red-500" : "bg-white"
            }`}
            data-note={note}  // Store the note in a data attribute
          >
            {note}
          </div>

          {/* Black Key */}
          {hasBlack && (
            <div className="absolute top-0 left-7 w-6 h-24 bg-black" data-note={`${note}#`}></div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NoteFinder;