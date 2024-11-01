import React, { useEffect, useState } from 'react';
import { sortingOptions } from '../../contexts/LocationContext';
import DropDown from '../DropDown/DropDown';

type SortDropDownProps = {
  setSortKey: any;
};

const SortDropDown: React.FC<SortDropDownProps> = ({ setSortKey }) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    () => sessionStorage.getItem('SortingOption') || Object.keys(sortingOptions)[0],
  );

  useEffect(() => {
    sessionStorage.setItem('SortingOption', selectedOption);
    setSortKey(selectedOption);
  }, [selectedOption, setSortKey]);

  const optionList = Object.keys(sortingOptions);

  return (
    <DropDown
      options={optionList}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      label="Sort by:"
    />
  );
};

export default SortDropDown;
