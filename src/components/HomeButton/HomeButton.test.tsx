import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomeButton from './HomeButton';

describe('HomeButton', () => {
  it('should render correctly', () => {
    const { getByText, getByRole } = render(<HomeButton />);
    
    // Check if the link is rendered with correct text
    const linkElement = getByText(/Go back to list/i);
    expect(linkElement).toBeInTheDocument();
    
    // Check if the link has the correct href attribute
    const anchorElement = getByRole('link');
    expect(anchorElement).toHaveAttribute('href', '/');
    
    // Check if the icon is rendered
    const iconElement = anchorElement.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
  });
});