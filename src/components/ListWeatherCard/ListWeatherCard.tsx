import React from 'react';
import styles from './ListWeatherCard.module.css';

interface ListWeatherCardProps {
  city_name: string;
  country_name: string;
  air_temperature: number;
  weather_description: string;
}

const ListWeatherCard: React.FC<ListWeatherCardProps> = ({
  city_name,
  country_name,
  air_temperature,
  weather_description,
}) => {
  return (
    <div className={styles.weatherCard}>
      <div className={styles.weatherTop}>
        <h3>
          {city_name}, {country_name}
        </h3>
        <span className={styles.temperature}>{air_temperature}°C</span>
      </div>
      <p className={styles.weatherDescription}>{weather_description}</p>
    </div>
  );
};

export default ListWeatherCard;
