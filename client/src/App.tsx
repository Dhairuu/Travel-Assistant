import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import TripDetails from './pages/TripDetails';
import Navigation from './components/Navigation';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Update document class for global dark mode
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { isDarkMode, setIsDarkMode } = useTheme();

  useEffect(() => {
    // Try to fetch protected data to check auth
    console.log('Fetching latest trip data');
    fetch('http://localhost:5000/api/trips/latest', { 
      method: 'GET',
      credentials: 'include' })
      .then(res => {
        console.log('Response:', res);
        setIsAuthenticated(res.status !== 401);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AuthPage isDarkMode={isDarkMode} onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        {/* Logout Button and Dark Mode Toggle */}
        <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors
              ${isDarkMode
                ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400'
                : 'bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300'
              }
            `}
            aria-label="Logout"
          >
            Logout
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/create" element={<Create isDarkMode={isDarkMode} />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="/profile" element={<Profile isDarkMode={isDarkMode} />} />
        </Routes>
        <Navigation isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
};

export default App;
