import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, MapPin, Award, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
  >
    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="h-7 w-7 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

const Landing = () => {
  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      {/* Hero Section */}
      <section className="w-full text-center max-w-4xl mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            Smart Complaint Resolution Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Empowering Citizens, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Transforming Cities.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            CivicX connects you directly with authorities using AI. Report issues, track progress, earn rewards, and make your community a better place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1">
              Join the Movement
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
              Login to Account
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={Zap}
            title="AI-Powered Routing"
            desc="Our smart engine automatically categorizes and routes complaints to the right department."
          />
          <FeatureCard 
            icon={MapPin}
            title="Live Tracking"
            desc="Track the resolution of your issue in real-time with transparent timeline updates."
          />
          <FeatureCard 
            icon={Award}
            title="Civic Rewards"
            desc="Earn points for valid complaints and participating in civic learning programs."
          />
          <FeatureCard 
            icon={Shield}
            title="Emergency SOS"
            desc="One-tap panic button to alert authorities with your live location instantly."
          />
        </div>
      </section>
    </div>
  );
};

export default Landing;
