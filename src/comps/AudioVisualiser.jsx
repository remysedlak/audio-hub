import React, { useRef, useEffect } from 'react';

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
          visualize(audioBuffer, audioContext);
        });
      };

      reader.readAsArrayBuffer(file);
    };

    const audioInput = audioRef.current;
    audioInput.addEventListener('change', handleFileChange);

    return () => {
      audioInput.removeEventListener('change', handleFileChange);
    };
  }, []);

  const visualize = (audioBuffer, audioContext) => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const frequencyBufferLength = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(frequencyBufferLength);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    source.start();

    const canvasContext = canvas.getContext('2d');
    const barWidth = canvas.width / frequencyBufferLength;

    const draw = () => {
      requestAnimationFrame(draw);
      canvasContext.fillStyle = 'rgb(173, 216, 230)';
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      analyser.getByteFrequencyData(frequencyData);

      for (let i = 0; i < frequencyBufferLength; i++) {
        canvasContext.fillStyle = `rgb(${frequencyData[i]}, 118, 138)`;
        canvasContext.fillRect(
          i * barWidth,
          canvas.height - frequencyData[i],
          barWidth - 1,
          frequencyData[i]
        );
      }
    };

    draw();
  };

  return (
    <div>
      <input type="file" id="audio" ref={audioRef} />
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default AudioVisualizer;