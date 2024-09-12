import {IconCloudFilled, IconSunFilled} from '@tabler/icons-react';
import {Location} from '../../types/api-types';
import styles from './WeatherCard.module.css';
import getWeatherInfo from '../../utils/WeatherUtils';

const WeatherCard = (location: Location) => {
  const data = getWeatherInfo(location);
  return (
    <div className={styles.card}>
      {data.cloud_area_fraction > 0.5 ? <IconCloudFilled /> : <IconSunFilled />}
      <p className={styles.city}>
        {location.city_name}, {location.country_name}
      </p>
      <p className={styles.temperature}>{data.air_temperature}°C</p>
      <p>{data.cloud_area_fraction > 0.5 ? 'Cloudy' : 'Sunny'}</p>
    </div>
  );
};

export default WeatherCard;
