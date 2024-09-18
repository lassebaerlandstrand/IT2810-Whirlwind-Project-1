import { IconCloudRain, IconWind } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
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
      infoText: 'Rain',
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

  const { data, error } = useWeather(LOCATIONS[currentIndex]);

  const [infos, setInfos] = useState(updateInfos(data));

  if (error) return <p>Error fetching API data</p>;

  useEffect(() => {
    setInfos(updateInfos(data));
  }, [data]);

  return (
    <>
      <HomeButton />
      <Carousel currentIndex={currentIndex} data={data} />
      <ul className={styles.weatherDetailsContainer}>
        {infos.map((item, index) => (
          <li key={index}>
            <InfoDisplay
              icon={item.icon}
              infoText={item.infoText}
              amount={item.amount}
              unit={item.unit}
              rotation={item.rotation}
              key={index}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Location;
