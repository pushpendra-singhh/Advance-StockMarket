import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Stocks from './components/Stocks';
import Login from './components/Login';
import { StockDataProvider } from './context/StockDataContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppContent() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // User is logged in, you can perform any necessary actions here
    }
  }, [user]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgba(221,238,240,255)' }}>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Stocks /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <StockDataProvider>
          <AppContent />
        </StockDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;