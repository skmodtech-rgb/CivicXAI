import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'citizen' });
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setUser(res.data);
      toast.success('Registration successful!');
      if (res.data.role === 'admin') navigate('/admin-dashboard');
      else if (res.data.role === 'official') navigate('/official-dashboard');
      else navigate('/citizen-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
              value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="citizen">Citizen</option>
              <option value="official">Government Official</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-70 mt-2"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
