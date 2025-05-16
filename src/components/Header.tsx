import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link as LinkIcon } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-xl font-bold text-indigo-600">
          <LinkIcon size={24} className="mr-2" />
          <span>l.ixnix.net</span>
        </Link>
        
        <nav>
          <ul className="flex space-x-4">
            {currentUser ? (
              <>
                <li>
                  <Link 
                    to="/profile" 
                    className="px-3 py-2 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => logout()} 
                    className="px-3 py-2 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="px-3 py-2 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;