import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SortDropDown from './SortDropDown';

describe('SortDropDown Component', () => {
  const mockSetSortKey = vi.fn();

  beforeEach(() => {
    sessionStorage.clear();
    vi.resetAllMocks();
  });

  it('should render with the default sorting option from session storage', () => {
    sessionStorage.setItem('SortingOption', 'Country Name');
    render(<SortDropDown setSortKey={mockSetSortKey} />);

    expect(screen.getByText('Country Name')).toBeInTheDocument();
    expect(mockSetSortKey).toHaveBeenCalledWith('Country Name');
  });

  it('should render with the default sorting option when session storage is empty', () => {
    render(<SortDropDown setSortKey={mockSetSortKey} />);

    expect(screen.getByText('City Name')).toBeInTheDocument();
    expect(mockSetSortKey).toHaveBeenCalledWith('City Name');
  });

  it('should save the selected option to session storage and update the sorting method', () => {
    render(<SortDropDown setSortKey={mockSetSortKey} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Country Name'));

    expect(sessionStorage.getItem('SortingOption')).toBe('Country Name');
    expect(mockSetSortKey).toHaveBeenCalledWith('Country Name');
  });

  it('should open and close the dropdown menu when clicked', () => {
    render(<SortDropDown setSortKey={mockSetSortKey} />);

    const button = screen.getByTestId('dropdown-button');

    fireEvent.click(button);
    expect(screen.getByRole('listbox')).toHaveAttribute('data-open', 'true');

    fireEvent.click(button);
    expect(screen.queryByRole('listbox')).toHaveAttribute('data-open', 'false');
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<SortDropDown setSortKey={vi.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
