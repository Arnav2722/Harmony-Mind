import React from 'react';
import { useAudio } from '../context/AudioContext';
import AudioPlayer from '../components/audio/AudioPlayer';
import MoodTracker from '../components/mood/MoodTracker';

const MoodTrackerPage: React.FC = () => {
  const { currentTrack } = useAudio();
  
  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mood Tracker</h1>
          <p className="text-gray-700 mb-8">
            Track your emotional patterns and discover how music affects your wellbeing.
          </p>
          
          <MoodTracker />
        </div>
      </div>
      
      {/* Audio Player */}
      {currentTrack && <AudioPlayer />}
    </div>
  );
};

export default MoodTrackerPage;