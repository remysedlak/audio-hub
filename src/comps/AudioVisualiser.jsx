import React, { useRef, useEffect } from 'react';

const AudioVisualizer = () => {
  const canvasRef = useRef(null); // Reference to the canvas element
  const audioRef = useRef(null); // Reference to the file input element

  useEffect(() => {
    const handleFileChange = (event) => {
      const file = event.target.files[0]; // The selected audio file
      const reader = new FileReader(); // FileReader to read the audio file

      reader.onload = (event) => {
        const arrayBuffer = event.target.result; // ArrayBuffer containing the audio file data
        const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // AudioContext for audio processing

        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
          visualize(audioBuffer, audioContext); // Decoded audio buffer
        });
      };

      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    };

    const audioInput = audioRef.current; // Current file input element
    audioInput.addEventListener('change', handleFileChange); // Add event listener for file input change

    return () => {
      audioInput.removeEventListener('change', handleFileChange); // Cleanup event listener
    };
  }, []);

  const visualize = (audioBuffer, audioContext) => {
    const canvas = canvasRef.current; // Current canvas element
    canvas.width = canvas.clientWidth; // Set canvas width
    canvas.height = canvas.clientHeight; // Set canvas height

    const analyser = audioContext.createAnalyser(); // AnalyserNode for frequency data
    analyser.fftSize = 32; // FFT size for the analyser

    const frequencyBufferLength = analyser.frequencyBinCount; // Number of frequency data points
    const frequencyData = new Uint8Array(frequencyBufferLength); // Array to hold frequency data

    const source = audioContext.createBufferSource(); // AudioBufferSourceNode to play the audio
    source.buffer = audioBuffer; // Set the audio buffer
    source.connect(analyser); // Connect source to analyser
    analyser.connect(audioContext.destination); // Connect analyser to destination (speakers)
    source.start(); // Start playing the audio

    const canvasContext = canvas.getContext('2d'); // Canvas rendering context
    const barWidth = canvas.width / frequencyBufferLength; // Width of each frequency bar

    const draw = () => {
      requestAnimationFrame(draw); // Schedule the next frame
      canvasContext.fillStyle = 'rgb(173, 216, 230)'; // Background color
      canvasContext.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      analyser.getByteFrequencyData(frequencyData); // Get frequency data

      for (let i = 0; i < frequencyBufferLength; i++) {
        canvasContext.fillStyle = `rgb(${frequencyData[i]}, 118, 138)`; // Bar color based on frequency data
        canvasContext.fillRect(
          i * barWidth,
          canvas.height - frequencyData[i],
          barWidth - 1,
          frequencyData[i]
        ); // Draw each frequency bar
      }
    };

    draw(); // Start drawing
  };

  return (
    <div>
      <input type="file" id="audio" ref={audioRef} /> {/* File input element */}
      <canvas id="canvas" ref={canvasRef}></canvas> {/* Canvas element */}
    </div>
  );
};

export default AudioVisualizer;