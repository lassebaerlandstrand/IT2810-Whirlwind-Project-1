import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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
    const button = screen.getByRole('button', { name: 'Alphabetically' });
    expect(button).toBeInTheDocument();

    // Dropdown is closed by default
    const dropdown = screen.getByTestId('dropdown-content');
    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
  });

  it('should open and close the dropdown when the button is clicked', () => {
    const onSortMock = vi.fn();
    render(<SortDropDown onSort={onSortMock} />);

    const button = screen.getByRole('button', { name: 'Alphabetically' });

    fireEvent.click(button);
    expect(screen.getByTestId('dropdown-content')).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(button);
    expect(screen.getByTestId('dropdown-content')).toHaveAttribute('aria-expanded', 'false');
  });

  it('should save the selected sorting method in session storage', () => {
    const onSortMock = vi.fn();
    render(<SortDropDown onSort={onSortMock} />);

    const button = screen.getByTestId('dropdown-button');
    expect(button).not.toHaveTextContent('Random');

    fireEvent.click(button);

    const randomOption = screen.getByText('Random');
    fireEvent.click(randomOption);

    fireEvent.click(button);

    cleanup();
    render(<SortDropDown onSort={onSortMock} />);

    // Expect the random option to be selected
    expect(sessionStorage.getItem('SortingOption')).toBe('Random');
    const newButton = screen.getByTestId('dropdown-button');
    expect(newButton).toHaveTextContent('Random');
    expect(newButton).toBeInTheDocument();
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
