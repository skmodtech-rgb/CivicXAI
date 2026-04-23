import React from 'react';
import { PlayCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CivicLearning = () => {
  const watchVideo = () => {
    toast.success('Video completed! +5 points added to your wallet.');
  };

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Civic Learning</h2>
      <p className="text-gray-600 mb-8">Watch awareness videos to learn about your civic duties and earn reward points.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Waste Management 101', duration: '5 mins' },
          { title: 'Water Conservation', duration: '3 mins' },
          { title: 'Traffic Rules & Safety', duration: '7 mins' },
          { title: 'Identifying Phishing Scams', duration: '4 mins' }
        ].map((video, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="h-40 bg-gray-200 relative flex items-center justify-center cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
              <PlayCircle className="w-16 h-16 text-primary absolute z-10 opacity-80 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-1">{video.title}</h3>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" /> {video.duration} • +5 pts
              </p>
              <button 
                onClick={watchVideo}
                className="w-full py-2 bg-gray-50 text-primary font-semibold rounded-xl hover:bg-primary/10 transition-colors"
              >
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CivicLearning;
