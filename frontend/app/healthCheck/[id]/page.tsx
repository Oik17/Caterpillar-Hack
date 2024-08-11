'use client'; // Ensure this is a client component

import { useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';

interface PageProps {
  params: {
    id: string;
  };
}

interface ComponentData {
  Drive: Record<string, number>;
  Engine: Record<string, number>;
  Fuel: Record<string, number>;
  Misc: Record<string, number>;
}

interface HealthCheckData {
  components: ComponentData;
  health_score: number;
}

const HealthCheck = ({ params }: PageProps) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<HealthCheckData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://caterpillar-hack-production.up.railway.app/products/getHealth/${id}`,
        );
        setData(response.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='w-full h-screen'>

        <Navigation page={''}/>
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">ID: {id}</h1>
      {data ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-green-600">Health Score: {(data.health_score).toFixed(4)}</h2>
          <div className="space-y-4 h-[450px] overflow-y-auto scrollbar">
            {Object.entries(data.components).map(([component, values]) => (
              <div key={component} className="border border-gray-200 rounded-lg shadow-md p-4 bg-white">
                <h3 className="text-xl font-medium text-gray-700 mb-2 underline decoration-yellow-500">{component}</h3>
                <ul className="list-none space-y-2">
                  {Object.entries(values as Record<string, number>).map(([key, value]) => (
                    <li key={key} className="text-gray-600">
                      <span className="font-semibold">{key}:</span> {value.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-500">Loading...</p>
      )}
    </div>
    </div>
  );
};

export default HealthCheck;
