import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import styles from './DropDown.module.css';

type DropDownListProps = {
  open: boolean;
  options: string[];
  onSelected: (option: string) => void;
};

const DropDownList = ({ open, options, onSelected }: DropDownListProps) => {
  return (
    open && (
      <ul
        className={`${styles.dropDownList} ${open ? styles.listOpen : ''}`}
        aria-expanded={open}
        aria-controls="dropdown-button"
        role="listbox"
      >
        {options.map((option) => (
          <li key={option} className={styles.dropDownItem} onClick={() => onSelected(option)} role="option">
            {option}
          </li>
        ))}
      </ul>
    )
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
      aria-expanded={open}
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
  label: string;
};

const DropDown = ({ selectedOption, options, setSelectedOption, label }: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  const handleSelectedOption = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <menu className={styles.container} ref={dropDownRef}>
      <label className={styles.label}>{label}</label>
      <DropDownButton open={open} toggleOpen={toggleOpen} selectedOption={selectedOption} />
      <DropDownList
        open={open}
        options={options.filter((option) => option !== selectedOption)}
        onSelected={handleSelectedOption}
      />
    </menu>
  );
};

export default DropDown;
