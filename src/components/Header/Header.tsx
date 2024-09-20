import { Link } from 'react-router-dom';
import logo from '../../assets/Whirlwind_Logo.png';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <Link to="/" className={styles.header}>
        <img src={logo} alt="Whirlwind Logo" className={styles.img} />
        <div>
          <h1>Whirlwind</h1>
          <h2>Weather Forecast</h2>
        </div>
      </Link>
    </header>
  );
};

export default Header;
