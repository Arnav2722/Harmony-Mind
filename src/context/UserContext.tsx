import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface MoodEntry {
  date: string;
  mood: string;
  notes: string;
  relatedTracks: string[];
}

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  sessionId?: string;
  mood?: string;
}

interface UserData {
  name: string;
  email: string;
  preferences: {
    favoriteGenres: string[];
    preferredDuration: number;
    notificationEnabled: boolean;
  };
  moodHistory: MoodEntry[];
  completedSessions: string[];
  journalEntries: JournalEntry[];
  savedTracks: string[];
}

interface UserContextType {
  userData: UserData | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserData['preferences']>) => void;
  addMoodEntry: (entry: MoodEntry) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  completeSession: (sessionId: string) => void;
  saveTrack: (trackId: string) => void;
  removeTrack: (trackId: string) => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  isLoggedIn: false,
  login: async () => false,
  logout: () => {},
  updatePreferences: () => {},
  addMoodEntry: () => {},
  addJournalEntry: () => {},
  completeSession: () => {},
  saveTrack: () => {},
  removeTrack: () => {},
});

export const useUser = () => useContext(UserContext);

// Mock user data
const mockUser: UserData = {
  name: 'Sam Johnson',
  email: 'sam@example.com',
  preferences: {
    favoriteGenres: ['meditation', 'nature sounds', 'ambient'],
    preferredDuration: 15,
    notificationEnabled: true,
  },
  moodHistory: [
    {
      date: '2025-05-01',
      mood: 'stressed',
      notes: 'Work deadline approaching',
      relatedTracks: ['5'],
    },
    {
      date: '2025-05-02',
      mood: 'calm',
      notes: 'After evening meditation session',
      relatedTracks: ['1'],
    },
  ],
  completedSessions: ['session-1', 'session-3'],
  journalEntries: [
    {
      id: 'journal-1',
      date: '2025-05-01',
      title: 'First Meditation Experience',
      content: 'I felt my mind clearing after the first 5 minutes. The ocean sounds really helped me visualize a peaceful place.',
      sessionId: 'session-1',
      mood: 'relaxed',
    },
  ],
  savedTracks: ['1', '3'],
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Auto-login for demo purposes
  useEffect(() => {
    // In a real app, we'd check for a valid auth token here
    setTimeout(() => {
      setUserData(mockUser);
      setIsLoggedIn(true);
    }, 1000);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - would be replaced with real authentication
    if (email && password) {
      setUserData(mockUser);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUserData(null);
    setIsLoggedIn(false);
  };

  const updatePreferences = (preferences: Partial<UserData['preferences']>) => {
    if (!userData) return;
    
    setUserData({
      ...userData,
      preferences: {
        ...userData.preferences,
        ...preferences,
      }
    });
  };

  const addMoodEntry = (entry: MoodEntry) => {
    if (!userData) return;
    
    setUserData({
      ...userData,
      moodHistory: [entry, ...userData.moodHistory],
    });
  };

  const addJournalEntry = (entry: JournalEntry) => {
    if (!userData) return;
    
    setUserData({
      ...userData,
      journalEntries: [entry, ...userData.journalEntries],
    });
  };

  const completeSession = (sessionId: string) => {
    if (!userData) return;
    
    if (!userData.completedSessions.includes(sessionId)) {
      setUserData({
        ...userData,
        completedSessions: [...userData.completedSessions, sessionId],
      });
    }
  };

  const saveTrack = (trackId: string) => {
    if (!userData) return;
    
    if (!userData.savedTracks.includes(trackId)) {
      setUserData({
        ...userData,
        savedTracks: [...userData.savedTracks, trackId],
      });
    }
  };

  const removeTrack = (trackId: string) => {
    if (!userData) return;
    
    setUserData({
      ...userData,
      savedTracks: userData.savedTracks.filter(id => id !== trackId),
    });
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoggedIn,
        login,
        logout,
        updatePreferences,
        addMoodEntry,
        addJournalEntry,
        completeSession,
        saveTrack,
        removeTrack,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};