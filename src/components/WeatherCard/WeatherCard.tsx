import { IconCloudFilled, IconCloudRain, IconRotateClockwise, IconSunFilled } from '@tabler/icons-react';
import { Location, WeatherInfo } from '../../types/api-types';
import styles from './WeatherCard.module.css';

const determineWeather = (data: WeatherInfo) => {
  if (data.precipitation_amount > 0) {
    return [<IconCloudRain className={styles.svg} />, 'Rainy'];
  }
  if (data.cloud_area_fraction > 0.5) {
    return [<IconCloudFilled className={styles.svg} />, 'Cloudy'];
  }
  return [<IconSunFilled className={styles.svg} />, 'Sunny'];
};

interface WeatherCardProps {
  location: Location;
  data: WeatherInfo | null;
}
const WeatherCard: React.FC<WeatherCardProps> = ({ location, data }) => {
  return (
    <div className={styles.card}>
      {data ? determineWeather(data)[0] : <IconRotateClockwise className={`${styles.rotating} ${styles.svg}`} />}
      <div className={styles.informationContainer}>
        <div className={styles.locationContainer}>
          <h3>{location.city_name}</h3>
          <span className={styles.commaSeparator}>, </span>
          <h4>{location.country_name}</h4>
        </div>
        <p className={styles.temperature}>{data ? data.air_temperature : '---'}°C</p>
        <p>{data ? determineWeather(data)[1] : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
