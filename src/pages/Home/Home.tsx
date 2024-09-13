import {useState} from 'react';
import Button from '../../components/Button/Button';
import SortDropDown from '../../components/SortDropDown/SortDropDown';

const Home = () => {
  const [cities] = useState<{name: string}[]>([
    {name: 'Trondheim'},
    {name: 'Oslo'},
    {name: 'Stavanger'},
    {name: 'Ålesund'},
    {name: 'Gjøvik'},
    {name: 'Tønsberg'},
    {name: 'Osen'},
  ]); // Dummy data, to be changed
  const [filteredCities, setFilteredCities] = useState(cities);

  const handleSort = (sortCondition: (a: {name: string}, b: {name: string}) => number) => {
    const sortedData = [...filteredCities].sort(sortCondition);
    setFilteredCities(sortedData);
  };

  return (
    <div>
      <h1>43 °C</h1>
      <h1>🔥😰🔥</h1>
      <Button text="Press me to do absolutely nothing" />
      <SortDropDown />
    </div>
  );
};

export default Home;
