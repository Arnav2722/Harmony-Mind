import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  volume: number;
  playlist: Track[];
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  category: string;
  mood: string[];
}

const defaultContext: AudioContextType = {
  isPlaying: false,
  currentTrack: null,
  volume: 0.8,
  playlist: [],
  playTrack: () => {},
  pauseTrack: () => {},
  nextTrack: () => {},
  previousTrack: () => {},
  setVolume: () => {},
  togglePlay: () => {},
};

const AudioContext = createContext<AudioContextType>(defaultContext);

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(0.8);
  const [playlist, setPlaylist] = useState<Track[]>([]);

  useEffect(() => {
    // Initialize with sample playlist
    setPlaylist(sampleTracks);
  }, []);

  useEffect(() => {
    audio.volume = volume;
  }, [audio, volume]);

  useEffect(() => {
    if (currentTrack) {
      audio.src = currentTrack.audioUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch(error => console.error("Audio playback error:", error));
      }
    }
    
    return () => {
      audio.pause();
    };
  }, [audio, currentTrack, isPlaying]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else if (currentTrack) {
      audio.play().catch(error => console.error("Audio playback error:", error));
      setIsPlaying(true);
    } else if (playlist.length > 0) {
      playTrack(playlist[0]);
    }
  };

  const nextTrack = () => {
    if (!currentTrack || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  };

  const previousTrack = () => {
    if (!currentTrack || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIndex]);
  };

  return (
    <AudioContext.Provider value={{
      isPlaying,
      currentTrack,
      volume,
      playlist,
      playTrack,
      pauseTrack,
      nextTrack,
      previousTrack,
      setVolume,
      togglePlay,
    }}>
      {children}
    </AudioContext.Provider>
  );
};

// Sample tracks data
const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Deep Ocean Calm',
    artist: 'Harmonic Mind',
    duration: 380,
    coverUrl: 'https://images.pexels.com/photos/355288/pexels-photo-355288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    category: 'meditation',
    mood: ['calm', 'relaxed'],
  },
  {
    id: '2',
    title: 'Theta Waves',
    artist: 'Dream Therapists',
    duration: 425,
    coverUrl: 'https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3',
    category: 'sleep',
    mood: ['sleepy', 'peaceful'],
  },
  {
    id: '3',
    title: 'Focus Flow',
    artist: 'Cognitive Beats',
    duration: 290,
    coverUrl: 'https://images.pexels.com/photos/4064432/pexels-photo-4064432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    category: 'focus',
    mood: ['concentrated', 'motivated'],
  },
  {
    id: '4',
    title: 'Morning Uplift',
    artist: 'Positive Psychology',
    duration: 315,
    coverUrl: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-spirit-of-the-morning-449.mp3',
    category: 'mood elevation',
    mood: ['happy', 'energetic'],
  },
  {
    id: '5',
    title: 'Anxiety Release',
    artist: 'Therapeutic Sounds',
    duration: 360,
    coverUrl: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    category: 'anxiety relief',
    mood: ['calm', 'relieved'],
  },
];