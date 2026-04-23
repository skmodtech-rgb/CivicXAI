import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { Camera, MapPin, Mic, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['Garbage', 'Water Leakage', 'Illegal Parking', 'Road Damage', 'Fraud', 'Women Safety', 'Public Toilet', 'Street Light', 'Other'];

const RaiseComplaint = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Garbage',
    location: { lat: null, lng: null, address: '' }
  });
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          location: {
            ...formData.location,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Lat: ' + position.coords.latitude.toFixed(4) + ', Lng: ' + position.coords.longitude.toFixed(4)
          }
        });
        toast.success('Location captured');
      }, () => {
        toast.error('Unable to retrieve your location');
      });
    } else {
      toast.error('Geolocation not supported by your browser');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/complaints', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Complaint raised successfully! +10 points');
      navigate('/track');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to raise complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Raise a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Brief description of the issue"
              value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
              value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
            <textarea 
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              placeholder="Provide detailed information about the issue. Our AI will automatically detect priority."
              value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required 
            />
          </div>

          <div className="flex gap-4">
            <button type="button" className="flex-1 py-3 px-4 rounded-xl border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 text-gray-700 transition-colors">
              <Camera className="w-5 h-5 text-gray-500" />
              <span>Photo</span>
            </button>
            <button type="button" onClick={getLocation} className="flex-1 py-3 px-4 rounded-xl border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 text-gray-700 transition-colors">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>Location</span>
            </button>
            <button type="button" className="flex-1 py-3 px-4 rounded-xl border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 text-gray-700 transition-colors">
              <Mic className="w-5 h-5 text-gray-500" />
              <span>Voice</span>
            </button>
          </div>

          {formData.location.address && (
            <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Location added: {formData.location.address}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/20 mt-4"
          >
            {loading ? 'Submitting...' : <><Send className="w-5 h-5" /> Submit Complaint</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RaiseComplaint;
