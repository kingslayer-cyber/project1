import React from 'react';
import { Search, Map, Clock } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-primary-500" />,
      title: 'Find Your Restaurant',
      description: 'Browse through our selection of restaurants and cuisines to find your perfect meal.'
    },
    {
      icon: <Map className="h-10 w-10 text-primary-500" />,
      title: 'Place Your Order',
      description: 'Customize your order with your preferred options and add it to your cart.'
    },
    {
      icon: <Clock className="h-10 w-10 text-primary-500" />,
      title: 'Fast Delivery',
      description: 'Track your order in real-time and enjoy your delicious food within minutes.'
    }
  ];
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900">How It Works</h2>
          <p className="mt-2 text-lg text-neutral-600">Easy steps to get your favorite food delivered</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-neutral-600">{step.description}</p>
              
              {/* Step number */}
              <div className="mt-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold">
                {index + 1}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-[calc(50%+5rem)] w-[calc(100%-10rem)] h-0.5 bg-primary-100">
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;