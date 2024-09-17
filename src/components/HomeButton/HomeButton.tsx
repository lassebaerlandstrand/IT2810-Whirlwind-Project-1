import { IconList } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import styles from './HomeButton.module.css';

const HomeButton = () => {
  return (
    <Link className={styles.a} to="/">
      <IconList className={styles.icon} />
      Go back to list
    </Link>
  );
};

export default HomeButton;
