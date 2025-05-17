import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Music, Brain, BarChart2, BookOpen, Play } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useUser } from '../context/UserContext';
import AudioPlayer from '../components/audio/AudioPlayer';
import AudioVisualizer from '../components/visualizer/AudioVisualizer';
import TherapyCard, { TherapySession } from '../components/therapy/TherapyCard';

const featuredSessions: TherapySession[] = [
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
];

const HomePage: React.FC = () => {
  const { currentTrack, isPlaying, playlist, playTrack } = useAudio();
  const { userData } = useUser();
  
  useEffect(() => {
    // Update document title
    document.title = 'HarmonyMind - Music Therapy for Mental Wellbeing';
  }, []);
  
  // Determine completed sessions
  const completedSessionIds = userData?.completedSessions || [];
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4940905/pexels-photo-4940905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Transform Your Mental Wellbeing Through the Power of Music
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl">
              Experience scientifically designed music therapy sessions that reduce stress, improve focus, and enhance your emotional balance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/therapy-sessions"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-medium transition-colors text-white flex items-center"
              >
                <Play size={20} className="mr-2" />
                Start Your Journey
              </Link>
              <Link
                to="/resources"
                className="px-6 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-lg font-medium transition-colors border border-white/30"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Music with Visualizer */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/2 md:order-2">
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden aspect-square max-w-md mx-auto">
                {currentTrack ? (
                  <>
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-100 to-purple-100"></div>
                    <div className="absolute inset-0 z-10 p-8">
                      <AudioVisualizer 
                        type={isPlaying ? 'circular' : 'bars'} 
                        color="#4F46E5"
                        shadowColor="rgba(79, 70, 229, 0.2)"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent z-20">
                      <h3 className="font-semibold text-xl text-gray-900 mb-1">
                        {currentTrack.title}
                      </h3>
                      <p className="text-gray-600">{currentTrack.artist}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <Music size={48} className="text-indigo-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Discover Therapeutic Music
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Select a track to start your musical journey to wellbeing
                    </p>
                    <button
                      onClick={() => playlist.length > 0 && playTrack(playlist[0])}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <Play size={18} className="mr-2" />
                      Play a Sample
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Experience the Healing Power of Sound
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our curated music therapy sessions are designed by psychologists and music therapists to target specific mental states and emotional needs.
              </p>
              
              <div className="space-y-4 mb-8">
                <FeatureItem 
                  icon={<Brain size={24} className="text-indigo-600" />}
                  title="Neuroscience-Backed"
                  description="Created using principles of neuroacoustics and sound therapy research"
                />
                <FeatureItem 
                  icon={<Music size={24} className="text-indigo-600" />}
                  title="Personalized Experience"
                  description="Tracks adapted to your mood, preferences, and therapeutic needs"
                />
                <FeatureItem 
                  icon={<BarChart2 size={24} className="text-indigo-600" />}
                  title="Track Your Progress"
                  description="Monitor your emotional responses and track improvements over time"
                />
              </div>
              
              <Link
                to="/therapy-sessions"
                className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors"
              >
                Browse all therapeutic sessions
                <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Sessions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Sessions</h2>
            <Link
              to="/therapy-sessions"
              className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors"
            >
              View all
              <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSessions.map(session => (
              <TherapyCard
                key={session.id}
                session={session}
                isCompleted={completedSessionIds.includes(session.id)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Music Therapy Works</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our approach combines evidence-based psychology with the natural therapeutic properties of music.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ProcessStep 
              number={1}
              title="Assess Your Needs"
              description="Tell us how you're feeling and what you want to achieve with music therapy."
            />
            <ProcessStep 
              number={2}
              title="Personalized Sessions"
              description="Receive curated music therapy experiences designed for your specific goals."
            />
            <ProcessStep 
              number={3}
              title="Track Improvement"
              description="Document your journey and watch as music transforms your mental wellbeing."
            />
          </div>
        </div>
      </section>
      
      {/* Resources Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Educational Resources</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard 
              title="The Science of Music and the Brain"
              imageUrl="https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              category="Research"
            />
            <ResourceCard 
              title="Using Music to Manage Anxiety"
              imageUrl="https://images.pexels.com/photos/5794559/pexels-photo-5794559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              category="Guide"
            />
            <ResourceCard 
              title="Music as a Tool for Better Sleep"
              imageUrl="https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              category="Sleep Health"
            />
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/resources"
              className="inline-flex items-center px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors text-gray-800"
            >
              <BookOpen size={20} className="mr-2" />
              Explore All Resources
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-teal-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-teal-100 max-w-2xl mx-auto">
              Discover how HarmonyMind has transformed mental wellbeing for people just like you.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <TestimonialCard 
              quote="The anxiety relief sessions have been a game-changer for me. I use them before important meetings and feel so much more centered."
              name="Jamie K."
              role="Marketing Professional"
            />
            <TestimonialCard 
              quote="As someone with ADHD, the focus tracks help me concentrate without medication for longer periods than I ever thought possible."
              name="Alex T."
              role="Software Developer"
            />
            <TestimonialCard 
              quote="I've struggled with insomnia for years. The sleep journey sessions have helped me develop a healthy bedtime routine at last."
              name="Morgan L."
              role="Healthcare Worker"
            />
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Mental Wellbeing?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Start your journey to better mental health through the healing power of music therapy.
          </p>
          <Link
            to="/therapy-sessions"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            <Music size={20} className="mr-2" />
            Begin Your First Session
          </Link>
        </div>
      </section>
      
      {/* Audio Player */}
      {currentTrack && <AudioPlayer />}
    </div>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="mt-1 mr-4 p-2 bg-indigo-100 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  imageUrl: string;
  category: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, imageUrl, category }) => {
  return (
    <Link to="/resources" className="group">
      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
        <div className="h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium mb-2">
            {category}
          </span>
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
      <svg className="h-8 w-8 text-teal-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-white mb-6">{quote}</p>
      <div>
        <p className="font-medium text-teal-300">{name}</p>
        <p className="text-sm text-teal-200/70">{role}</p>
      </div>
    </div>
  );
};

export default HomePage;