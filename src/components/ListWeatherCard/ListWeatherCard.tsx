import { IconCloud, IconCloudRain, IconCloudStorm, IconSun } from '@tabler/icons-react';
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
  const renderWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case 'clear':
        return <IconSun className={styles.weatherIcon} />;
      case 'cloudy':
        return <IconCloud className={styles.weatherIcon} />;
      case 'thunder':
        return <IconCloudStorm className={styles.weatherIcon} />;
      case 'mostly sunny':
        return <IconSun className={styles.weatherIcon} />;
      default:
        return <IconCloudRain className={styles.weatherIcon} />;
    }
  };

  return (
    <div className={styles.weatherCard}>
      <div className={styles.weatherTop}>
        <div className={styles.locationInfo}>
          <h3>{country_name}</h3>
          <h2>{city_name}</h2>
        </div>
        {renderWeatherIcon(weather_description)}
      </div>
      <div className={styles.weatherBottom}>
        <span className={styles.temperature}>{air_temperature}°C</span>
        <p className={styles.weatherDescription}>{weather_description}</p>
      </div>
    </div>
  );
};

export default ListWeatherCard;
