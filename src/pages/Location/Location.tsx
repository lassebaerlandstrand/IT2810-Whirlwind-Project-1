import Carousel from '../../components/Carousel/Carousel';
import HomeButton from '../../components/HomeButton/HomeButton';
import styles from './Location.module.css';

const Location = () => {
  return (
    <>
      <HomeButton />
      <Carousel />
      <div className={styles.weatherDetailsContainer}>{/* TODO: Here goes components with details like wind */}</div>
    </>
  );
};

export default Location;
