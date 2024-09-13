import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { Location } from '../../types/api-types';
import styles from './SortDropDown.module.css';

const options = {
  Name: (list: Location[]) => list.sort((a, b) => a.city_name.localeCompare(b.city_name)),
};

type DropDownContentProps = {
  open: boolean;
};

const DropDownContent = ({ open }: DropDownContentProps) => {
  return <p>Hello World</p>;
};

type DropDownButtonProps = {
  open: boolean;
  toggleOpen: () => void;
  selectedOption: string;
};

const DropDownButton = ({ open, selectedOption }: DropDownButtonProps) => {
  return (
    <button className={styles.dropDownButton}>
      {selectedOption} <span className={styles.iconSpan}>{<IconChevronDown />}</span>
    </button>
  );
};

const SortDropDown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <menu className={styles.container}>
      <DropDownButton open={open} toggleOpen={toggleOpen} selectedOption="Name" />
      <DropDownContent open={open} />
    </menu>
  );
};

export default SortDropDown;
