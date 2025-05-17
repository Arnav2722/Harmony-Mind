import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Heart } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useUser } from '../../context/UserContext';

const AudioPlayer: React.FC = () => {
  const { 
    isPlaying, 
    currentTrack, 
    volume, 
    togglePlay, 
    nextTrack, 
    previousTrack, 
    setVolume 
  } = useAudio();
  
  const { userData, saveTrack, removeTrack } = useUser();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const isSaved = currentTrack && userData?.savedTracks.includes(currentTrack.id);

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (!audio) return;

    const updateProgress = () => {
      const duration = audio.duration || 1;
      const currentProgress = (audio.currentTime / duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [currentTrack]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !currentTrack) return;
    
    const audio = document.querySelector('audio');
    if (!audio) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const duration = audio.duration || 1;
    
    audio.currentTime = percent * duration;
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleSaveTrack = () => {
    if (!currentTrack) return;
    
    if (isSaved) {
      removeTrack(currentTrack.id);
    } else {
      saveTrack(currentTrack.id);
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-4 py-3 z-40">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center mb-3 md:mb-0 w-full md:w-1/3">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title}
            className="w-12 h-12 object-cover rounded-md mr-3"
          />
          <div className="mr-4">
            <h4 className="font-medium text-gray-900 line-clamp-1">{currentTrack.title}</h4>
            <p className="text-sm text-gray-600">{currentTrack.artist}</p>
          </div>
          <button 
            onClick={toggleSaveTrack}
            className={`ml-auto md:ml-0 p-2 rounded-full ${
              isSaved 
                ? 'text-red-500 hover:bg-red-50' 
                : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            <Heart className={isSaved ? 'fill-current' : ''} size={18} />
          </button>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="flex items-center space-x-4 mb-2">
            <button 
              onClick={previousTrack}
              className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            >
              <SkipBack size={20} />
            </button>
            
            <button 
              onClick={togglePlay}
              className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>
            
            <button 
              onClick={nextTrack}
              className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-10 text-right">{formatTime(currentTime)}</span>
            <div 
              ref={progressRef}
              className="flex-grow h-1.5 bg-gray-200 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-indigo-600 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -right-1.5 -top-1 w-4 h-4 bg-indigo-600 rounded-full shadow-md"></div>
              </div>
            </div>
            <span className="text-xs text-gray-500 w-10">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>
        
        {/* Volume */}
        <div className="flex items-center justify-end w-full md:w-1/3 mt-3 md:mt-0">
          <button 
            onClick={toggleMute}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100"
          >
            {volume > 0.5 ? (
              <Volume2 size={20} />
            ) : volume > 0 ? (
              <Volume1 size={20} />
            ) : (
              <VolumeX size={20} />
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 md:w-32 ml-2 accent-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;