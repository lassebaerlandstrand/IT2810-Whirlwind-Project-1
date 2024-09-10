import {useState} from 'react';
import Button from '../../components/Button/Button';
import SearchBar from '../../components/SearchBar/Searchbar';

const Home = () => {
  const [cities, setCities] = useState<{name: string}[]>([
    {name: 'Trondheim'},
    {name: 'Oslo'},
    {name: 'Stavanger'},
    {name: 'Ålesund'},
    {name: 'Gjøvik'},
    {name: 'Tønsberg'},
    {name: 'Osen'},
  ]); // Dummy data, to be changed
  const [filteredCities, setFilteredCities] = useState(cities);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery === '') {
      setFilteredCities(cities);
    } else {
      const filteredData = cities.filter((city) => city.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredCities(filteredData);
    }
  };

  return (
    <div>
      <h1>43 °C</h1>
      <h1>🔥😰🔥</h1>
      <Button text="Press me to do absolutely nothing" />
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredCities.map((city, index) => (
          <li key={index}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
