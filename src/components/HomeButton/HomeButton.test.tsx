import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeButton from './HomeButton';

describe('HomeButton', () => {
  it('should render the HomeButton component', () => {
    const { getByText } = render(
      <Router>
        <HomeButton />
      </Router>,
    );
    expect(getByText('Go back to list')).toBeInTheDocument();
  });

  it('should have the correct link', () => {
    const { getByRole } = render(
      <Router>
        <HomeButton />
      </Router>,
    );
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should render the IconList component', () => {
    const { container } = render(
      <Router>
        <HomeButton />
      </Router>,
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
