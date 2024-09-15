import {IconArrowLeft, IconArrowRight} from '@tabler/icons-react';
import {useParams} from 'react-router-dom';
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

const Carousel = () => {
  const {locationName} = useParams();
  const currentIndex = LOCATIONS.findIndex((location) => location.city_name === locationName);

  return (
    <>
      <WeatherCard {...LOCATIONS[currentIndex]} />
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
