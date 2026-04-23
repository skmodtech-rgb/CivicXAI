import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Menu, X, Shield, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin-dashboard';
      case 'official': return '/official-dashboard';
      default: return '/citizen-dashboard';
    }
  };

  const navLinks = user ? [
    { name: 'Dashboard', path: getDashboardLink() },
    { name: 'Raise Complaint', path: '/raise-complaint', roles: ['citizen'] },
    { name: 'Track Status', path: '/track', roles: ['citizen'] },
    { name: 'Emergency', path: '/emergency', roles: ['citizen'] },
    { name: 'Rewards', path: '/rewards', roles: ['citizen'] },
  ].filter(link => !link.roles || link.roles.includes(user.role)) : [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">Civic<span className="text-primary">X</span></span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-600 hover:text-primary font-medium transition-colors">
                {link.name}
              </Link>
            ))}
            {user && (
              <div className="flex items-center gap-4 ml-4">
                {user.role === 'citizen' && (
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                    {user.points || 0} pts
                  </span>
                )}
                <Link to="/profile" className="text-gray-600 hover:text-primary">
                  <UserIcon className="h-5 w-5" />
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-danger transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-danger hover:bg-red-50 rounded-md"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
