import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DropDown } from './DropDown';

describe('DropDown Component', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const label = 'Sort by:';

  it('should render with the correct default option', () => {
    const setSelectedOptionMock = vi.fn();
    render(
      <DropDown selectedOption="Option 1" options={options} setSelectedOption={setSelectedOptionMock} label={label} />,
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });

  it('should open and close the dropdown when clicked', () => {
    const setSelectedOptionMock = vi.fn();
    render(
      <DropDown selectedOption="Option 1" options={options} setSelectedOption={setSelectedOptionMock} label={label} />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should change the selected option when an item is clicked', () => {
    const setSelectedOptionMock = vi.fn();
    render(
      <DropDown selectedOption="Option 1" options={options} setSelectedOption={setSelectedOptionMock} label={label} />,
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 2'));

    expect(setSelectedOptionMock).toHaveBeenCalledWith('Option 2');
  });

  it('should close the dropdown when clicking outside of it', () => {
    const setSelectedOptionMock = vi.fn();
    render(
      <DropDown selectedOption="Option 1" options={options} setSelectedOption={setSelectedOptionMock} label={label} />,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <DropDown selectedOption="Option 1" options={options} setSelectedOption={vi.fn()} label={label} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
