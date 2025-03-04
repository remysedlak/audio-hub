import React, { useRef, useEffect, useState } from 'react';

const InteractiveSpectrogram = ({ file }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [status, setStatus] = useState('Waiting for file');
  const [audioDetails, setAudioDetails] = useState({
    duration: 0,
    sampleRate: 0,
    channels: 0
  });
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [detectedNotes, setDetectedNotes] = useState([]);

  // Frequency to note conversion utility
  const frequencyToNote = (frequency) => {
    const A4 = 440;
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    
    if (frequency < 20 || frequency > 5000) return 'N/A';
    
    const midi = Math.round(69 + 12 * Math.log2(frequency / A4));
    const octave = Math.floor(midi / 12) - 1;
    const note = noteNames[midi % 12];
    
    return `${note}${octave}`;
  };

  // Frequency for a given note
  const noteToFrequency = (noteName) => {
    const A4 = 440;
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    
    // Find the index of the base note (without octave)
    const baseNote = noteName.replace(/\d+/, '');
    const noteIndex = noteNames.indexOf(baseNote);
    
    // Extract octave
    const octave = parseInt(noteName.match(/\d+/)[0]);
    
    // Calculate midi number
    const midi = (octave + 1) * 12 + noteIndex;
    
    // Convert to frequency
    return A4 * Math.pow(2, (midi - 69) / 12);
  };

  useEffect(() => {
    const processSpectrogram = async () => {
      if (!file) return;

      try {
        setStatus('Processing audio...');
        const audioContext = new AudioContext();
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Set audio details
        setAudioDetails({
          duration: audioBuffer.duration,
          sampleRate: audioBuffer.sampleRate,
          channels: audioBuffer.numberOfChannels
        });

        // Create an offline context for FFT processing
        const offlineContext = new OfflineAudioContext(
          audioBuffer.numberOfChannels,
          audioBuffer.length,
          audioBuffer.sampleRate
        );

        const source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;

        const analyser = offlineContext.createAnalyser();
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;

        source.connect(analyser);
        analyser.connect(offlineContext.destination);
        source.start(0);

        // Render the audio offline
        await offlineContext.startRendering();

        // Prepare canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Adjust canvas size to container
        const container = containerRef.current;
        canvas.width = container.clientWidth;
        canvas.height = 200;

        // Define margins for axis
        const MARGIN_BOTTOM = 0;
        const MARGIN_LEFT = 50;
        const plotWidth = canvas.width - MARGIN_LEFT;
        const plotHeight = canvas.height - MARGIN_BOTTOM;

        // Create gradient for visualization
        const gradient = ctx.createLinearGradient(0, 0, plotWidth, 0);
        gradient.addColorStop(0, 'rgba(0, 0, 255, 0.8)');   // Deep Blue
        gradient.addColorStop(0.3, 'rgba(0, 255, 255, 0.6)'); // Cyan
        gradient.addColorStop(0.7, 'rgba(0, 255, 0, 0.4)');   // Green
        gradient.addColorStop(1, 'rgba(255, 255, 0, 0.2)');   // Yellow

        // Prepare frequency data array
        const dataArray = new Uint8Array(bufferLength);

        // Detect most common notes
        const detectMostCommonNotes = () => {
          analyser.getByteFrequencyData(dataArray);
          
          // Track note frequencies
          const noteCounts = {};
          
          for (let i = 0; i < bufferLength; i++) {
            const frequency = (i * audioBuffer.sampleRate) / (2 * bufferLength);
            const intensity = dataArray[i] / 255;
            
            // Only consider significant frequencies
            if (intensity > 0.1 && frequency > 20 && frequency < 5000) {
              const note = frequencyToNote(frequency);
              
              if (note !== 'N/A') {
                noteCounts[note] = (noteCounts[note] || 0) + intensity;
              }
            }
          }
          
          // Sort and get top 3 notes
          const sortedNotes = Object.entries(noteCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([note]) => note);
          
          setDetectedNotes(sortedNotes);
          return sortedNotes;
        };

        // Draw frequency axis labels
        const drawFrequencyLabels = (notesToShow) => {
          ctx.fillStyle = 'white';
          ctx.font = '10px Arial';
          
          notesToShow.forEach((note, index) => {
            // Calculate frequency for the note
            const frequency = noteToFrequency(note);
            
            // Calculate x position using logarithmic scale
            const logMin = Math.log10(20);
            const logMax = Math.log10(5000);
            const logFreq = Math.log10(frequency);
            const normalizedPosition = (logFreq - logMin) / (logMax - logMin);
            
            const x = MARGIN_LEFT + (normalizedPosition * plotWidth);
            
            // Draw label
            ctx.save();
            ctx.translate(x, canvas.height - 10);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText(note, 0, 0);
            ctx.restore();
            
            // Draw vertical grid line
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, plotHeight);
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.stroke();
          });
        };

        // Visualization function
        const drawSpectrogram = () => {
          // Clear canvas
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Detect most common notes
          const notesToShow = detectMostCommonNotes();

          // Draw frequency labels and grid
          drawFrequencyLabels(notesToShow);

          // Get frequency data
          analyser.getByteFrequencyData(dataArray);

          // Draw spectrogram
          const barHeight = plotHeight;
          let x = MARGIN_LEFT;

          for (let i = 0; i < bufferLength; i++) {
            const barWidth = 2;
            const intensity = dataArray[i] / 255;
            const frequency = (i * audioBuffer.sampleRate) / (2 * bufferLength);

            // Calculate x position using logarithmic scale
            const logMin = Math.log10(20);
            const logMax = Math.log10(5000);
            const logFreq = Math.log10(Math.max(frequency, 20));
            const normalizedPosition = (logFreq - logMin) / (logMax - logMin);
            
            const barX = MARGIN_LEFT + (normalizedPosition * plotWidth);

            // Use gradient for color
            ctx.fillStyle = gradient;
            ctx.globalAlpha = intensity;
            ctx.fillRect(
              barX, 
              0, 
              barWidth, 
              barHeight
            );
            ctx.globalAlpha = 1;

            x += barWidth;
          }
        };

        // Interactive hover functionality
        canvas.addEventListener('mousemove', (event) => {
          const rect = canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          // Check if within plot area
          if (x < MARGIN_LEFT || x > canvas.width || y < 0 || y > plotHeight) {
            setTooltipInfo(null);
            return;
          }

          // Calculate frequency based on x-position
          const logMin = Math.log10(20);
          const logMax = Math.log10(5000);
          const normalizedPosition = (x - MARGIN_LEFT) / plotWidth;
          const logFreq = logMin + normalizedPosition * (logMax - logMin);
          const frequency = Math.pow(10, logFreq);
          const note = frequencyToNote(frequency);

          setTooltipInfo({
            x: event.clientX,
            y: event.clientY,
            frequency: frequency.toFixed(2),
            note: note
          });
        });

        canvas.addEventListener('mouseout', () => {
          setTooltipInfo(null);
        });

        // Start drawing
        drawSpectrogram();
        setStatus('Spectrogram generated');

      } catch (error) {
        console.error('Spectrogram generation error:', error);
        setStatus('Error processing audio');
      }
    };

    processSpectrogram();
  }, [file]);

  return (
    <div 
      ref={containerRef} 
      className="spectrogram-container w-full"
      style={{ 
        height: '228px', 
        overflow: 'hidden' 
      }}
    >
      <div className="spectrogram-info mb-2 text-sm">
        <p>{status}</p>
        {audioDetails.duration > 0 && (
          <div className="audio-details">
            <span>Duration: {audioDetails.duration.toFixed(2)}s | </span>
            <span>Sample Rate: {audioDetails.sampleRate} Hz | </span>
            <span>Channels: {audioDetails.channels}</span>
            {detectedNotes.length > 0 && (
              <div>
                Detected Notes: {detectedNotes.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
      
      <canvas 
        ref={canvasRef} 
        className="spectrogram-canvas w-full bg-black" 
        style={{ 
          cursor: 'crosshair',
          height: '100%',
          width: '100%'
        }}
      />

      {tooltipInfo && (
        <div 
          className="absolute p-2 bg-white/80 rounded shadow-lg text-xs"
          style={{
            left: tooltipInfo.x + 10,
            top: tooltipInfo.y + 10
          }}
        >
          <div>Frequency: {tooltipInfo.frequency} Hz</div>
          <div>Note: {tooltipInfo.note}</div>
        </div>
      )}
    </div>
  );
};

export default InteractiveSpectrogram;