import React, { useCallback, useState } from 'react';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortDropDown from '../../components/SortDropDown/SortDropDown';
import WeatherList from '../../components/WeatherList/WeatherList';
import { Location } from '../../types/api-types';
import LOCATIONS from '../../utils/locations';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [filteredCities, setFilteredCities] = useState<Location[]>(LOCATIONS);
  const [sortCondition, setSortCondition] = useState<((a: Location, b: Location) => number) | null>(null);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      let filteredData = LOCATIONS;

      if (searchQuery) {
        filteredData = LOCATIONS.filter((city) => city.city_name.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      if (sortCondition) {
        filteredData = [...filteredData].sort(sortCondition);
      }

      setFilteredCities(filteredData);
    },
    [sortCondition],
  );

  const handleSort = useCallback((sortFn: (a: Location, b: Location) => number) => {
    setSortCondition(() => sortFn);
    setFilteredCities((prevCities) => [...prevCities].sort(sortFn));
  }, []);

  return (
    <main className={styles.homeContainer}>
      <Header />
      <div className={styles.searchSortContainer}>
        <SearchBar onSearch={handleSearch} />
        <SortDropDown setSortCondition={handleSort} />
      </div>
      <WeatherList locations={filteredCities} />
    </main>
  );
};

export default Home;
