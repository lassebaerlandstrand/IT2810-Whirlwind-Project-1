import { IconCloudRain, IconWind } from '@tabler/icons-react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import InfoDisplay, { InfoDisplayItem } from './InfoDisplay';

describe('InfoDisplayItem tests', () => {
  it('checks that the component renders properly with basic inputs', () => {
    render(<InfoDisplayItem icon={undefined} infoText={'Rain'} amount={10} unit={'mm'} rotation={0} />);

    expect(screen.getByText('Rain')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('mm')).toBeInTheDocument();
  });

  it('checks that the component loads properly when loading', () => {
    render(<InfoDisplayItem icon={undefined} infoText={''} amount={undefined} unit={''} rotation={undefined} />);

    // Check if amount displays --.- when it lacks info
    expect(screen.getByText('--.-')).toBeInTheDocument();
  });
});

const dummyInfos = [
  {
    icon: <IconWind />,
    infoText: 'Wind (NA)',
    amount: 5,
    unit: 'm/s',
    rotation: 34,
  },

  {
    icon: <IconCloudRain />,
    infoText: 'Rain',
    amount: 4,
    unit: 'mm/h',
    rotation: 0,
  },
];

describe('InfoDisplay tests', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<InfoDisplay infos={dummyInfos} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
