import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">StockMarket App</Link>
        <div className="flex space-x-4 items-center">
          <Link to="/" className="flex items-center hover:text-gray-600 transition-colors">
            <Home className="mr-1" size={20} />
            Home
          </Link>
          <Link to="/profile" className="flex items-center hover:text-gray-600 transition-colors">
            <User className="mr-1" size={20} />
            Profile
          </Link>
          <button onClick={handleLogout} className="flex items-center hover:text-gray-600 transition-colors">
            <LogOut className="mr-1" size={20} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;