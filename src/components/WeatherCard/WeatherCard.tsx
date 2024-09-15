import { IconCloudFilled, IconCloudRain, IconRotateClockwise, IconSunFilled } from '@tabler/icons-react';
import { useWeather } from '../../hooks/useWeather';
import { Location, WeatherInfo } from '../../types/api-types';
import styles from './WeatherCard.module.css';

const getWeatherEmoji = (data: WeatherInfo) => {
  if (data.precipitation_amount > 0) {
    return [<IconCloudRain />, 'Rainy'];
  }
  if (data.cloud_area_fraction > 0.5) {
    return [<IconCloudFilled />, 'Cloudy'];
  }
  return [<IconSunFilled />, 'Sunny'];
};

const WeatherCard = (location: Location) => {
  const { data } = useWeather(location);
  return (
    <div className={styles.card}>
      {data ? getWeatherEmoji(data)[0] : <IconRotateClockwise className={styles.rotating} />}
      <p className={styles.city}>
        {location.city_name}, {location.country_name}
      </p>
      <p className={styles.temperature}>{data ? data.air_temperature : '---'}°C</p>
      <p>{data ? getWeatherEmoji(data)[1] : 'Loading...'}</p>
    </div>
  );
};

export default WeatherCard;
