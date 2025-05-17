import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, userData, logout } = useUser();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-bold text-indigo-900">HarmonyMind</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/therapy-sessions" label="Therapy Sessions" currentPath={location.pathname} />
          <NavLink to="/mood-tracker" label="Mood Tracker" currentPath={location.pathname} />
          <NavLink to="/resources" label="Resources" currentPath={location.pathname} />
          
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
                <User size={20} />
                <span className="font-medium">{userData?.name?.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50">Profile</Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Sign In
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 py-3 space-y-3">
            <MobileNavLink to="/" label="Home" onClick={toggleMenu} />
            <MobileNavLink to="/therapy-sessions" label="Therapy Sessions" onClick={toggleMenu} />
            <MobileNavLink to="/mood-tracker" label="Mood Tracker" onClick={toggleMenu} />
            <MobileNavLink to="/resources" label="Resources" onClick={toggleMenu} />
            
            {isLoggedIn ? (
              <>
                <MobileNavLink to="/profile" label="Profile" onClick={toggleMenu} />
                <button 
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="block w-full text-left py-2 text-gray-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button className="block w-full py-2 mt-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`font-medium transition-colors ${
        isActive 
          ? 'text-indigo-600 border-b-2 border-indigo-600' 
          : 'text-gray-700 hover:text-indigo-600'
      }`}
    >
      {label}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`block py-2 font-medium ${
        isActive ? 'text-indigo-600' : 'text-gray-700'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;