import React from 'react';
import useAuthStore from '../store/useAuthStore';
import { Award, Gift, Star } from 'lucide-react';

const Rewards = () => {
  const { user } = useAuthStore();

  return (
    <div className="py-8 max-w-4xl mx-auto text-center">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl p-12 text-white shadow-lg mb-8">
        <Award className="w-20 h-20 mx-auto mb-4 opacity-90" />
        <h2 className="text-4xl font-extrabold mb-2">My Rewards Wallet</h2>
        <p className="text-xl opacity-90 mb-6">Earn points by raising valid complaints and learning.</p>
        <div className="inline-block bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/30">
          <span className="text-5xl font-black">{user?.points || 0}</span>
          <span className="text-xl ml-2 font-medium">Points</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><Star className="text-yellow-500" /> How to earn</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex justify-between border-b pb-2"><span>Raise valid complaint</span> <span className="font-bold text-green-600">+10 pts</span></li>
            <li className="flex justify-between border-b pb-2"><span>Complaint resolved</span> <span className="font-bold text-green-600">+50 pts</span></li>
            <li className="flex justify-between border-b pb-2"><span>Watch civic learning video</span> <span className="font-bold text-green-600">+5 pts</span></li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><Gift className="text-primary" /> Redeem Options</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex justify-between border-b pb-2"><span>Public Transit Pass</span> <span className="font-bold text-primary">500 pts</span></li>
            <li className="flex justify-between border-b pb-2"><span>Utility Bill Discount</span> <span className="font-bold text-primary">1000 pts</span></li>
            <li className="flex justify-between border-b pb-2"><span>City Parking Voucher</span> <span className="font-bold text-primary">300 pts</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
