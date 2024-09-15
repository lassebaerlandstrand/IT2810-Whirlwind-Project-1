import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { Location } from '../../types/api-types';
import SortDropDown from './SortDropDown';

const dummyData: Location[] = [
  { city_name: 'New York', country_name: 'USA', latitude: '40.7128', longitude: '-74.006' },
  { city_name: 'London', country_name: 'UK', latitude: '51.5074', longitude: '-0.1278' },
  { city_name: 'Tokyo', country_name: 'Japan', latitude: '35.6895', longitude: '139.6917' },
];

describe('SortDropDown Component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should render correctly with default sorting option', () => {
    const onSortMock = vi.fn();
    render(<SortDropDown onSort={onSortMock} />);

    // Default sorting option is alphabetically
    const button = screen.getByRole('button', { name: /Alphabetically/i });
    expect(button).toBeInTheDocument();

    // Dropdown is closed by default
    const dropdown = screen.getByTestId('dropdown-content');
    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
  });

  it('should open and close the dropdown when the button is clicked', () => {
    const onSortMock = vi.fn();
    render(<SortDropDown onSort={onSortMock} />);

    const button = screen.getByRole('button', { name: /Alphabetically/i });

    // Click to open
    fireEvent.click(button);
    expect(screen.getByTestId('dropdown-content')).toHaveAttribute('aria-expanded', 'true');

    // Click again to close
    fireEvent.click(button);
    expect(screen.getByTestId('dropdown-content')).toHaveAttribute('aria-expanded', 'false');
  });
});

const SortDropDownWithState = () => {
  const [cities] = useState<Location[]>(dummyData);
  const [filteredCities, setFilteredCities] = useState(cities);

  const handleSort = (sortCondition: (a: Location, b: Location) => number) => {
    const sortedData = [...filteredCities].sort(sortCondition);
    setFilteredCities(sortedData);
  };

  return (
    <>
      <SortDropDown onSort={handleSort} />
      <ul data-testid="filtered-cities">
        {filteredCities.map((city, index) => (
          <li key={index} data-testid="cities">
            {city.city_name}
          </li>
        ))}
      </ul>
    </>
  );
};

describe('SearchBar Component with filtered cities', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should filter the cities based on the search query', () => {
    render(<SortDropDownWithState />);

    // Expect all cities to be in alphabetical order
    const cities = screen.getAllByTestId('cities');
    expect(cities[0]).toHaveTextContent('London');
    expect(cities[1]).toHaveTextContent('New York');
    expect(cities[2]).toHaveTextContent('Tokyo');

    // TODO: Add more tests when we add more sorting options
  });
});
