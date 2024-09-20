import {
  IconArrowRight,
  IconCloudFilled,
  IconCloudRain,
  IconHeart,
  IconHeartFilled,
  IconRotateClockwise,
  IconSunFilled,
} from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesFunctions';
import { useWeather } from '../../hooks/useWeather';
import { Location } from '../../types/api-types';
import styles from './ListWeatherCard.module.css';

interface ListWeatherCardProps {
  location: Location;
}

const ListWeatherCard: React.FC<ListWeatherCardProps> = ({ location }) => {
  const { data, isLoading, error } = useWeather(location);
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(
    (fav) => fav.city_name === location.city_name && fav.country_name === location.country_name,
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link click
    toggleFavorite(location);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <IconRotateClockwise className={styles.rotating} /> Loading...
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error fetching data for {location.city_name}</div>;
  }

  const determineWeatherDescription = (precipitation: number, cloudCover: number) => {
    if (precipitation > 0) return 'Rainy';
    if (cloudCover > 0.5) return 'Cloudy';
    return 'Sunny';
  };

  const weatherDescription = data
    ? determineWeatherDescription(data.precipitation_amount, data.cloud_area_fraction)
    : '';

  const renderWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case 'sunny':
        return <IconSunFilled className={styles.weatherIcon} />;
      case 'cloudy':
        return <IconCloudFilled className={styles.weatherIcon} />;
      case 'rainy':
        return <IconCloudRain className={styles.weatherIcon} />;
      default:
        return <IconSunFilled className={styles.weatherIcon} />;
    }
  };

  return (
    <Link to={`/location/${location.city_name}`} className={styles.weatherCard} data-testid="link-button">
      <div className={styles.weatherTop}>
        <div className={styles.locationInfo}>
          <div className={styles.cityNameAndFavorite}>
            <h2>{location.city_name}</h2>
            <button
              className={styles.favoriteIcon}
              onClick={handleFavoriteClick}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite ? `Remove ${location.city_name} from favorites` : `Add ${location.city_name} to favorites`
              }
            >
              {isFavorite ? <IconHeartFilled aria-hidden="true" /> : <IconHeart aria-hidden="true" />}
            </button>
          </div>
          <h3>{location.country_name}</h3>
        </div>
        {data ? renderWeatherIcon(weatherDescription) : <IconRotateClockwise className={styles.rotating} />}
      </div>
      <div className={styles.weatherBottom}>
        <div>
          <span className={styles.temperature}>{data ? data.air_temperature : '--'}°C</span>
          <p className={styles.weatherDescription}>{weatherDescription}</p>
        </div>
        <IconArrowRight />
      </div>
    </Link>
  );
};

export default ListWeatherCard;
