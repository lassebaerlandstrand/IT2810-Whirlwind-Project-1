import {IconCloudFilled, IconSunFilled} from '@tabler/icons-react';
import {Location} from '../../types/api-types';
import styles from './WeatherCard.module.css';

const WeatherCard = (location: Location) => {
  const data = getWeatherInfo(location);
  return (
    <div className={styles.card}>
      {data.cloud_area_fraction > 0.5 ? <IconCloudFilled /> : <IconSunFilled />}
      <p className={styles.city}>
        {data.city}, {data.country}
      </p>
      <p className={styles.temperature}>{data.air_temperature}°C</p>
      <p>{'Partially cloudy'}</p>
    </div>
  );
};

export default WeatherCard;
