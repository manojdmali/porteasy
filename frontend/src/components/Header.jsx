import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, User, History, Headphones, Bell, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: MapPin },
    { name: 'Track', path: '/track', icon: MapPin },
    { name: 'History', path: '/history', icon: History },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Support', path: '/support', icon: Headphones },
  ];

  const driverNavItems = [
    { name: 'Driver Orders', path: '/driver-orders', icon: Truck },
    { name: 'Driver Partner', path: '/driver-partner', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              PORTER
            </div>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:animate-pulse"></div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/driver-partner" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:bg-blue-50 rounded-lg"
            >
              For Enterprise
            </Link>
            <Link 
              to="/driver-orders" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:bg-blue-50 rounded-lg"
            >
              Driver Dashboard
            </Link>
            <Link 
              to="/support" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:bg-blue-50 rounded-lg"
            >
              Support
            </Link>
            
            {/* Notification Icon */}
            <div className="relative ml-4">
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
            </div>

            {/* Profile Avatar */}
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="ml-2 p-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  J
                </div>
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-600" />
            ) : (
              <Menu size={24} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            
            <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
              {driverNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              <Link
                to="/driver-partner"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-medium">For Enterprise</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;