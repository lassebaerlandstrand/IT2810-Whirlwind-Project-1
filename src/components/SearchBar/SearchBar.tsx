import { IconSearch } from '@tabler/icons-react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  onSearch: (searchQuery: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    onSearch(searchQuery);
  };

  return (
    <search className={styles.searchBarContainer}>
      <span className={styles.searchIcon}>{<IconSearch />}</span>
      <input type="text" placeholder="Search here..." onChange={handleSearch} className={styles.searchInput} />
    </search>
  );
};

export default SearchBar;
