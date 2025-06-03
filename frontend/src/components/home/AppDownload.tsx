import React from 'react';
import { Apple, PlayCircle } from 'lucide-react';

const AppDownload: React.FC = () => {
  return (
    <section className="py-16 bg-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-white mb-4">Get the FoodHub App</h2>
            <p className="text-lg text-white/90 mb-6">
              Download our mobile app for a better experience. Track orders in real-time, 
              get exclusive app-only deals, and reorder your favorite meals with just a tap.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-neutral-100 md:py-3 md:text-lg md:px-6 transition-colors">
                <Apple className="w-6 h-6 mr-2" />
                App Store
              </button>
              <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-neutral-100 md:py-3 md:text-lg md:px-6 transition-colors">
                <PlayCircle className="w-6 h-6 mr-2" />
                Google Play
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="md:absolute md:-right-8 md:-top-16 transform rotate-12">
              <img 
                src="https://images.pexels.com/photos/5303036/pexels-photo-5303036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Mobile app" 
                className="max-w-xs rounded-lg shadow-2xl"
              />
            </div>
            <div className="hidden md:block md:absolute md:-left-4 md:top-8 transform -rotate-6">
              <img 
                src="https://images.pexels.com/photos/6169869/pexels-photo-6169869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Mobile app" 
                className="max-w-xs rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;