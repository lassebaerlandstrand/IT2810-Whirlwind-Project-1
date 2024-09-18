import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
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
  data: WeatherInfo | undefined;
}

const Carousel: React.FC<CarouselProps> = ({ currentIndex, data }) => {
  return (
    <>
      <WeatherCard location={LOCATIONS[currentIndex]} data={data} />
      <div className={styles.buttonContainer}>
        <a className={styles.a} href={'/location/' + getPreviousCity(currentIndex).city_name}>
          <IconArrowLeft />
          {getPreviousCity(currentIndex).city_name}
        </a>
        <a className={styles.a} href={'/location/' + getNextCity(currentIndex).city_name}>
          <IconArrowRight />
          {getNextCity(currentIndex).city_name}
        </a>
      </div>
    </>
  );
};

export default Carousel;
