import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import HomePage from './pages/HomePage';
import BookingFlow from './pages/BookingFlow';
import TrackingPage from './pages/TrackingPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import DriverPartnerPage from './pages/DriverPartnerPage';
import DriverOrdersPage from './pages/DriverOrdersPage';
import SupportPage from './pages/SupportPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        <main className="pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book" element={<BookingFlow />} />
            <Route path="/track" element={<TrackingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/driver-partner" element={<DriverPartnerPage />} />
            <Route path="/driver-orders" element={<DriverOrdersPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </main>
        <BottomNavigation />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;