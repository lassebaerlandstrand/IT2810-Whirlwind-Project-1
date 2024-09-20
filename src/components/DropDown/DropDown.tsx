import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { ButtonHTMLAttributes, HTMLAttributes, useEffect, useId, useRef, useState } from 'react';
import styles from './DropDown.module.css';

type DropDownListProps = {
  open: boolean;
  options: string[];
  onSelected: (option: string) => void;
} & HTMLAttributes<HTMLUListElement>;

const DropDownList = ({ open, options, onSelected, ...rest }: DropDownListProps) => {
  return (
    <ul className={`${styles.dropDownList} ${open ? styles.listOpen : ''}`} role="listbox" {...rest} data-open={open}>
      {options.map((option) => (
        <li
          key={option}
          className={styles.dropDownItem}
          onClick={() => onSelected(option)}
          role="option"
          aria-selected="false"
        >
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
} & ButtonHTMLAttributes<HTMLButtonElement>;

const DropDownButton = ({ open, toggleOpen, selectedOption, ...rest }: DropDownButtonProps) => {
  return (
    <button
      className={`${styles.dropDownButton} ${open ? styles.buttonOpen : ''}`}
      onClick={toggleOpen}
      data-testid="dropdown-button"
      {...rest}
    >
      {selectedOption}{' '}
      <span className={styles.iconSpan}>
        {open ? <IconChevronUp aria-hidden="true" /> : <IconChevronDown aria-hidden="true" />}
      </span>
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
  const dropDownButtonId = useId();
  const dropDownListId = useId();

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
      <label className={styles.label} htmlFor={dropDownButtonId}>
        {label}
      </label>
      <DropDownButton
        open={open}
        toggleOpen={toggleOpen}
        selectedOption={selectedOption}
        id={dropDownButtonId}
        aria-controls={dropDownListId}
        aria-expanded={open}
        aria-haspopup="listbox"
      />
      <DropDownList
        open={open}
        options={options.filter((option) => option !== selectedOption)}
        onSelected={handleSelectedOption}
        id={dropDownListId}
        aria-labelledby={dropDownButtonId}
      />
    </menu>
  );
};

export default DropDown;
