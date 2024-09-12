import {useWeather} from '../../hooks/useWeather';

function Example() {
  var lon: string = '10.42';
  var lat: string = '63.45';

  const {data, error, isLoading} = useWeather(lat, lon);

  if (isLoading) return 'Fetching data...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>Info Trondheim</h1>
      <table>
        <tr>
          <th>Temperature</th>
          <td>{data.air_temperature}</td>
        </tr>
        <tr>
          <th>% skyer</th>
          <td>{data.cloud_area_fraction}</td>
        </tr>
        <tr>
          <th>Humidity</th>
          <td>{data.relative_humidity}</td>
        </tr>
        <tr>
          <th>Vind fra hvor</th>
          <td>{data.wind_from_direction}</td>
        </tr>
        <tr>
          <th>Vindhastighet</th>
          <td>{data.wind_speed}</td>
        </tr>
        <tr>
          <th>Lufttrykk</th>
          <td>{data.air_pressure_at_sea_level}</td>
        </tr>
      </table>
    </div>
  );
}

export default Example;
