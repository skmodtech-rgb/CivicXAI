import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { PlusCircle, Activity, Award, BookOpen, AlertTriangle } from 'lucide-react';

const DashboardCard = ({ to, icon: Icon, title, desc, colorClass }) => (
  <Link to={to}>
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl shadow-sm border border-gray-100 bg-white h-full flex flex-col items-start hover:shadow-md transition-shadow`}
    >
      <div className={`p-3 rounded-xl mb-4 ${colorClass}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </motion.div>
  </Link>
);

const CitizenDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mt-2">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          to="/raise-complaint"
          icon={PlusCircle}
          title="Raise Complaint"
          desc="Report an issue in your area with photos and location."
          colorClass="bg-blue-100 text-blue-600"
        />
        <DashboardCard 
          to="/track"
          icon={Activity}
          title="Track Status"
          desc="Check the real-time progress of your reported issues."
          colorClass="bg-teal-100 text-teal-600"
        />
        <DashboardCard 
          to="/emergency"
          icon={AlertTriangle}
          title="Emergency SOS"
          desc="Instantly alert authorities in case of emergency."
          colorClass="bg-red-100 text-red-600"
        />
        <DashboardCard 
          to="/rewards"
          icon={Award}
          title="My Rewards"
          desc="View your earned points and redeem them."
          colorClass="bg-yellow-100 text-yellow-600"
        />
        <DashboardCard 
          to="/learning"
          icon={BookOpen}
          title="Civic Learning"
          desc="Watch awareness videos to earn extra points."
          colorClass="bg-purple-100 text-purple-600"
        />
        <DashboardCard 
          to="/fraud"
          icon={AlertTriangle}
          title="Report Fraud"
          desc="Anonymously report corruption or fraudulent activities."
          colorClass="bg-gray-100 text-gray-600"
        />
      </div>
    </div>
  );
};

export default CitizenDashboard;
