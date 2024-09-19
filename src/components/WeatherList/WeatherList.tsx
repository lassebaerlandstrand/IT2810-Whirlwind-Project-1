import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Location } from '../../types/api-types';
import ListWeatherCard from '../ListWeatherCard/ListWeatherCard';
import styles from './WeatherList.module.css';

interface WeatherListProps {
  locations: Location[];
}

const WeatherList: React.FC<WeatherListProps> = ({ locations }) => {
  const { favorites } = useFavorites();

  const favoritedLocations = locations.filter((location) =>
    favorites.some((fav) => fav.city_name === location.city_name && fav.country_name === location.country_name),
  );

  const nonFavoritedLocations = locations.filter(
    (location) =>
      !favorites.some((fav) => fav.city_name === location.city_name && fav.country_name === location.country_name),
  );

  return (
    <div className={styles.weatherList} data-testid="weather-list">
      {favoritedLocations.length > 0 && (
        <>
          <h2>Favorited Locations</h2>
          <div className={styles.section}>
            {favoritedLocations.map((location, index) => (
              <ListWeatherCard key={`fav-${index}`} location={location} />
            ))}
          </div>
        </>
      )}
      {nonFavoritedLocations.length > 0 && (
        <>
          <h2>Other Locations</h2>
          <div className={styles.section}>
            {nonFavoritedLocations.map((location, index) => (
              <ListWeatherCard key={`nonfav-${index}`} location={location} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherList;
