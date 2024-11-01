import React, { useCallback, useState } from 'react';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortDropDown from '../../components/SortDropDown/SortDropDown';
import WeatherList from '../../components/WeatherList/WeatherList';
import { useLocations } from '../../contexts/LocationContext';
import { Location } from '../../types/api-types';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const { sortedLocations, setSortCondition } = useLocations();
  const [filteredCities, setFilteredCities] = useState<Location[]>(sortedLocations);

  console.log(sortedLocations);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      let filteredData = sortedLocations;

      if (searchQuery) {
        filteredData = sortedLocations.filter((city) =>
          city.city_name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      setFilteredCities(filteredData);
    },
    [JSON.stringify(sortedLocations)],
  );

  return (
    <main className={styles.homeContainer}>
      <Header />
      <div className={styles.searchSortContainer}>
        <SearchBar onSearch={handleSearch} />
        <SortDropDown setSortCondition={() => setSortCondition} />
      </div>
      <WeatherList locations={filteredCities} />
    </main>
  );
};

export default Home;
