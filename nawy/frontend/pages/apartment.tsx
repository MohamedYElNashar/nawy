import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '@/utils/api';

interface Apartment {
  name: string;
  location: string;
  price: number;
}

const ApartmentDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    console.log('API Base URL:', process.env.NEXT_PUBLIC_BACKEND_URL); // Debug log
    const fetchApartment = async () => {
      try {
        if (id) {
          const response = await api.get(`/apartment/${id}`);
          console.log(
            'API Request:',
            `${response.config.baseURL || ''}${response.config.url || ''}`
          );
          setApartment(response.data);
        }
      } catch (error) {
        console.error('Error fetching apartment details:', error);
      }
    };
  
    fetchApartment();
  }, [id]);
  

  if (!apartment) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{apartment.name}</h1>
      <p className="text-gray-600 mb-4">Location: {apartment.location}</p>
      <p className="text-gray-800 font-medium mb-4">Price: ${apartment.price}</p>
    </div>
  );
};

export default ApartmentDetails;
