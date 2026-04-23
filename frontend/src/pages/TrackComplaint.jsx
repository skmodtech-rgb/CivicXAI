import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { format } from 'date-fns';

const TrackComplaint = () => {
  const { user } = useAuthStore();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/complaints/my', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setComplaints(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [user]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'Critical') return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (priority === 'High') return <AlertCircle className="w-4 h-4 text-orange-500" />;
    return <AlertCircle className="w-4 h-4 text-gray-400" />;
  };

  if (loading) return <div className="flex justify-center py-20"><Loader className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Complaints</h2>
      
      {complaints.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No complaints yet</h3>
          <p className="text-gray-500">You haven't reported any issues.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={complaint._id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">
                      {complaint.category}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{complaint.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                    {getPriorityIcon(complaint.priority)} Priority: {complaint.priority}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 block">{format(new Date(complaint.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                {complaint.description}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackComplaint;
