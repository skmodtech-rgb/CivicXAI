import React from 'react';
import { Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const Fraud = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Anonymous fraud report submitted securely.');
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gray-100 rounded-xl">
            <Shield className="w-8 h-8 text-gray-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Report Fraud</h2>
            <p className="text-gray-500">Submit an anonymous report of corruption or fraud.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Fraud</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white">
              <option>Bribery / Corruption</option>
              <option>Cyber Fraud</option>
              <option>Public Fund Misuse</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Details (Anonymous)</label>
            <textarea 
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none"
              placeholder="Provide as much detail as possible. Your identity remains hidden."
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            Submit Anonymous Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Fraud;
