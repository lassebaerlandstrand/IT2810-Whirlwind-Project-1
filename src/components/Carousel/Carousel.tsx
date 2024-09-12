import {IconArrowLeft, IconArrowRight} from '@tabler/icons-react';
import {Location} from '../../types/api-types';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './Carousel.module.css';

const getPreviousCity = (currentIndex: number, locations: Location[]) => {
  if (currentIndex === 0) {
    return locations[locations.length - 1];
  }
  return locations[currentIndex - 1];
};

const getNextCity = (currentIndex: number, locations: Location[]) => {
  if (currentIndex === locations.length - 1) {
    return locations[0];
  }
  return locations[currentIndex + 1];
};

const Carousel = (locations: Location[], currentIndex: number) => {
  return (
    <>
      <WeatherCard {...locations[currentIndex]} />
      <div className={styles.buttonContainer}>
        <a className={styles.a} href={'/' + getPreviousCity(currentIndex, locations).city_name}>
          <IconArrowLeft />
          {getPreviousCity(currentIndex, locations).city_name}
        </a>
        <a className={styles.a} href={'/' + getNextCity(currentIndex, locations).city_name}>
          <IconArrowRight />
          {getNextCity(currentIndex, locations).city_name}
        </a>
      </div>
    </>
  );
};

export default Carousel;
