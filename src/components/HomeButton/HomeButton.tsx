import { IconList } from '@tabler/icons-react';
import styles from './HomeButton.module.css';

const HomeButton = () => {
  return (
    <a className={styles.a} href="/">
      <IconList className={styles.icon} />
      Go back to list
    </a>
  );
};

export default HomeButton;
