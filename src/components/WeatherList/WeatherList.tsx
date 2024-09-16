import React from 'react';
import { Location } from '../../types/api-types';
import ListWeatherCard from '../ListWeatherCard/ListWeatherCard';
import styles from './WeatherList.module.css';

interface WeatherListProps {
  locations: Location[];
}

const WeatherList: React.FC<WeatherListProps> = ({ locations }) => {
  return (
    <div className={styles.weatherList}>
      {locations.map((location, index) => (
        <ListWeatherCard key={index} location={location} />
      ))}
    </div>
  );
};

export default WeatherList;
