import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Location } from '../../types/api-types';
import styles from './SortDropDown.module.css';
import { options } from './SortingOptions';

type DropDownContentProps = {
  open: boolean;
  options: string[];
  onSelected: (option: string) => void;
};

const DropDownContent = ({ open, options, onSelected }: DropDownContentProps) => {
  return (
    <ul
      className={`${styles.dropDownContent} ${open ? styles.contentOpen : ''}`}
      data-testid="dropdown-content"
      aria-expanded={open}
      aria-controls="dropdown-button"
    >
      {options.map((option) => (
        <li key={option} className={styles.dropDownItem} onClick={() => onSelected(option)} role="button">
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
    <button
      className={`${styles.dropDownButton} ${open ? styles.buttonOpen : ''}`}
      onClick={toggleOpen}
      aria-describedby="dropdown-button"
      data-testid="dropdown-button"
    >
      {selectedOption} <span className={styles.iconSpan}>{open ? <IconChevronUp /> : <IconChevronDown />}</span>
    </button>
  );
};

type DropDownProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

/** General drop-down component. Could also extract this to its own separate component */
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

// TODO: Add more sorting options
type SortDropDownProps = {
  setSortCondition: (sortCondition: () => (a: Location, b: Location) => number) => void;
};

/** Specialized drop-down with sorting in mind */
const SortDropDown = ({ setSortCondition }: SortDropDownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    () => sessionStorage.getItem('SortingOption') || Object.keys(options)[0],
  );

  useEffect(() => {
    sessionStorage.setItem('SortingOption', selectedOption);
    const sortingMethod = options[selectedOption];
    setSortCondition(() => sortingMethod);
  }, [selectedOption, setSortCondition]);

  const optionList = Object.keys(options);

  return <DropDown options={optionList} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />;
};

export default SortDropDown;
