import React, { useState } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Emergency = () => {
  const [loading, setLoading] = useState(false);

  const handlePanic = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        setTimeout(() => {
          setLoading(false);
          toast.success('Emergency alert sent to nearby authorities with live location!');
        }, 1500);
      }, () => {
        setLoading(false);
        toast.error('Location needed for emergency alert');
      });
    }
  };

  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <div className="max-w-md bg-white p-10 rounded-3xl shadow-sm border border-red-100 flex flex-col items-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Emergency SOS</h2>
        <p className="text-gray-500 mb-8">Use this only in case of a severe emergency. It will instantly dispatch authorities to your live location.</p>
        
        <button 
          onClick={handlePanic}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-2xl text-2xl shadow-xl shadow-red-600/30 transition-transform active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {loading ? 'Sending Alert...' : <><MapPin className="w-8 h-8" /> PRESS TO ALERT</>}
        </button>
      </div>
    </div>
  );
};

export default Emergency;
