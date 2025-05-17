import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import TherapySessionPage from './pages/TherapySessionPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { AudioProvider } from './context/AudioContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <AudioProvider>
          <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/therapy-sessions" element={<TherapySessionPage />} />
                <Route path="/mood-tracker" element={<MoodTrackerPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AudioProvider>
      </UserProvider>
    </Router>
  );
}

export default App;