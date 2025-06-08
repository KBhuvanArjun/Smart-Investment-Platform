import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

interface HeaderProps {
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNavigation = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">
            Smart Investment Platform for Films and Digital Media Projects
          </h1>
          
          {showNavigation && (
            <nav className="flex items-center space-x-6">
              <Link 
                to={user?.role === 'investor' ? '/investor/home' : '/creator/home'} 
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to={user?.role === 'investor' ? '/investor/movies' : '/creator/movies'} 
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Movies
              </Link>
              <Link 
                to={user?.role === 'investor' ? '/investor/web-series' : '/creator/web-series'} 
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Web Series
              </Link>
              <Link 
                to={user?.role === 'investor' ? '/investor/contact' : '/creator/contact'} 
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Contact Us
              </Link>
              
              <div className="flex items-center space-x-4 ml-6 border-l border-blue-600 pl-6">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-yellow-300 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;