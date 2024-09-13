import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import type { Location } from '../../types/api-types';

const Home = () => {
  const [cities] = useState<Location[]>([
    { city_name: 'New York', country_name: 'USA', latitude: 40.7128, longitude: -74.006 },
    { city_name: 'London', country_name: 'UK', latitude: 51.5074, longitude: -0.1278 },
    { city_name: 'Tokyo', country_name: 'Japan', latitude: 35.6895, longitude: 139.6917 },
  ]); // Dummy data, to be changed
  const [filteredCities, setFilteredCities] = useState(cities);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery === '') {
      setFilteredCities(cities);
    } else {
      const filteredData = cities.filter((city) => city.city_name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredCities(filteredData);
    }
  };

  return (
    <div>
      <h1>43 °C</h1>
      <h1>🔥😰🔥</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredCities.map((city, index) => (
          <li key={index}>{city.city_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
