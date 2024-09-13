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
    <div className={styles.searchBarContainer} role="search">
      <span className={styles.searchIcon} data-testid="search-icon">
        {<IconSearch />}
      </span>
      <input type="text" placeholder="Search here..." onChange={handleSearch} className={styles.searchInput} />
    </div>
  );
};

export default SearchBar;
