import { IconCloudFilled, IconCloudRain, IconRotateClockwise, IconSunFilled } from '@tabler/icons-react';
import { Location, WeatherInfo } from '../../types/api-types';
import styles from './WeatherCard.module.css';

const determineWeather = (data: WeatherInfo) => {
  if (data.precipitation_amount > 0) {
    return [<IconCloudRain />, 'Rainy'];
  }
  if (data.cloud_area_fraction > 0.5) {
    return [<IconCloudFilled />, 'Cloudy'];
  }
  return [<IconSunFilled />, 'Sunny'];
};

interface WeatherCardProps {
  location: Location;
  data: WeatherInfo | null;
}
const WeatherCard: React.FC<WeatherCardProps> = ({ location, data }) => {
  return (
    <div className={styles.card}>
      {data ? determineWeather(data)[0] : <IconRotateClockwise className={styles.rotating} />}
      <p className={styles.city}>
        {location.city_name}, {location.country_name}
      </p>
      <p className={styles.temperature}>{data ? data.air_temperature : '---'}°C</p>
      <p>{data ? determineWeather(data)[1] : 'Loading...'}</p>
    </div>
  );
};

export default WeatherCard;
