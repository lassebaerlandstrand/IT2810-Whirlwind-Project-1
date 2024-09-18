import { useWeather } from '../../hooks/useWeather';
import { WeatherInfo } from '../../types/api-types';
import LOCATIONS from '../../utils/locations';

//Example on how to use API
function Example() {
  const { data, error, isLoading }: { data: WeatherInfo | null; error: Error | unknown; isLoading: boolean } =
    useWeather(LOCATIONS[0]);

  if (isLoading) return 'Fetching data...';

  if (error) return 'An error has occurred: ' + error;

  if (data)
    return (
      <div>
        <h1>Info Trondheim</h1>
        <table>
          <tbody>
            <tr>
              <td>Temperature</td>
              <td>{data.air_temperature}</td>
            </tr>
            <tr>
              <td>% skyer</td>
              <td>{data.cloud_area_fraction}</td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td>{data.relative_humidity}</td>
            </tr>
            <tr>
              <td>Vind fra hvor</td>
              <td>{data.wind_from_direction}</td>
            </tr>
            <tr>
              <td>Vindhastighet</td>
              <td>{data.wind_speed}</td>
            </tr>
            <tr>
              <td>Lufttrykk</td>
              <td>{data.air_pressure_at_sea_level}</td>
            </tr>
            <tr>
              <td>Regn neste time</td>
              <td>{data.precipitation_amount}mm</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default Example;
