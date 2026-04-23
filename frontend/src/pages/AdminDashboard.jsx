import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user]);

  if (!stats) return <div className="text-center py-20 text-gray-500">Loading dashboard...</div>;

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-xl ${color}`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h4 className="text-3xl font-bold text-gray-900">{value}</h4>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Admin Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Complaints" value={stats.totalComplaints} icon={FileText} color="bg-blue-100 text-blue-600" />
        <StatCard title="Resolved" value={stats.resolvedComplaints} icon={CheckCircle} color="bg-green-100 text-green-600" />
        <StatCard title="Pending" value={stats.pendingComplaints} icon={Clock} color="bg-yellow-100 text-yellow-600" />
        <StatCard title="Resolution Rate" value={`${stats.resolutionRate}%`} icon={Users} color="bg-purple-100 text-purple-600" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 h-96">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Complaints by Category</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.categoryStats}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
            <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
