import React, { useEffect } from 'react';

const AudioVisualizer = ({ audioContext, analyser }) => {
    useEffect(() => {
        if (audioContext && analyser) {
            const canvas = document.getElementById('audio-visualizer');
            const canvasCtx = canvas.getContext('2d');
            const frequencyBufferLength = analyser.frequencyBinCount;
            const frequencyData = new Uint8Array(frequencyBufferLength);
            const barWidth = (canvas.width / frequencyBufferLength);

            const minIndex = Math.floor(0 / (audioContext.sampleRate / 2) * frequencyBufferLength);
            const maxIndex = Math.floor(30000 / (audioContext.sampleRate / 2) * frequencyBufferLength);

            const draw = () => {
                requestAnimationFrame(draw);
                canvasCtx.fillStyle = "rgb(173, 216, 230)";
                canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                analyser.getByteFrequencyData(frequencyData);

                for (let i = minIndex; i < maxIndex; i++) {
                    canvasCtx.fillStyle = "rgb(" + (frequencyData[i]) + ",118, 138)";
                    canvasCtx.fillRect(
                        i * barWidth,
                        canvas.height - frequencyData[i],
                        barWidth - 1,
                        frequencyData[i]
                    );
                }
            };

            draw();
        }
    }, [audioContext, analyser]);

    return (
        <canvas 
        id="audio-visualizer" 
        height="50"
        className="rounded">
        </canvas>
    );
};

export default AudioVisualizer;