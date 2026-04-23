import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(res.data);
      toast.success('Login successful!');
      if (res.data.role === 'admin') navigate('/admin-dashboard');
      else if (res.data.role === 'official') navigate('/official-dashboard');
      else navigate('/citizen-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
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
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
