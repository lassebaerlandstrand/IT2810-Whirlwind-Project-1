import React, { useEffect, useRef, useState } from 'react';
import styles from './DropDown.module.css';

type DropDownProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  label: string;
};

export const DropDown: React.FC<DropDownProps> = ({ selectedOption, options, setSelectedOption, label }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLMenuElement>(null);

  const toggleOpen = () => setOpen((prev) => !prev);
  const handleOptionSelect = (option: string) => {
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
    <div className={styles.container} ref={dropDownRef}>
      <label className={styles.label}>{label}</label>
      <button className={styles.dropDownButton} onClick={toggleOpen} aria-expanded={open} aria-haspopup="listbox">
        {selectedOption}
      </button>
      {open && (
        <ul className={styles.dropDownContent} role="listbox">
          {options.map((option) => (
            <li
              key={option}
              className={styles.dropDownItem}
              onClick={() => handleOptionSelect(option)}
              role="option"
              aria-selected={option === selectedOption}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
