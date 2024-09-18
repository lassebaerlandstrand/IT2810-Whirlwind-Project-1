import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import InfoDisplay from './InfoDisplay';

describe('Infodisplay tests', () => {
  it('checks that the component renders properly with basic inputs', () => {
    render(<InfoDisplay icon={undefined} infoText={'Rain'} amount={10} unit={'mm'} rotation={0} />);

    expect(screen.getByText('Rain')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('mm')).toBeInTheDocument();
  });

  it('checks that the component loads properly when loading', () => {
    render(<InfoDisplay icon={undefined} infoText={''} amount={undefined} unit={''} rotation={undefined} />);

    // Check if amount displays --.- when it lacks info
    expect(screen.getByText('--.-')).toBeInTheDocument();
  });
});
