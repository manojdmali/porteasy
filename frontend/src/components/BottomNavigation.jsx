import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Clock, User, Phone } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Book', path: '/book', icon: Search },
    { name: 'Track', path: '/track', icon: Clock },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Support', path: '/support', icon: Phone },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px] ${
                active
                  ? 'text-blue-600 bg-blue-50 scale-105'
                  : 'text-gray-500 hover:text-gray-700 active:scale-95'
              }`}
            >
              <Icon 
                className={`w-5 h-5 mb-1 transition-all duration-200 ${
                  active ? 'scale-110' : ''
                }`} 
              />
              <span className={`text-xs font-medium transition-all duration-200 ${
                active ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {item.name}
              </span>
              {active && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;