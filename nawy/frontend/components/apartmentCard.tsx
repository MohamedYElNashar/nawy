import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { motion } from 'framer-motion';

interface ApartmentDetails {
  _id: string;
  name: string;
  location: string;
  price: number;
}

interface ApartmentCardProps {
  apartment: ApartmentDetails;
  onDelete: (id: string) => void; // Callback to remove the apartment from the list
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, onDelete }) => {
  const [apartmentDetails, setApartmentDetails] = useState<ApartmentDetails | null>(apartment);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [locations, setLocations] = useState<string[]>([]); // List of locations to choose from
  const [selectedLocation, setSelectedLocation] = useState<string>(apartment.location); // To manage the selected location

  useEffect(() => {
    // Fetch the available locations
    const fetchLocations = async () => {
      try {
        const response = await api.get('/apartment/locations');
        setLocations(Object.values(response.data)); // Use Object.values to get the location list
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleFetchDetails = async () => {
    try {
      if (isDetailsVisible) {
        setIsDetailsVisible(false);
      } else {
        const response = await api.get(`/apartment/${apartment._id}`);
        setApartmentDetails(response.data);
        setIsDetailsVisible(true);
      }
    } catch (error) {
      console.error('Error fetching apartment details:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete('/apartment/', { data: { _id: apartment._id } });
      setApartmentDetails(null); // Hide details after deletion
      setIsDetailsVisible(false); // Hide details section
      onDelete(apartment._id); // Call the parent callback to remove the card from the list
      console.log('Apartment deleted');
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };

  const handleUpdateLocation = async (newLocation: string) => {
    try {
      const response = await api.patch(`/apartment/${apartment._id}`, { location: newLocation });
      setApartmentDetails((prevDetails) => {
        if (prevDetails) {
          return { ...prevDetails, location: newLocation };
        }
        return prevDetails; // If prevDetails is null, return the same value
      });
      setSelectedLocation(newLocation); // Update the selected location in the state
      console.log('Apartment location updated:', response.data);
    } catch (error) {
      console.error('Error updating apartment location:', error);
    }
  };

  const handleIncreasePrice = async () => {
    try {
      const newPrice = apartmentDetails ? apartmentDetails.price + 1000 : 0; // Increase price by 1000
      const response = await api.patch(`/apartment/${apartment._id}`, { price: newPrice });
      setApartmentDetails((prevDetails) => {
        if (prevDetails) {
          return { ...prevDetails, price: response.data.price }; // Update the price in the state
        }
        return prevDetails;
      });
      console.log('Apartment price updated:', response.data);
    } catch (error) {
      console.error('Error updating apartment price:', error);
    }
  };

  if (!apartmentDetails) return null; // Return null if apartment is deleted and details are removed

  return (
    <motion.div
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundImage: `url('/house.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        src={'/house.jpg'}
        alt={apartmentDetails.name}
        className="w-full h-48 object-cover opacity-0"
      />
      <div className="p-4 bg-black bg-opacity-50">
        <h2 className="text-xl text-white font-bold">{apartmentDetails.name}</h2>
        <p className="text-white">{apartmentDetails.location}</p>
        <p className="text-white font-medium">{apartmentDetails.price} EGP</p>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={handleFetchDetails}
          className="mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          {isDetailsVisible ? 'Save Changes' : 'Edit Details'}
        </button>
      </div>

      {isDetailsVisible && apartmentDetails && (
        <div className="mt-4 bg-gray-900 p-4 rounded-lg">
          {/* Location dropdown */}
          <div className="mt-4">
            <label htmlFor="location" className="text-white">Select Location:</label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => handleUpdateLocation(e.target.value)}
              className="mt-2 px-4 py-2 rounded-md bg-gray-700 text-white"
            >
              {locations.map((location, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Increase price button */}
          <div className="mt-4">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={handleIncreasePrice}
              className="bg-green-600 text-white px-4 py-2 rounded-lg transform transition-all hover:scale-105"
            >
              Increase Price by 1000 EGP
            </button>
          </div>

          {/* Delete Apartment Button */}
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg transform transition-all hover:scale-105"
          >
            Delete Apartment
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ApartmentCard;
