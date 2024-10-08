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
    <>
      {favoritedLocations.length > 0 && (
        <section className={styles.section}>
          <h2>Favorited Locations</h2>
          <ul className={styles.list}>
            {favoritedLocations.map((location, index) => (
              <li key={`fav-${index}`}>
                <ListWeatherCard location={location} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {nonFavoritedLocations.length > 0 && (
        <section className={styles.section}>
          <h2>{favorites.length > 0 ? 'Other Locations' : 'Locations'}</h2>
          <ul className={styles.list}>
            {nonFavoritedLocations.map((location, index) => (
              <li key={`nonfav-${index}`}>
                <ListWeatherCard location={location} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default WeatherList;
