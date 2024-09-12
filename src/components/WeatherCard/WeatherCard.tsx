import {IconCloudFilled, IconSunFilled} from '@tabler/icons-react';
import styles from './WeatherCard.module.css';

type dummyType = {
  temp: number;
  cloudiness: GLfloat;
  city: string;
  country: string;
  humidity: number;
  pressure: number;
  windStrength: number;
  windDirection: string;
};

const WeatherCard = (data: dummyType) => {
  return (
    <div className={styles.card}>
      {data.cloudiness > 0.5 ? <IconCloudFilled /> : <IconSunFilled />}
      <p className={styles.city}>
        {data.city}, {data.country}
      </p>
      <p className={styles.temperature}>{data.temp}°C</p>
      <p>{'Partially cloudy'}</p>
    </div>
  );
};

export default WeatherCard;
