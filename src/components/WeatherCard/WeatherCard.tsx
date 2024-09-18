import { IconCloudFilled, IconRotateClockwise, IconSunFilled } from '@tabler/icons-react';
import { Location, WeatherInfo } from '../../types/api-types';
import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  location: Location;
  data: WeatherInfo | null;
}
const WeatherCard: React.FC<WeatherCardProps> = ({ location, data }) => {
  return (
    <div className={styles.card}>
      {data ? (
        data.cloud_area_fraction > 0.5 ? (
          <IconCloudFilled />
        ) : (
          <IconSunFilled />
        )
      ) : (
        <IconRotateClockwise className={styles.rotating} />
      )}
      <p className={styles.city}>
        {location.city_name}, {location.country_name}
      </p>
      <p className={styles.temperature}>{data ? data.air_temperature : '---'}°C</p>
      <p>{data ? (data.cloud_area_fraction > 0.5 ? 'Cloudy' : 'Sunny') : 'Loading...'}</p>
    </div>
  );
};

export default WeatherCard;
