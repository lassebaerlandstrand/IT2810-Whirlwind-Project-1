import React from 'react';
import { useFavorites } from '../../contexts/FavoritesFunctions';
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
        <section className={styles.section}>
          <h2>Favorited Locations</h2>
          <ul className={styles.list}>
            {favoritedLocations.map((location, index) => (
              <ListWeatherCard key={`fav-${index}`} location={location} />
            ))}
          </ul>
        </section>
      )}
      {nonFavoritedLocations.length > 0 && (
        <section className={styles.section}>
          <h2>Other Locations</h2>
          <ul className={styles.list}>
            {nonFavoritedLocations.map((location, index) => (
              <ListWeatherCard key={`nonfav-${index}`} location={location} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default WeatherList;
