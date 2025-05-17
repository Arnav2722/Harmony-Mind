import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="text-xl font-bold text-white">HarmonyMind</span>
            </div>
            <p className="mb-4 text-gray-400">
              Combining the healing power of music with evidence-based psychology to transform your mental wellbeing.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/therapy-sessions" label="Therapy Sessions" />
              <FooterLink to="/mood-tracker" label="Mood Tracker" />
              <FooterLink to="/resources" label="Resources" />
              <FooterLink to="/profile" label="My Profile" />
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink to="/resources#research" label="Research" />
              <FooterLink to="/resources#guides" label="Therapeutic Guides" />
              <FooterLink to="/resources#faq" label="FAQ" />
              <FooterLink to="/resources#support" label="Support" />
              <FooterLink to="/resources#blog" label="Blog" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 text-indigo-400 shrink-0" />
                <span>123 Harmony Street, Mindful City, MC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-indigo-400 shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-indigo-400 shrink-0" />
                <a href="mailto:contact@harmonymind.com" className="hover:text-indigo-400 transition-colors">
                  contact@harmonymind.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
          <p>&copy; {currentYear} HarmonyMind. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-3">
            <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link to={to} className="hover:text-indigo-400 transition-colors">
        {label}
      </Link>
    </li>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => {
  return (
    <a
      href="#"
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-indigo-600 hover:text-white transition-all"
    >
      {icon}
    </a>
  );
};

export default Footer;