# HarmonyMind - Music Therapy for Mental Wellbeing

## Overview

HarmonyMind is a comprehensive web application that combines music therapy with psychological principles to improve mental wellbeing. The application provides personalized music therapy experiences, mood tracking, and educational resources to help users manage stress, anxiety, improve focus, and achieve emotional balance.

## Features

### 1. Personalized Music Therapy Sessions

- Curated therapy sessions for specific needs (anxiety relief, focus, sleep, etc.)
- Audio player with visualizations
- Session categorization by purpose, duration, and difficulty

### 2. Mood Tracking

- Daily mood logging with notes
- Mood pattern analysis
- Personalized music recommendations based on mood

### 3. Educational Resources

- Articles about music psychology
- Research papers
- Therapeutic guides
- FAQs

### 4. User Profiles

- Track completed sessions
- Save favorite tracks
- Document progress over time
- Personalize preferences

### 5. Interactive Music Tools

- Audio visualizer that responds to music
- Breathing exercises synchronized with music
- Journaling feature to document emotional responses

## Technology Stack

- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Lucide icons

## Project Structure

```
/src
  /components
    /audio
      AudioPlayer.tsx
    /layout
      Header.tsx
      Footer.tsx
    /mood
      MoodTracker.tsx
    /therapy
      TherapyCard.tsx
    /ui
      Logo.tsx
      Tabs.tsx
    /visualizer
      AudioVisualizer.tsx
  /context
    AudioContext.tsx
    UserContext.tsx
  /pages
    HomePage.tsx
    MoodTrackerPage.tsx
    NotFoundPage.tsx
    ProfilePage.tsx
    ResourcesPage.tsx
    TherapySessionPage.tsx
  App.tsx
  main.tsx
  index.css
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/harmony-mind.git
cd harmony-mind
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```
npm run build
```

This will generate optimized files in the `dist` directory that can be deployed to a web server.

## Future Enhancements

- User authentication
- Custom playlist creation
- Integration with wearable devices for biometric feedback
- Mobile applications
- Community features and shared experiences
- Advanced analytics for therapeutic outcomes

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Images from Pexels
- Sample audio tracks from Pixabay
- Research on music therapy and psychology

---

Created with ❤️ for mental wellbeing through the power of music.