import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import CitizenDashboard from './pages/CitizenDashboard';
import RaiseComplaint from './pages/RaiseComplaint';
import ComplaintDetails from './pages/ComplaintDetails';
import TrackComplaint from './pages/TrackComplaint';
import Rewards from './pages/Rewards';
import CivicLearning from './pages/CivicLearning';
import OfficialDashboard from './pages/OfficialDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Emergency from './pages/Emergency';
import Fraud from './pages/Fraud';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
        <Navbar />
        <main className="flex-1 w-full pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
            <Route path="/raise-complaint" element={<RaiseComplaint />} />
            <Route path="/complaint/:id" element={<ComplaintDetails />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/learning" element={<CivicLearning />} />
            <Route path="/official-dashboard" element={<OfficialDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/fraud" element={<Fraud />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
