import { IconCloudRain, IconWind } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import Header from '../../components/Header/Header';
import HomeButton from '../../components/HomeButton/HomeButton';
import InfoDisplay from '../../components/InfoDisplay/InfoDisplay';
import { useWeather } from '../../hooks/useWeather';
import { WeatherInfo } from '../../types/api-types';
import LOCATIONS from '../../utils/locations';
import styles from './Location.module.css';

const translateDirection = (windDirection: number) => {
  return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(((windDirection + 22.5) % 360) / 45)];
};

const updateInfos = (data: WeatherInfo | null) => {
  return [
    {
      icon: <IconWind />,
      infoText: 'Wind (' + (data ? translateDirection(data.wind_from_direction) : 'NA') + ')',
      amount: data?.wind_speed,
      unit: 'm/s',
      rotation: data ? data.wind_from_direction + 90 : 0,
    },

    {
      icon: <IconCloudRain />,
      infoText: 'Precipitation',
      amount: data?.precipitation_amount,
      unit: 'mm/h',
      rotation: 0,
    },
  ];
};

const Location = () => {
  const { locationName } = useParams();
  const currentIndex = LOCATIONS.findIndex(
    (location) => location.city_name?.toLowerCase() === locationName?.toLowerCase(),
  );

  const { data, isLoading, error } = useWeather(LOCATIONS[currentIndex]);

  const [infos, setInfos] = useState(updateInfos(data));

  useEffect(() => {
    setInfos(updateInfos(data));
  }, [data]);

  return (
    <main className={styles.locationContainer}>
      <Header />
      <HomeButton />
      {!isLoading && error ? (
        <>
          <p className={styles.error}>{error.name}: Something went wrong! Try reloading the page.</p>
          {console.error(error)}
        </>
      ) : (
        <>
          <Carousel currentIndex={currentIndex} data={data} />
          <InfoDisplay infos={infos} />
        </>
      )}
    </main>
  );
};

export default Location;
