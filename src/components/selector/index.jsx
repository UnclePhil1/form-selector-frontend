import React, { useState, useEffect, useRef } from 'react';
import './style.css'; // Import the corresponding CSS

const CustomDropdown = ({ options, handleSelect, fetchDataAsync }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchDataAsync(); // Fetch data asynchronously when the component mounts
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [fetchDataAsync]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    handleSelect(option); // Change this line to use handleSelect
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="custom-dropdown-container">
      <div className="custom-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || 'Select an option'}
      </div>
      {isOpen && (
        <div className="custom-dropdown-options">
          {options.map((option) => (
            <div
              key={option}
              className="custom-dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
