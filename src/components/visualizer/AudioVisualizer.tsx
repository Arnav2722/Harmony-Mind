import React, { useRef, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';

interface AudioVisualizerProps {
  size?: number;
  barCount?: number;
  color?: string;
  shadowColor?: string;
  type?: 'bars' | 'circular' | 'wave';
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  size = 300,
  barCount = 50,
  color = '#4F46E5',
  shadowColor = 'rgba(79, 70, 229, 0.3)',
  type = 'bars',
}) => {
  const { isPlaying, currentTrack } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Set up audio context and analyzer on mount
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!audioContextRef.current || !analyserRef.current) return;
    
    // Connect to the currently playing audio element
    const audioElement = document.querySelector('audio');
    if (!audioElement) return;
    
    // Disconnect previous source if it exists
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    
    sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);
    
    // Start visualization if a track is playing
    if (isPlaying && currentTrack) {
      startVisualization();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      clearCanvas();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentTrack]);
  
  useEffect(() => {
    if (isPlaying && currentTrack) {
      startVisualization();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      clearCanvas();
    }
  }, [isPlaying]);
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  const startVisualization = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    
    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const renderFrame = () => {
      animationRef.current = requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (type === 'bars') {
        renderBars(ctx, dataArray, bufferLength, canvas);
      } else if (type === 'circular') {
        renderCircular(ctx, dataArray, bufferLength, canvas);
      } else if (type === 'wave') {
        renderWave(ctx, dataArray, bufferLength, canvas);
      }
    };
    
    renderFrame();
  };
  
  const renderBars = (
    ctx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    bufferLength: number,
    canvas: HTMLCanvasElement
  ) => {
    const barWidth = (canvas.width / barCount) * 0.8;
    const barSpacing = (canvas.width / barCount) * 0.2;
    const totalBarWidth = barWidth + barSpacing;
    
    ctx.fillStyle = color;
    
    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor((i / barCount) * bufferLength);
      const barHeight = (dataArray[dataIndex] / 255) * canvas.height * 0.8;
      
      const x = i * totalBarWidth;
      const y = canvas.height - barHeight;
      
      // Draw shadow
      ctx.fillStyle = shadowColor;
      ctx.fillRect(x, canvas.height, barWidth, -barHeight * 0.5);
      
      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, barHeight);
    }
  };
  
  const renderCircular = (
    ctx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    bufferLength: number,
    canvas: HTMLCanvasElement
  ) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI);
    ctx.fillStyle = shadowColor;
    ctx.fill();
    
    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * 2 * Math.PI;
      const dataIndex = Math.floor((i / barCount) * bufferLength);
      const barHeight = (dataArray[dataIndex] / 255) * radius * 0.7;
      
      const startX = centerX + Math.cos(angle) * radius * 0.3;
      const startY = centerY + Math.sin(angle) * radius * 0.3;
      const endX = centerX + Math.cos(angle) * (radius * 0.3 + barHeight);
      const endY = centerY + Math.sin(angle) * (radius * 0.3 + barHeight);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.stroke();
      
      // Add dots at the end of lines
      ctx.beginPath();
      ctx.arc(endX, endY, 2, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  };
  
  const renderWave = (
    ctx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    bufferLength: number,
    canvas: HTMLCanvasElement
  ) => {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    
    for (let i = 0; i < barCount; i++) {
      const x = (i / barCount) * canvas.width;
      const dataIndex = Math.floor((i / barCount) * bufferLength);
      const normalizedValue = dataArray[dataIndex] / 255;
      const y = canvas.height / 2 + (normalizedValue - 0.5) * canvas.height * 0.7;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    // Complete the wave
    ctx.lineTo(canvas.width, canvas.height / 2);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, shadowColor);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Fill under the wave
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  return (
    <canvas 
      ref={canvasRef} 
      width={size} 
      height={size} 
      className="w-full h-full"
    />
  );
};

export default AudioVisualizer;