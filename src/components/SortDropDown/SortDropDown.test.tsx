import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { Location } from '../../types/api-types';
import SortDropDown, { options } from './SortDropDown';

const dummyData: Location[] = [
  { city_name: 'New York', country_name: 'USA', latitude: '40.7128', longitude: '-74.006' },
  { city_name: 'London', country_name: 'UK', latitude: '51.5074', longitude: '-0.1278' },
  { city_name: 'Tokyo', country_name: 'Japan', latitude: '35.6895', longitude: '139.6917' },
];

const optionsKeys = Object.keys(options);

describe('SortDropDown Component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should render correctly with default sorting option', () => {
    const onSortMock = vi.fn();
    render(<SortDropDown setSortCondition={onSortMock} />);

    // Default sorting option is alphabetically
    const button = screen.getByRole('button', { name: 'Alphabetically' });
    expect(button).toBeInTheDocument();

    // Dropdown is closed by default
    const dropdown = screen.getByTestId('dropdown-content');
    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
  });

  it('should open and close the dropdown when the button is clicked', () => {
    const onSortMock = vi.fn();
    render(<SortDropDown setSortCondition={onSortMock} />);

    const button = screen.getByRole('button', { name: 'Alphabetically' });

    fireEvent.click(button);
    expect(screen.getByTestId('dropdown-content')).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(button);
    expect(screen.getByTestId('dropdown-content')).toHaveAttribute('aria-expanded', 'false');
  });

  it('should save the selected sorting method in session storage', () => {
    expect(sessionStorage.getItem('SortingOption')).toBe(null);

    const onSortMock = vi.fn();
    render(<SortDropDown setSortCondition={onSortMock} />);

    const button = screen.getByTestId('dropdown-button');
    expect(button).not.toHaveTextContent(optionsKeys[1]);

    fireEvent.click(button);

    const otherOption = screen.getByText(optionsKeys[1]);
    fireEvent.click(otherOption);

    fireEvent.click(button);

    cleanup();
    render(<SortDropDown setSortCondition={onSortMock} />);

    // Expect the random option to be selected
    expect(sessionStorage.getItem('SortingOption')).toBe(optionsKeys[1]);
    const newButton = screen.getByTestId('dropdown-button');
    expect(newButton).toHaveTextContent(optionsKeys[1]);
    expect(newButton).toBeInTheDocument();
  });
});

const SortDropDownWithState = () => {
  const [cities] = useState<Location[]>(dummyData);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [sortCondition, setSortCondition] = useState<((a: Location, b: Location) => number) | null>(null);

  useEffect(() => {
    if (sortCondition) {
      setFilteredCities((prevCities) => [...prevCities].sort(sortCondition));
    }
  }, [sortCondition]);

  return (
    <>
      <SortDropDown setSortCondition={setSortCondition} />
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

describe('SortDropDown should sort based on selection', () => {
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

    const button = screen.getByTestId('dropdown-button');
    fireEvent.click(button);

    const countryOption = screen.getByText('Country');
    fireEvent.click(countryOption);

    // Expect all cities to be in country order
    const newCities = screen.getAllByTestId('cities');
    expect(newCities[0]).toHaveTextContent('Tokyo');
    expect(newCities[1]).toHaveTextContent('London');
    expect(newCities[2]).toHaveTextContent('New York');
  });
});
