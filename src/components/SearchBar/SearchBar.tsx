import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  onSearch: (searchQuery: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(() => sessionStorage.getItem('SearchQuery') || '');

  useEffect(() => {
    sessionStorage.setItem('SearchQuery', searchQuery);
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.searchBarContainer} role="search">
      <span className={styles.searchIcon} data-testid="search-icon">
        {<IconSearch />}
      </span>
      <input
        type="text"
        placeholder="Search here..."
        value={searchQuery}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
