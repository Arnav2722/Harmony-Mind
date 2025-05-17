import React from 'react';
import { Clock, Music, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface TherapySession {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  tracks: string[];
}

interface TherapyCardProps {
  session: TherapySession;
  isCompleted?: boolean;
}

const TherapyCard: React.FC<TherapyCardProps> = ({ session, isCompleted = false }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg">
      <div className="relative">
        <img 
          src={session.imageUrl} 
          alt={session.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <Clock size={12} className="mr-1 text-indigo-600" />
          {session.duration} min
        </div>
        {isCompleted && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium transform -rotate-12">
              Completed
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
            {session.category}
          </span>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{session.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{session.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{session.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Music size={16} className="text-indigo-600 mr-1" />
            <span className="text-xs text-gray-500">{session.tracks.length} tracks</span>
          </div>
          
          <Link 
            to={`/therapy-sessions/${session.id}`}
            className="flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-800"
          >
            {isCompleted ? 'Repeat' : 'Start session'}
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TherapyCard;