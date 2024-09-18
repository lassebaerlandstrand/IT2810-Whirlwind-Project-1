import React, { useEffect, useState } from 'react';
import { Location } from '../../types/api-types';
import { DropDown } from './DropDown';
import { options } from './SortingOptions';

type SortDropDownProps = {
  setSortCondition: (sortCondition: (a: Location, b: Location) => number) => void;
};

const SortDropDown: React.FC<SortDropDownProps> = ({ setSortCondition }) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    () => sessionStorage.getItem('SortingOption') || Object.keys(options)[0],
  );

  useEffect(() => {
    sessionStorage.setItem('SortingOption', selectedOption);
    const sortingMethod = options[selectedOption];
    setSortCondition(sortingMethod);
  }, [selectedOption, setSortCondition]);

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
