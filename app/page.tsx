import React from 'react';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">RelatorIA</h1>
      <p className="text-xl mb-8 text-gray-700">Llevando el derecho al más aIA</p>
      <Button 
        onClick={() => console.log('Comenzar clicked')} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Comenzar
      </Button>
    </div>
  );
};

export default LandingPage;