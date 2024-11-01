import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Location, WeatherInfo } from '../../types/api-types';
import LOCATIONS from '../../utils/locations';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './Carousel.module.css';

interface CarouselProps {
  locations: Location[];
  currentIndex: number;
  data: WeatherInfo | null;
}

const Carousel: React.FC<CarouselProps> = ({ locations, currentIndex, data }) => {
  const previousCityName = locations[(currentIndex - 1) % locations.length].city_name;
  const nextCityName = locations[(currentIndex + 1) % locations.length].city_name;

  return (
    <>
      <WeatherCard location={LOCATIONS[currentIndex]} data={data} />
      <div className={styles.buttonContainer}>
        <Link
          className={`${styles.link} ${styles.leftLink}`}
          to={'/location/' + previousCityName}
          aria-label={`Previous city: ${previousCityName}`}
        >
          <IconArrowLeft className={styles.svg} />
          <h3>{previousCityName}</h3>
        </Link>
        <Link
          className={`${styles.link} ${styles.rightLink}`}
          to={'/location/' + nextCityName}
          aria-label={`Next city: ${nextCityName}`}
        >
          <IconArrowRight className={styles.svg} />
          <h3>{nextCityName}</h3>
        </Link>
      </div>
    </>
  );
};

export default Carousel;
