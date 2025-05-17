import React, { useState, useEffect } from 'react';
import { Music, Search, Filter } from 'lucide-react';
import { useUser } from '../context/UserContext';
import TherapyCard, { TherapySession } from '../components/therapy/TherapyCard';
import AudioPlayer from '../components/audio/AudioPlayer';
import { useAudio } from '../context/AudioContext';

// Sample therapy sessions data
const therapySessions: TherapySession[] = [
  {
    id: 'session-1',
    title: 'Anxiety Relief Meditation',
    description: 'A guided session using binaural beats and soothing melodies to reduce anxiety and promote calmness.',
    imageUrl: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 15,
    category: 'Anxiety Relief',
    difficulty: 'beginner',
    rating: 4.8,
    tracks: ['5', '1'],
  },
  {
    id: 'session-2',
    title: 'Deep Focus Flow',
    description: 'Enhance concentration and productivity with this carefully crafted sound experience for deep work.',
    imageUrl: 'https://images.pexels.com/photos/7599547/pexels-photo-7599547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 30,
    category: 'Focus',
    difficulty: 'intermediate',
    rating: 4.7,
    tracks: ['3'],
  },
  {
    id: 'session-3',
    title: 'Restful Sleep Journey',
    description: 'Prepare your mind and body for deep, restorative sleep with this gentle soundscape experience.',
    imageUrl: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 45,
    category: 'Sleep',
    difficulty: 'beginner',
    rating: 4.9,
    tracks: ['2'],
  },
  {
    id: 'session-4',
    title: 'Morning Energy Boost',
    description: 'Start your day with this uplifting audio session designed to energize and motivate.',
    imageUrl: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 10,
    category: 'Energy',
    difficulty: 'beginner',
    rating: 4.6,
    tracks: ['4'],
  },
  {
    id: 'session-5',
    title: 'Stress Relief & Relaxation',
    description: 'Unwind and release tension with this calming sonic experience for stress reduction.',
    imageUrl: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 20,
    category: 'Stress Relief',
    difficulty: 'beginner',
    rating: 4.8,
    tracks: ['1', '5'],
  },
  {
    id: 'session-6',
    title: 'Emotional Balance',
    description: 'Restore emotional equilibrium through harmonizing sounds and guided breathwork.',
    imageUrl: 'https://images.pexels.com/photos/5699466/pexels-photo-5699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 25,
    category: 'Emotional Wellbeing',
    difficulty: 'intermediate',
    rating: 4.7,
    tracks: ['1', '3', '5'],
  },
  {
    id: 'session-7',
    title: 'Creativity Enhancement',
    description: 'Stimulate your creative thinking with this specially designed audio journey.',
    imageUrl: 'https://images.pexels.com/photos/6192607/pexels-photo-6192607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 20,
    category: 'Creativity',
    difficulty: 'intermediate',
    rating: 4.6,
    tracks: ['3', '4'],
  },
  {
    id: 'session-8',
    title: 'Deep Meditation Practice',
    description: 'Experience profound meditative states with this advanced meditation soundscape.',
    imageUrl: 'https://images.pexels.com/photos/6698513/pexels-photo-6698513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 40,
    category: 'Meditation',
    difficulty: 'advanced',
    rating: 4.9,
    tracks: ['1', '2', '5'],
  },
];

// All available categories
const allCategories = Array.from(new Set(therapySessions.map(session => session.category)));
// All difficulty levels
const difficultyLevels = ['beginner', 'intermediate', 'advanced'];
// Duration ranges
const durationRanges = [
  { label: 'Short (< 15 min)', min: 0, max: 15 },
  { label: 'Medium (15-30 min)', min: 15, max: 30 },
  { label: 'Long (> 30 min)', min: 30, max: 999 },
];

const TherapySessionPage: React.FC = () => {
  const { userData } = useUser();
  const { currentTrack } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Update document title
    document.title = 'Therapy Sessions | HarmonyMind';
  }, []);
  
  // Filter sessions based on search and filters
  const filteredSessions = therapySessions.filter(session => {
    // Search query filter
    const matchesSearch = 
      searchQuery === '' || 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(session.category);
    
    // Difficulty filter
    const matchesDifficulty = 
      selectedDifficulties.length === 0 || 
      selectedDifficulties.includes(session.difficulty);
    
    // Duration filter
    const matchesDuration = selectedDurations.length === 0 || 
      durationRanges
        .filter((_, index) => selectedDurations.includes(index))
        .some(range => session.duration >= range.min && session.duration <= range.max);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
  });
  
  // Determine completed sessions
  const completedSessionIds = userData?.completedSessions || [];
  
  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const toggleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty) 
        : [...prev, difficulty]
    );
  };
  
  const toggleDurationFilter = (index: number) => {
    setSelectedDurations(prev => 
      prev.includes(index) 
        ? prev.filter(d => d !== index) 
        : [...prev, index]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedDurations([]);
  };
  
  return (
    <div className="pt-20 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Therapy Sessions</h1>
          <p className="text-gray-700">
            Discover music therapy sessions designed for your mental wellbeing needs.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, description or category..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
              <span className="bg-indigo-800 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                {selectedCategories.length + selectedDifficulties.length + selectedDurations.length}
              </span>
            </button>
          </div>
          
          {showFilters && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Filter Sessions</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Clear all filters
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
                  <div className="space-y-2">
                    {allCategories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategoryFilter(category)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Difficulty */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Difficulty</h4>
                  <div className="space-y-2">
                    {difficultyLevels.map(difficulty => (
                      <label key={difficulty} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedDifficulties.includes(difficulty)}
                          onChange={() => toggleDifficultyFilter(difficulty)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                        />
                        <span className="capitalize">{difficulty}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Duration */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Duration</h4>
                  <div className="space-y-2">
                    {durationRanges.map((range, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedDurations.includes(index)}
                          onChange={() => toggleDurationFilter(index)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Session Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredSessions.length} {filteredSessions.length === 1 ? 'Session' : 'Sessions'}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Recommended</option>
                <option>Newest</option>
                <option>Duration: Low to High</option>
                <option>Duration: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
          
          {filteredSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map(session => (
                <TherapyCard
                  key={session.id}
                  session={session}
                  isCompleted={completedSessionIds.includes(session.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Music size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No sessions found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Audio Player */}
      {currentTrack && <AudioPlayer />}
    </div>
  );
};

export default TherapySessionPage;