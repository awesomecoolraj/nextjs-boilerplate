'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Users } from 'lucide-react';

const Cloud = ({ className }: { className: string }) => (
  <div className={`absolute bg-white rounded-full blur-sm opacity-80 ${className}`}>
    <div className="absolute bg-white rounded-full blur-sm" style={{ filter: 'blur(8px)' }}></div>
  </div>
);

const MSFSTracker = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [totalLoaded, setTotalLoaded] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted state and load data from localStorage
    setMounted(true);
    try {
      const savedState = window.localStorage.getItem('msfsLoaded');
      const savedTotal = window.localStorage.getItem('msfsTotalLoaded');
      
      if (savedState === 'true') {
        setHasLoaded(true);
      }
      if (savedTotal) {
        setTotalLoaded(parseInt(savedTotal));
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return null;
  }

  const handleClick = () => {
    try {
      const newState = !hasLoaded;
      setHasLoaded(newState);
      window.localStorage.setItem('msfsLoaded', newState.toString());
      
      const newTotal = newState ? totalLoaded + 1 : totalLoaded - 1;
      setTotalLoaded(newTotal);
      window.localStorage.setItem('msfsTotalLoaded', newTotal.toString());
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-sky-400 to-sky-200">
      <Cloud className="w-32 h-24 top-1/4 left-1/4" />
      <Cloud className="w-40 h-28 top-1/3 right-1/4" />
      <Cloud className="w-36 h-24 bottom-1/3 left-1/3" />
      <Cloud className="w-28 h-20 top-1/2 right-1/3" />
      <Cloud className="w-44 h-32 bottom-1/4 right-1/2" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-8 text-shadow text-center px-4">
          MSFS 2024 Load Tracker
        </h1>
        
        <Button 
          onClick={handleClick}
          className={`w-48 h-16 text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform hover:scale-105
            ${hasLoaded 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {hasLoaded ? (
            <>
              <Check className="w-6 h-6" />
              Loaded!
            </>
          ) : (
            'Mark as Loaded'
          )}
        </Button>

        <div className="mt-8 bg-white bg-opacity-90 rounded-full px-6 py-3 flex items-center gap-2 shadow-lg">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="text-lg font-semibold text-gray-700">
            {totalLoaded} {totalLoaded === 1 ? 'person has' : 'people have'} loaded MSFS
          </span>
        </div>
      </div>

      <div className="absolute top-8 right-12 w-24 h-24 bg-yellow-200 rounded-full blur-sm opacity-75"></div>
    </div>
  );
};

export default MSFSTracker;
