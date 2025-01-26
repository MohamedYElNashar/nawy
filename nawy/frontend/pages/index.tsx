import { useEffect, useState } from 'react';
import api from '@/utils/api';
import ApartmentCard from '@/components/apartmentCard';

interface Apartment {
  _id: string;
  name: string;
  location: string;
  price: number;
}

const LandingPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await api.get('/apartment/all');
        setApartments(response.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };
    fetchApartments();
  }, []);

  const filteredApartments = apartments.filter((apartment) => 
    (apartment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     apartment.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (minPrice ? apartment.price >= Number(minPrice) : true) &&
    (maxPrice ? apartment.price <= Number(maxPrice) : true)
  );

  // Handle the apartment deletion
  const handleDelete = (id: string) => {
    setApartments((prevApartments) => prevApartments.filter((apartment) => apartment._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url(/hero-image.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">Find Your Dream Apartment</h1>
          <p className="text-lg text-white mb-6">Search from thousands of apartments at your fingertips.</p>
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full max-w-lg rounded-md shadow focus:outline-none text-gray-800"
          />
          {/* Price Range Filter */}
          <div className="mt-4 flex space-x-4">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-4 py-2 w-full max-w-lg rounded-md shadow focus:outline-none text-gray-800"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-2 rounded-md shadow focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Apartments Section */}
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Apartments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApartments.map((apartment) => (
            <ApartmentCard
              key={apartment._id}
              apartment={apartment}
              onDelete={handleDelete} // Pass the onDelete handler to ApartmentCard
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
