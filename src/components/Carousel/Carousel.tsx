import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { WeatherInfo } from '../../types/api-types';
import LOCATIONS from '../../utils/locations';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './Carousel.module.css';

const getPreviousCity = (currentIndex: number) => {
  if (currentIndex === 0) {
    return LOCATIONS[LOCATIONS.length - 1];
  }
  return LOCATIONS[currentIndex - 1];
};

const getNextCity = (currentIndex: number) => {
  if (currentIndex === LOCATIONS.length - 1) {
    return LOCATIONS[0];
  }
  return LOCATIONS[currentIndex + 1];
};

interface CarouselProps {
  currentIndex: number;
  data: WeatherInfo | null;
}

const Carousel: React.FC<CarouselProps> = ({ currentIndex, data }) => {
  return (
    <>
      <WeatherCard location={LOCATIONS[currentIndex]} data={data} />
      <div className={styles.buttonContainer}>
        <Link
          className={`${styles.link} ${styles.leftLink}`}
          to={'/location/' + getPreviousCity(currentIndex).city_name}
          aria-label={`Previous city: ${getPreviousCity(currentIndex).city_name}`}
        >
          <IconArrowLeft className={styles.svg} />
          <h3>{getPreviousCity(currentIndex).city_name}</h3>
        </Link>
        <Link
          className={`${styles.link} ${styles.rightLink}`}
          to={'/location/' + getNextCity(currentIndex).city_name}
          aria-label={`Next city: ${getNextCity(currentIndex).city_name}`}
        >
          <IconArrowRight className={styles.svg} />
          <h3>{getNextCity(currentIndex).city_name}</h3>
        </Link>
      </div>
    </>
  );
};

export default Carousel;
