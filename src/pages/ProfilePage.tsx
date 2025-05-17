import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Settings, Music as MusicNote, BookOpen, BarChart2, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import AudioPlayer from '../components/audio/AudioPlayer';
import TherapyCard, { TherapySession } from '../components/therapy/TherapyCard';

// Sample therapy sessions
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
];

const ProfilePage: React.FC = () => {
  const { userData, updatePreferences } = useUser();
  const { currentTrack, playlist, playTrack } = useAudio();
  const [activeTab, setActiveTab] = useState('profile');
  
  if (!userData) {
    return (
      <div className="pt-28 pb-24 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Get completed sessions
  const completedSessionIds = userData.completedSessions || [];
  const completedSessions = therapySessions.filter(session => 
    completedSessionIds.includes(session.id)
  );
  
  // Get saved tracks
  const savedTrackIds = userData.savedTracks || [];
  const savedTracks = playlist.filter(track => 
    savedTrackIds.includes(track.id)
  );
  
  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mr-4">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p className="text-indigo-200">{userData.email}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-md flex items-center hover:bg-white/30 transition-colors">
                    <Settings size={18} className="mr-2" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-6 border-b">
                <TabsList className="flex">
                  <TabsTrigger value="profile" className="px-4 py-3 flex items-center">
                    <User size={18} className="mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="sessions" className="px-4 py-3 flex items-center">
                    <MusicNote size={18} className="mr-2" />
                    Completed Sessions
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="px-4 py-3 flex items-center">
                    <BookOpen size={18} className="mr-2" />
                    Saved Tracks
                  </TabsTrigger>
                  <TabsTrigger value="progress" className="px-4 py-3 flex items-center">
                    <BarChart2 size={18} className="mr-2" />
                    Progress
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="profile" className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Personal Details</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={userData.name}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          value={userData.email}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Preferences</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Favorite Music Genres</label>
                        <div className="flex flex-wrap gap-2">
                          {userData.preferences.favoriteGenres.map(genre => (
                            <span key={genre} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                              {genre}
                            </span>
                          ))}
                          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300">
                            + Add
                          </button>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                          Preferred Session Duration (minutes)
                        </label>
                        <input 
                          type="range"
                          min="5"
                          max="60"
                          step="5"
                          value={userData.preferences.preferredDuration}
                          onChange={(e) => updatePreferences({ 
                            preferredDuration: parseInt(e.target.value) 
                          })}
                          className="w-full accent-indigo-600"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>5 min</span>
                          <span>{userData.preferences.preferredDuration} min</span>
                          <span>60 min</span>
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input 
                            type="checkbox"
                            checked={userData.preferences.notificationEnabled}
                            onChange={(e) => updatePreferences({ 
                              notificationEnabled: e.target.checked 
                            })}
                            className="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                          />
                          <span>Enable session reminders</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sessions" className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Sessions</h2>
                
                {completedSessions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedSessions.map(session => (
                      <TherapyCard
                        key={session.id}
                        session={session}
                        isCompleted={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MusicNote size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No completed sessions yet</h3>
                    <p className="text-gray-600 mb-6">
                      Start your first therapy session to track your progress
                    </p>
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      Explore Sessions
                    </button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved" className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Tracks</h2>
                
                {savedTracks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedTracks.map(track => (
                      <div 
                        key={track.id} 
                        className="flex bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <img 
                          src={track.coverUrl} 
                          alt={track.title}
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex-grow p-3 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{track.title}</h3>
                            <p className="text-sm text-gray-600">{track.artist}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                            </span>
                            <button 
                              onClick={() => playTrack(track)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                            >
                              <Play size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MusicNote size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No saved tracks yet</h3>
                    <p className="text-gray-600 mb-6">
                      Save your favorite tracks for quick access
                    </p>
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      Explore Tracks
                    </button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="progress" className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-5 text-white">
                    <h3 className="text-lg font-medium mb-1">Sessions Completed</h3>
                    <p className="text-3xl font-bold">{userData.completedSessions.length}</p>
                    <div className="mt-2 text-indigo-100 text-sm">
                      Great progress! Keep it up.
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-5 text-white">
                    <h3 className="text-lg font-medium mb-1">Mood Entries</h3>
                    <p className="text-3xl font-bold">{userData.moodHistory.length}</p>
                    <div className="mt-2 text-teal-100 text-sm">
                      Regular tracking helps understand patterns.
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-5 text-white">
                    <h3 className="text-lg font-medium mb-1">Journal Entries</h3>
                    <p className="text-3xl font-bold">{userData.journalEntries.length}</p>
                    <div className="mt-2 text-purple-100 text-sm">
                      Reflection is key to mental growth.
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-5 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood History</h3>
                  
                  {userData.moodHistory.length > 0 ? (
                    <div className="space-y-4">
                      {userData.moodHistory.map((entry, index) => (
                        <div key={index} className="flex items-start border-b border-gray-100 pb-3">
                          <div className="w-20 text-sm text-gray-500">{entry.date}</div>
                          <div className="flex-grow">
                            <div className="font-medium text-gray-900 capitalize">{entry.mood}</div>
                            {entry.notes && <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">No mood entries yet. Start tracking your mood!</p>
                  )}
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Journal Entries</h3>
                  
                  {userData.journalEntries.length > 0 ? (
                    <div className="space-y-4">
                      {userData.journalEntries.map(entry => (
                        <div key={entry.id} className="border-b border-gray-100 pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{entry.title}</h4>
                            <span className="text-xs text-gray-500">{entry.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{entry.content}</p>
                          {entry.mood && (
                            <div className="mt-2">
                              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full capitalize">
                                {entry.mood}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">No journal entries yet. Start journaling your experiences!</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Audio Player */}
      {currentTrack && <AudioPlayer />}
    </div>
  );
};

export default ProfilePage;