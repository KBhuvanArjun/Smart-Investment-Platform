import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ContactPage from './pages/ContactPage';
import WebSeriesPage from './pages/WebSeriesPage';

// Investor Pages
import InvestorHome from './pages/investor/InvestorHome';
import InvestorMovies from './pages/investor/InvestorMovies';
import MovieDetail from './pages/investor/MovieDetail';
import InvestmentPage from './pages/investor/InvestmentPage';
import PaymentGateway from './pages/investor/PaymentGateway';

// Creator Pages
import CreatorHome from './pages/creator/CreatorHome';
import CreatorMovies from './pages/creator/CreatorMovies';
import CreatorMovieDetail from './pages/creator/CreatorMovieDetail';
import InvestmentDashboard from './pages/creator/InvestmentDashboard';

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'investor' | 'creator' }> = ({ 
  children, 
  role 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (role && user?.role !== role) {
    return <Navigate to={user?.role === 'investor' ? '/investor/home' : '/creator/home'} replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Investor Routes */}
            <Route path="/investor/home" element={
              <ProtectedRoute role="investor">
                <InvestorHome />
              </ProtectedRoute>
            } />
            <Route path="/investor/movies" element={
              <ProtectedRoute role="investor">
                <InvestorMovies />
              </ProtectedRoute>
            } />
            <Route path="/investor/movie/:id" element={
              <ProtectedRoute role="investor">
                <MovieDetail />
              </ProtectedRoute>
            } />
            <Route path="/investor/invest/:id" element={
              <ProtectedRoute role="investor">
                <InvestmentPage />
              </ProtectedRoute>
            } />
            <Route path="/investor/payment" element={
              <ProtectedRoute role="investor">
                <PaymentGateway />
              </ProtectedRoute>
            } />
            <Route path="/investor/web-series" element={
              <ProtectedRoute role="investor">
                <WebSeriesPage />
              </ProtectedRoute>
            } />
            <Route path="/investor/contact" element={
              <ProtectedRoute role="investor">
                <ContactPage />
              </ProtectedRoute>
            } />
            
            {/* Creator Routes */}
            <Route path="/creator/home" element={
              <ProtectedRoute role="creator">
                <CreatorHome />
              </ProtectedRoute>
            } />
            <Route path="/creator/movies" element={
              <ProtectedRoute role="creator">
                <CreatorMovies />
              </ProtectedRoute>
            } />
            <Route path="/creator/movie/:id" element={
              <ProtectedRoute role="creator">
                <CreatorMovieDetail />
              </ProtectedRoute>
            } />
            <Route path="/creator/dashboard" element={
              <ProtectedRoute role="creator">
                <InvestmentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/creator/web-series" element={
              <ProtectedRoute role="creator">
                <WebSeriesPage />
              </ProtectedRoute>
            } />
            <Route path="/creator/contact" element={
              <ProtectedRoute role="creator">
                <ContactPage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
