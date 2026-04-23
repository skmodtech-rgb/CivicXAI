import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const OfficialDashboard = () => {
  const { user } = useAuthStore();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/complaints', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setComplaints(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Status updated');
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Official Dashboard</h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">ID / Date</th>
                <th className="p-4 font-semibold text-gray-600">User</th>
                <th className="p-4 font-semibold text-gray-600">Category & Priority</th>
                <th className="p-4 font-semibold text-gray-600">Issue</th>
                <th className="p-4 font-semibold text-gray-600">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.map(complaint => (
                <tr key={complaint._id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="text-xs text-gray-500 font-mono mb-1">#{complaint._id.slice(-6)}</div>
                    <div className="text-sm font-medium">{format(new Date(complaint.createdAt), 'MMM dd, yyyy')}</div>
                  </td>
                  <td className="p-4 text-sm">{complaint.user?.name}</td>
                  <td className="p-4">
                    <div className="text-sm font-bold text-gray-800">{complaint.category}</div>
                    <div className={`text-xs mt-1 font-semibold ${complaint.priority === 'Critical' ? 'text-red-600' : 'text-gray-500'}`}>
                      {complaint.priority} Priority
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 max-w-xs truncate">{complaint.title}</td>
                  <td className="p-4">
                    <select
                      className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary/50"
                      value={complaint.status}
                      onChange={(e) => updateStatus(complaint._id, e.target.value)}
                    >
                      {['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Rejected'].map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OfficialDashboard;
