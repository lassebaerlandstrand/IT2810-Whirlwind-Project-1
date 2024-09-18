import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <Link to="/" className={styles.header}>
        <img src="src\assets\Whirlwind Logo.png" alt="Whirlwind Logo" className={styles.img} />
        <div>
          <h1>Whirlwind</h1>
          <h6>Weather Forecast</h6>
        </div>
      </Link>
    </header>
  );
};

export default Header;
