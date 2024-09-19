import {
  IconCloudFilled,
  IconCloudRain,
  IconHeart,
  IconHeartFilled,
  IconRotateClockwise,
  IconSunFilled,
} from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useWeather } from '../../hooks/useWeather';
import { Location } from '../../types/api-types';
import styles from './ListWeatherCard.module.css';

interface ListWeatherCardProps {
  location: Location;
}

const ListWeatherCard: React.FC<ListWeatherCardProps> = ({ location }) => {
  const { data, isLoading, error } = useWeather(location);
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(
    (fav) => fav.city_name === location.city_name && fav.country_name === location.country_name,
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
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

  const handleCardClick = () => {
    navigate(`/location/${location.city_name}`);
  };

  return (
    <div className={styles.weatherCard} onClick={handleCardClick} role="button">
      <div className={styles.weatherTop}>
        <div className={styles.locationInfo}>
          <h3>{location.country_name}</h3>
          <div className={styles.cityRow}>
            <h2>{location.city_name}</h2>
            <div className={styles.favoriteIcon} onClick={handleFavoriteClick}>
              {isFavorite ? <IconHeartFilled color="white" /> : <IconHeart color="rgba(255, 255, 255, 0.5)" />}
            </div>
          </div>
        </div>
        {data ? renderWeatherIcon(weatherDescription) : <IconRotateClockwise className={styles.rotating} />}
      </div>
      <div className={styles.weatherBottom}>
        <span className={styles.temperature}>{data ? data.air_temperature : '--'}°C</span>
        <p className={styles.weatherDescription}>{weatherDescription}</p>
      </div>
    </div>
  );
};

export default ListWeatherCard;
