import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Welcome to{' '}
              <span className="text-primary-200">ChatHub</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-primary-100 sm:text-2xl md:mt-5 md:max-w-3xl">
              The ultimate live streaming platform connecting models and viewers in real-time
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              {!user ? (
                <>
                  <Link
                    to="/signup?role=user"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 transition"
                  >
                    Start Watching
                  </Link>
                  <Link
                    to="/signup?role=model"
                    className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-primary-700 transition"
                  >
                    Become a Model
                  </Link>
                </>
              ) : (
                <Link
                  to={user.role === 'model' ? '/dashboard' : '/browse'}
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 transition"
                >
                  {user.role === 'model' ? 'Go to Dashboard' : 'Browse Models'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose ChatHub?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need for live streaming and interaction
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 text-white mx-auto">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">HD Live Streaming</h3>
              <p className="mt-2 text-gray-600">
                High-quality video streaming with real-time interaction and crystal-clear audio.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 text-white mx-auto">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Real-time Chat</h3>
              <p className="mt-2 text-gray-600">
                Instant messaging with models and other viewers. Build connections that matter.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 text-white mx-auto">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Tip & Earn</h3>
              <p className="mt-2 text-gray-600">
                Support your favorite models with tips or earn credits by streaming yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-primary-200">Active Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100K+</div>
              <div className="text-primary-200">Registered Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-primary-200">Live Streaming</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$1M+</div>
              <div className="text-primary-200">Earned by Models</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of models and viewers already using ChatHub
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup?role=user"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition"
              >
                Join as Viewer
              </Link>
              <Link
                to="/signup?role=model"
                className="inline-flex items-center justify-center px-8 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition"
              >
                Apply as Model
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;