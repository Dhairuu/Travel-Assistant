import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  HeartIcon,
  UserIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  PlusIcon as PlusIconSolid,
  HeartIcon as HeartIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid';

interface NavigationProps {
  isDarkMode: boolean;
}

const Navigation = ({ isDarkMode }: NavigationProps) => {
  const location = useLocation();

  const tabs = [
    { name: 'Home', path: '/', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: 'Search', path: '/search', icon: MagnifyingGlassIcon, activeIcon: MagnifyingGlassIconSolid },
    { name: 'Create', path: '/create', icon: PlusIcon, activeIcon: PlusIconSolid },
    { name: 'Favorites', path: '/favorites', icon: HeartIcon, activeIcon: HeartIconSolid },
    { name: 'Profile', path: '/profile', icon: UserIcon, activeIcon: UserIconSolid },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} shadow-lg`}>
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center space-y-1 ${
            location.pathname === '/' 
              ? 'text-primary' 
              : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link
          to="/create"
          className={`flex flex-col items-center space-y-1 ${
            location.pathname === '/create' 
              ? 'text-primary' 
              : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="text-xs">Create</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center space-y-1 ${
            location.pathname === '/profile' 
              ? 'text-primary' 
              : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <UserIcon className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 