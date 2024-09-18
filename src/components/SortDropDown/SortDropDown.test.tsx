import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SortDropDown from './SortDropDown';
import { options } from './SortingOptions';

describe('SortDropDown Component', () => {
  const mockSetSortCondition = vi.fn();

  beforeEach(() => {
    sessionStorage.clear();
    vi.resetAllMocks();
  });

  it('should render with the default sorting option from session storage', () => {
    sessionStorage.setItem('SortingOption', 'Country Name');
    render(<SortDropDown setSortCondition={mockSetSortCondition} />);

    expect(screen.getByText('Country Name')).toBeInTheDocument();
    expect(mockSetSortCondition).toHaveBeenCalledWith(options['Country Name']);
  });

  it('should render with the default sorting option when session storage is empty', () => {
    render(<SortDropDown setSortCondition={mockSetSortCondition} />);

    expect(screen.getByText('City Name')).toBeInTheDocument();
    expect(mockSetSortCondition).toHaveBeenCalledWith(options['City Name']);
  });

  it('should save the selected option to session storage and update the sorting method', () => {
    render(<SortDropDown setSortCondition={mockSetSortCondition} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Country Name'));

    expect(sessionStorage.getItem('SortingOption')).toBe('Country Name');
    expect(mockSetSortCondition).toHaveBeenCalledWith(options['Country Name']);
  });

  it('should open and close the dropdown menu when clicked', () => {
    render(<SortDropDown setSortCondition={mockSetSortCondition} />);

    const button = screen.getByRole('button', { name: 'City Name' });

    fireEvent.click(button);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<SortDropDown setSortCondition={vi.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
