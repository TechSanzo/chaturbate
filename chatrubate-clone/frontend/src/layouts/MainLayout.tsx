import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600">
                ChatHub
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* User Navigation */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Credits: <span className="font-bold text-primary-600">{user.credits}</span>
                    </span>
                    
                    {user.role === 'model' ? (
                      <Link
                        to="/dashboard"
                        className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/browse"
                        className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
                      >
                        Browse Models
                      </Link>
                    )}

                    <div className="relative group">
                      <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          {user.avatar_url ? (
                            <img
                              src={user.avatar_url}
                              alt={user.username}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-primary-600 font-bold">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <span>{user.username}</span>
                      </button>
                      
                      {/* Dropdown */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Profile Settings
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Guest Navigation */}
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-primary-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">ChatHub</h3>
              <p className="text-gray-400 text-sm">
                The ultimate live streaming and chat platform for models and viewers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Models</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/signup" className="hover:text-white">Become a Model</Link></li>
                <li><Link to="/model-guide" className="hover:text-white">Model Guide</Link></li>
                <li><Link to="/earnings" className="hover:text-white">Earnings Info</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Viewers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/browse" className="hover:text-white">Browse Models</Link></li>
                <li><Link to="/credits" className="hover:text-white">Buy Credits</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 ChatHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};