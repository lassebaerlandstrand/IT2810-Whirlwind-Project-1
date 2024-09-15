import React, { useState } from 'react';
import WeatherList from '../../components/WeatherList/WeatherList';

interface WeatherData {
  city_name: string;
  country_name: string;
  air_temperature: number;
  weather_description: string;
}

const Home: React.FC = () => {
  const [weatherData] = useState<WeatherData[]>([
    { city_name: 'Trondheim', country_name: 'Norway', air_temperature: 20, weather_description: 'Thunder' },
    { city_name: 'Paris', country_name: 'France', air_temperature: 6, weather_description: 'Clear' },
    { city_name: 'Barcelona', country_name: 'Spain', air_temperature: 5, weather_description: 'Mostly sunny' },
    { city_name: 'Madrid', country_name: 'Spain', air_temperature: -4, weather_description: 'Cloudy' },
  ]);

  return (
    <div>
      <h2>Favorite</h2>
      <div>
        <h3>Trondheim</h3>
        <p>Thunder</p>
        <p>20°C</p>
      </div>
      <h2>Around the world</h2>
      <WeatherList weatherData={weatherData} />
    </div>
  );
};

export default Home;
