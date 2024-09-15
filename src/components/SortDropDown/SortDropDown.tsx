import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useState } from 'react';
import { Location } from '../../types/api-types';
import styles from './SortDropDown.module.css';

type DropDownContentProps = {
  open: boolean;
  options: string[];
  onSelected: (option: string) => void;
};

const DropDownContent = ({ open, options, onSelected }: DropDownContentProps) => {
  return (
    <ul className={`${styles.dropDownContent} ${open ? styles.contentOpen : ''}`}>
      {options.map((option) => (
        <li key={option} className={styles.dropDownItem} onClick={() => onSelected(option)}>
          {option}
        </li>
      ))}
    </ul>
  );
};

type DropDownButtonProps = {
  open: boolean;
  toggleOpen: () => void;
  selectedOption: string;
};

const DropDownButton = ({ open, toggleOpen, selectedOption }: DropDownButtonProps) => {
  return (
    <button className={`${styles.dropDownButton} ${open ? styles.buttonOpen : ''}`} onClick={toggleOpen}>
      {selectedOption} <span className={styles.iconSpan}>{open ? <IconChevronUp /> : <IconChevronDown />}</span>
    </button>
  );
};

type DropDownProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

/** General drop-down component */
export const DropDown = ({ selectedOption, options, setSelectedOption }: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);

  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
  };

  const optionsLabels = options.filter((option) => option !== selectedOption);

  return (
    <menu className={styles.container}>
      <DropDownButton open={open} toggleOpen={toggleOpen} selectedOption={selectedOption} />
      <DropDownContent open={open} options={optionsLabels} onSelected={updateSelectedOption} />
    </menu>
  );
};

type OptionsType = {
  [key: string]: (a: Location, b: Location) => number;
};

// TODO: Add more sorting options
const options: OptionsType = {
  Alphabetically: (a: Location, b: Location) => a.city_name.localeCompare(b.city_name),
  Random: () => Math.random() - 0.5,
  Random2: () => Math.random() - 0.5,
};

type SortDropDownProps = {
  onSort: (sortCondition: (a: Location, b: Location) => number) => void;
};

/** Specialized drop-down with sorting in mind */
const SortDropDown = ({ onSort }: SortDropDownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(Object.keys(options)[0]); // TODO: Use sessionstorage
  const optionList = Object.keys(options);

  const updateSelectedOption = (option: string) => {
    const sortingMethod = options[option];
    onSort(sortingMethod);
    setSelectedOption(option);
  };

  return <DropDown options={optionList} selectedOption={selectedOption} setSelectedOption={updateSelectedOption} />;
};

export default SortDropDown;
