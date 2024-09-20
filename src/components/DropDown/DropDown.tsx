import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { ButtonHTMLAttributes, useEffect, useId, useRef, useState } from 'react';
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
        aria-labelledby="dropdown-button"
        role="listbox"
      >
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
    )
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
      aria-expanded={open}
      aria-controls="dropdown-list"
      aria-haspopup="listbox"
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
  const dropDownId = useId();

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
      <label className={styles.label} htmlFor={dropDownId}>
        {label}
      </label>
      <DropDownButton open={open} toggleOpen={toggleOpen} selectedOption={selectedOption} id={dropDownId} />
      <DropDownList
        open={open}
        options={options.filter((option) => option !== selectedOption)}
        onSelected={handleSelectedOption}
      />
    </menu>
  );
};

export default DropDown;
