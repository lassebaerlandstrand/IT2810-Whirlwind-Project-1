import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { Location } from '../../types/api-types';
import SearchBar from './SearchBar';

const dummyData: Location[] = [
  { city_name: 'New York', country_name: 'USA', latitude: 40.7128, longitude: -74.006 },
  { city_name: 'London', country_name: 'UK', latitude: 51.5074, longitude: -0.1278 },
  { city_name: 'Tokyo', country_name: 'Japan', latitude: 35.6895, longitude: 139.6917 },
];

describe('SearchBar Component', () => {
  it('should render the search input and icon', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText('Search here...');
    const searchIcon = screen.getByTestId('search-icon');

    expect(searchInput).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it('should call onSearch with the correct value when input changes', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const searchInput = screen.getByPlaceholderText('Search here...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('should call onSearch with an empty string when input is cleared', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const searchInput = screen.getByPlaceholderText('Search here...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.change(searchInput, { target: { value: '' } });

    expect(onSearchMock).toHaveBeenCalledWith('');
  });
});

const SearchBarWithState = ({ onSearch }: { onSearch: (searchQuery: string) => void }) => {
  const [cities] = useState<Location[]>(dummyData);
  const [filteredCities, setFilteredCities] = useState(cities);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery === '') {
      setFilteredCities(cities);
    } else {
      const filteredData = cities.filter((city) => city.city_name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredCities(filteredData);
    }
    onSearch(searchQuery);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ul data-testid="filtered-cities">
        {filteredCities.map((city, index) => (
          <li key={index}>{city.city_name}</li>
        ))}
      </ul>
    </>
  );
};

describe('SearchBar Component with filtered cities', () => {
  it('should filter the cities based on the search query', () => {
    render(<SearchBarWithState onSearch={() => {}} />);

    const searchInput = screen.getByPlaceholderText('Search here...');
    fireEvent.change(searchInput, { target: { value: 'New York' } });

    const filteredCities = screen.getByTestId('filtered-cities'); // Assuming you have a test ID for the filtered cities list
    expect(filteredCities).toHaveTextContent('New York');
    expect(filteredCities).not.toHaveTextContent('London');
    expect(filteredCities).not.toHaveTextContent('Tokyo');
  });
});
