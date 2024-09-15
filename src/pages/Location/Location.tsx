import Carousel from '../../components/Carousel/Carousel';
import styles from './Location.module.css';

const Location = () => {
  return (
    <>
      <Carousel />
      <div className={styles.weatherDetailsContainer}>{/* TODO: Here goes components with details like wind */}</div>
    </>
  );
};

export default Location;
