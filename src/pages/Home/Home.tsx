import { useCallback, useEffect, useState } from 'react';
import Example from '../../components/Example/Example';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortDropDown from '../../components/SortDropDown/SortDropDown';
import type { Location } from '../../types/api-types';
import styles from './Home.module.css';

const Home = () => {
  const [cities] = useState<Location[]>([
    { city_name: 'New York', country_name: 'USA', latitude: '40.7128', longitude: '-74.006' },
    { city_name: 'London', country_name: 'UK', latitude: '51.5074', longitude: '-0.1278' },
    { city_name: 'Tokyo', country_name: 'Japan', latitude: '35.6895', longitude: '139.6917' },
  ]); // Dummy data, to be changed

  const [filteredCities, setFilteredCities] = useState(cities);
  const [invalidateSort, setInvalidateSort] = useState(false);
  const [sortCondition, setSortCondition] = useState<((a: Location, b: Location) => number) | null>(null);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery === '' || searchQuery === null) {
        setFilteredCities(cities);
      } else {
        const filteredData = cities.filter((city) => city.city_name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredCities(filteredData);
      }
      setInvalidateSort(true);
    },
    [cities],
  );

  useEffect(() => {
    if (sortCondition) {
      setFilteredCities((prevCities) => [...prevCities].sort(sortCondition));
      setInvalidateSort(false);
    }
  }, [sortCondition, invalidateSort]);

  return (
    <div>
      <h1>43 °C</h1>
      <h1>🔥😰🔥</h1>
      <Example />
      <div role="search" className={styles.searchContainer}>
        <SearchBar onSearch={handleSearch} />
        <SortDropDown setSortCondition={setSortCondition} />
      </div>
      <ul>
        {filteredCities.map((city, index) => (
          <li key={index}>{city.city_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
