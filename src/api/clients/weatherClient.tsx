export const fetchWeather = async (lat: string, lon: string) => {
  const response = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + lat + '&lon=' + lon);

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data about lat=${lat} and lon=${lon}`);
  }
  return response.json();
};
