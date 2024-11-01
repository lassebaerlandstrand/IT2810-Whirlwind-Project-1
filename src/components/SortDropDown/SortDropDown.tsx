import React, { useEffect, useState } from 'react';
import { options } from '../../contexts/LocationContext';
import DropDown from '../DropDown/DropDown';

type SortDropDownProps = {
  setSortKey: any;
};

const SortDropDown: React.FC<SortDropDownProps> = ({ setSortKey }) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    () => sessionStorage.getItem('SortingOption') || Object.keys(options)[0],
  );

  useEffect(() => {
    sessionStorage.setItem('SortingOption', selectedOption);
    setSortKey(selectedOption);
  }, [selectedOption, setSortKey]);

  const optionList = Object.keys(options);

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
