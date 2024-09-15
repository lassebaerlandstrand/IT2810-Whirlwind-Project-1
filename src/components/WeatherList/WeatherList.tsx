import React from 'react';
import ListWeatherCard from '../ListWeatherCard/ListWeatherCard';
import styles from './WeatherList.module.css';

interface WeatherData {
  city_name: string;
  country_name: string;
  air_temperature: number;
  weather_description: string;
}

interface WeatherListProps {
  weatherData: WeatherData[];
}

const WeatherList: React.FC<WeatherListProps> = ({ weatherData }) => {
  return (
    <div className={styles.weatherList}>
      {weatherData.map((weather, index) => (
        <ListWeatherCard
          key={index}
          city_name={weather.city_name}
          country_name={weather.country_name}
          air_temperature={weather.air_temperature}
          weather_description={weather.weather_description}
        />
      ))}
    </div>
  );
};

export default WeatherList;
