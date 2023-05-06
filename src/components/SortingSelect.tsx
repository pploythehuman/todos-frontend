import React, { useState } from 'react';

interface SortingSelectProps {

}

const SortingSelect:React.FC<SortingSelectProps> = ({ }) => {
  const options = [
    { id: 'select-all', value: 'all', label: 'All' },
    { id: 'select-done', value: 'done', label: 'Done'  },
    { id: 'select-undone', value: 'undone', label: 'Undone'  },
  ]

  const [selectValue, setSelectValue] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleOptionChange = (event: any) => {
    if (event) {
      setSelectValue(event.target.value);
    }
    setIsDropdownOpen(false);
  }

  // const selectItem = (value: string, id: string, label: string) => (
  //   <>
  //     <label className="select-item" htmlFor={id}>{label}</label>
  //     <input className="option" id={id} type="radio" name="option" value={value} onChange={handleOptionChange} />
  //   </>
  // )

  return (
    <div className="sorting-select-group">
      <button className="sorting-select-button" onClick={toggleDropdown}>
        <p style={{ fontSize: '13px' }}>{selectValue}</p>
        <div className="arrow" />
      </button>
      <div className={`sorting-select-dropdown ${isDropdownOpen? '' : 'hidden'}`}>
        <label className="select-item" htmlFor="select-all">All</label>
        <input className="option" id="select-all" type="radio" name="option" value="All" onClick={handleOptionChange} />

        <label className="select-item" htmlFor="select-done">Done</label>
        <input className="option" id="select-done" type="radio" name="option" value="Done" onClick={handleOptionChange} />

        <label className="select-item" htmlFor="select-undone">Undone</label>
        <input className="option" id="select-undone" type="radio" name="option" value="Undone" onClick={handleOptionChange} />
      </div>
    </div>
  );
};

export default SortingSelect;