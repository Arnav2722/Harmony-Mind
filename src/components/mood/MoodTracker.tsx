import React, { useState } from 'react';
import { Calendar, PieChart, ArrowRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const moodEmojis: Record<string, string> = {
  'happy': '😊',
  'calm': '😌',
  'energetic': '⚡',
  'anxious': '😰',
  'sad': '😢',
  'stressed': '😫',
  'focused': '🧠',
  'tired': '😴',
  'motivated': '💪',
  'peaceful': '🕊️',
};

const moodColors: Record<string, string> = {
  'happy': 'bg-yellow-400',
  'calm': 'bg-blue-400',
  'energetic': 'bg-orange-400',
  'anxious': 'bg-purple-400',
  'sad': 'bg-indigo-400',
  'stressed': 'bg-red-400',
  'focused': 'bg-green-400',
  'tired': 'bg-gray-400',
  'motivated': 'bg-pink-400',
  'peaceful': 'bg-teal-400',
};

const MoodTracker: React.FC = () => {
  const { userData, addMoodEntry } = useUser();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    
    // Create new mood entry
    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      date: today,
      mood: selectedMood,
      notes: notes,
      relatedTracks: [],
    };
    
    // Simulate a slight delay for UI feedback
    setTimeout(() => {
      addMoodEntry(newEntry);
      setSuccessMessage('Your mood has been recorded!');
      setIsSubmitting(false);
      
      // Reset form
      setTimeout(() => {
        setSelectedMood(null);
        setNotes('');
        setSuccessMessage('');
      }, 2000);
    }, 800);
  };

  const renderMoodStatistics = () => {
    if (!userData?.moodHistory.length) return null;
    
    const moodCounts: Record<string, number> = {};
    userData.moodHistory.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    
    const totalEntries = userData.moodHistory.length;
    
    return (
      <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <PieChart size={20} className="mr-2 text-indigo-600" />
          Your Mood Patterns
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(moodCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([mood, count]) => (
              <div key={mood} className="bg-gray-50 rounded-lg p-3 flex items-center">
                <div className={`w-3 h-3 rounded-full ${moodColors[mood] || 'bg-gray-400'} mr-2`}></div>
                <div>
                  <div className="flex items-center">
                    <span className="mr-2">{moodEmojis[mood] || '😐'}</span>
                    <span className="font-medium capitalize">{mood}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.round((count / totalEntries) * 100)}% of entries
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-2">Recent History</h4>
          <div className="space-y-2">
            {userData.moodHistory.slice(0, 3).map((entry, index) => (
              <div key={index} className="flex items-center text-sm">
                <span className="w-20 text-gray-500">{entry.date}</span>
                <span className="mr-2">{moodEmojis[entry.mood] || '😐'}</span>
                <span className="capitalize">{entry.mood}</span>
                {entry.notes && (
                  <span className="ml-3 text-gray-500 truncate">{entry.notes}</span>
                )}
              </div>
            ))}
          </div>
          
          <button className="mt-4 text-indigo-600 flex items-center text-sm font-medium hover:text-indigo-800">
            View complete history
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar size={20} className="mr-2 text-indigo-600" />
          How are you feeling today?
        </h3>
        
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
          {Object.entries(moodEmojis).map(([mood, emoji]) => (
            <button
              key={mood}
              type="button"
              onClick={() => handleMoodSelect(mood)}
              className={`py-3 px-2 rounded-lg flex flex-col items-center transition-all ${
                selectedMood === mood 
                  ? 'bg-indigo-100 border-2 border-indigo-400 shadow-sm' 
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <span className="text-2xl mb-1">{emoji}</span>
              <span className="text-xs font-medium capitalize">{mood}</span>
            </button>
          ))}
        </div>
        
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's contributing to your mood today?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={!selectedMood || isSubmitting}
            className={`px-5 py-2 rounded-md font-medium ${
              !selectedMood || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            } transition-colors`}
          >
            {isSubmitting ? 'Saving...' : 'Save Mood'}
          </button>
          
          {successMessage && (
            <div className="text-green-600 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          )}
        </div>
      </form>
      
      {renderMoodStatistics()}
    </div>
  );
};

export default MoodTracker;