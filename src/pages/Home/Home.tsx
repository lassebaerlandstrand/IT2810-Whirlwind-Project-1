import React from 'react';
import Button from '../../components/Button/Button';
import WeatherList from '../../components/WeatherList/WeatherList';

const Home: React.FC = () => {
  // Mock weather data
  const weatherData = [
    {
      city_name: 'Trondheim',
      country_name: 'Norway',
      air_temperature: 20,
      weather_description: 'Softly cold',
    },
    {
      city_name: 'Paris',
      country_name: 'France',
      air_temperature: 6,
      weather_description: 'Clear',
    },
    {
      city_name: 'Barcelona',
      country_name: 'Spain',
      air_temperature: 5,
      weather_description: 'Mostly sunny',
    },
    {
      city_name: 'Madrid',
      country_name: 'Spain',
      air_temperature: -4,
      weather_description: 'Cloudy',
    },
  ];

  return (
    <div>
      <h1>43 °C</h1>
      <h1>🔥😰🔥</h1>
      <Button text="Press me to do absolutely nothing" />

      {/* WeatherList with mock data */}
      <WeatherList weatherData={weatherData} />
    </div>
  );
};

export default Home;
