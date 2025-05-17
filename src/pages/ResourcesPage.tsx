import React, { useState, useEffect } from 'react';
import { Book, File, Newspaper, Play, ExternalLink } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import AudioPlayer from '../components/audio/AudioPlayer';

// Resource types
type ResourceType = 'article' | 'research' | 'guide' | 'faq';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  imageUrl: string;
  tags: string[];
  date: string;
  readTime?: number;
  url?: string;
}

const resources: Resource[] = [
  {
    id: 'res-1',
    title: 'The Neuroscience of Music and Emotional Response',
    description: 'Explore how music triggers emotional responses in the brain and affects our psychological state.',
    type: 'research',
    imageUrl: 'https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['neuroscience', 'emotions', 'research'],
    date: '2025-03-15',
    readTime: 12,
  },
  {
    id: 'res-2',
    title: 'Using Music to Manage Anxiety: A Comprehensive Guide',
    description: 'Learn evidence-based techniques for using music to reduce anxiety and stress in daily life.',
    type: 'guide',
    imageUrl: 'https://images.pexels.com/photos/5794559/pexels-photo-5794559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['anxiety', 'self-help', 'techniques'],
    date: '2025-04-02',
    readTime: 8,
  },
  {
    id: 'res-3',
    title: 'Music Therapy for Improved Sleep Quality',
    description: 'Discover how specific types of music can improve sleep onset, quality, and duration.',
    type: 'article',
    imageUrl: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['sleep', 'insomnia', 'health'],
    date: '2025-02-20',
    readTime: 6,
  },
  {
    id: 'res-4',
    title: 'Frequently Asked Questions About Music Therapy',
    description: 'Answers to common questions about music therapy, its benefits, and how to get started.',
    type: 'faq',
    imageUrl: 'https://images.pexels.com/photos/7147720/pexels-photo-7147720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['FAQ', 'beginners', 'basics'],
    date: '2025-01-10',
    readTime: 5,
  },
  {
    id: 'res-5',
    title: 'Music and Cognitive Enhancement: Latest Research',
    description: 'Recent studies on how music can improve cognitive function, memory, and focus.',
    type: 'research',
    imageUrl: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['cognitive', 'research', 'focus'],
    date: '2025-04-18',
    readTime: 14,
  },
  {
    id: 'res-6',
    title: 'Creating Your Own Therapeutic Playlist',
    description: 'Step-by-step guide to creating personalized playlists for specific emotional needs.',
    type: 'guide',
    imageUrl: 'https://images.pexels.com/photos/6320148/pexels-photo-6320148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['playlist', 'self-help', 'DIY'],
    date: '2025-03-05',
    readTime: 7,
  },
  {
    id: 'res-7',
    title: 'Music Therapy for Children with Special Needs',
    description: 'How music therapy can benefit children with autism, ADHD, and other developmental conditions.',
    type: 'article',
    imageUrl: 'https://images.pexels.com/photos/7640034/pexels-photo-7640034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['children', 'special needs', 'development'],
    date: '2025-02-28',
    readTime: 9,
  },
  {
    id: 'res-8',
    title: 'The History and Evolution of Music Therapy',
    description: 'Tracing the origins and development of music therapy from ancient civilizations to modern practice.',
    type: 'article',
    imageUrl: 'https://images.pexels.com/photos/4709822/pexels-photo-4709822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['history', 'development', 'education'],
    date: '2025-01-25',
    readTime: 11,
  },
];

// All unique tags
const allTags = Array.from(new Set(resources.flatMap(resource => resource.tags)));

const ResourcesPage: React.FC = () => {
  const { currentTrack } = useAudio();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Update document title
    document.title = 'Resources | HarmonyMind';
  }, []);
  
  // Filter resources based on type, tags, and search query
  const filteredResources = resources.filter(resource => {
    const matchesType = !selectedType || resource.type === selectedType;
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => resource.tags.includes(tag));
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesTags && matchesSearch;
  });
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const clearFilters = () => {
    setSelectedType(null);
    setSelectedTags([]);
    setSearchQuery('');
  };
  
  // Get the icon for each resource type
  const getResourceTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'article':
        return <Newspaper size={18} />;
      case 'research':
        return <Book size={18} />;
      case 'guide':
        return <File size={18} />;
      case 'faq':
        return <File size={18} />;
      default:
        return <File size={18} />;
    }
  };
  
  return (
    <div className="pt-20 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Educational Resources</h1>
          <p className="text-gray-700">
            Expand your knowledge about music therapy and its applications for mental wellbeing.
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <h3 className="font-semibold text-gray-800 mb-3">Resource Type</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    !selectedType 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setSelectedType('article')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    selectedType === 'article' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Newspaper size={18} className="mr-2" />
                  Articles
                </button>
                <button
                  onClick={() => setSelectedType('research')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    selectedType === 'research' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Book size={18} className="mr-2" />
                  Research
                </button>
                <button
                  onClick={() => setSelectedType('guide')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    selectedType === 'guide' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <File size={18} className="mr-2" />
                  Guides
                </button>
                <button
                  onClick={() => setSelectedType('faq')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    selectedType === 'faq' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <File size={18} className="mr-2" />
                  FAQs
                </button>
              </div>
            </div>
            
            <div className="md:w-2/4">
              <h3 className="font-semibold text-gray-800 mb-3">Search Resources</h3>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:w-1/4">
              <h3 className="font-semibold text-gray-800 mb-3">Active Filters</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="ml-2 font-medium">
                    {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : 'All'}
                  </span>
                </div>
                
                {selectedTags.length > 0 && (
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">Tags:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={clearFilters}
                  className="w-full mt-3 px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resource Results */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredResources.length} {filteredResources.length === 1 ? 'Resource' : 'Resources'}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Most Recent</option>
                <option>Oldest First</option>
                <option>A-Z</option>
                <option>Z-A</option>
                <option>Reading Time</option>
              </select>
            </div>
          </div>
          
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <div key={resource.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium flex items-center">
                      {getResourceTypeIcon(resource.type)}
                      <span className="ml-2 capitalize">{resource.type}</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {new Date(resource.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                        {resource.readTime && (
                          <span className="ml-2">· {resource.readTime} min read</span>
                        )}
                      </div>
                      
                      <button className="text-indigo-600 flex items-center text-sm font-medium hover:text-indigo-800">
                        Read more
                        <ExternalLink size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Book size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No resources found</h3>
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

export default ResourcesPage;