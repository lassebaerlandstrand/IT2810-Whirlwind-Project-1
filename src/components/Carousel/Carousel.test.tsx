import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LOCATIONS from '../../utils/locations';
import Carousel from './Carousel';

describe('Carousel', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/location/' + LOCATIONS[0].city_name]}>
        <Routes>
          <Route
            path="/location/:locationName"
            element={
              <Carousel
                locations={LOCATIONS}
                currentIndex={0}
                data={{
                  air_pressure_at_sea_level: 0,
                  air_temperature: 25,
                  cloud_area_fraction: 0.3,
                  relative_humidity: 0,
                  wind_from_direction: 0,
                  wind_speed: 0,
                  precipitation_amount: 0,
                }}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
