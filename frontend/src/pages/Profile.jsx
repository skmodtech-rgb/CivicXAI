import React from 'react';
import useAuthStore from '../store/useAuthStore';
import { User, Mail, Shield, Award } from 'lucide-react';

const Profile = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h2>
        <p className="text-gray-500 mb-6 flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" /> {user.email}
        </p>

        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
            <Shield className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Role</p>
              <p className="font-semibold text-gray-900 capitalize">{user.role}</p>
            </div>
          </div>
          {user.role === 'citizen' && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Points</p>
                <p className="font-semibold text-gray-900">{user.points || 0}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
