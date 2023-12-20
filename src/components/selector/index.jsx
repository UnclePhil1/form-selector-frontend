<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import "./style.css";

// CustomDropdown component receives props:
// - options: An array of available options for the dropdown
// - handleSelect: Function to handle selection of an option
// - fetchDataAsync: Asynchronous function to fetch data (executed on component mount)
// - addCustomOptionAsync: Asynchronous function to add a custom option
// - selectedOption: Currently selected option
const CustomDropdown = ({
  options,
  handleSelect,
  fetchDataAsync,
  addCustomOptionAsync,
  selectedOption,
}) => {
  // State to manage the visibility of the dropdown options
  const [isOpen, setIsOpen] = useState(false);
=======
import React, { useState, useEffect, useRef } from 'react';
import './style.css'; // Import the corresponding CSS

const CustomDropdown = ({ options, handleSelect, fetchDataAsync }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);
>>>>>>> bd2b330544d00e00b2b8189d1c0f6363aa0a4bc9

  // Reference to the dropdown container to detect clicks outside the dropdown
  const dropdownRef = useRef(null);

  // useEffect runs when the component mounts
  useEffect(() => {
<<<<<<< HEAD
    // Fetch initial data asynchronously
    fetchDataAsync();

    // Add an event listener to detect clicks outside the dropdown and close it
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [fetchDataAsync]);

  // Handles a click on an option in the dropdown
  const handleOptionClick = (option) => {
    // Call the provided handleSelect function to update the selected option
    handleSelect(option);
    // Close the dropdown
    setIsOpen(false);
  };

  // Handles a click outside the dropdown to close it
=======
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

>>>>>>> bd2b330544d00e00b2b8189d1c0f6363aa0a4bc9
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Render the component
  return (
<<<<<<< HEAD
    // Ref attached to the dropdown container to detect clicks outside
    <div ref={dropdownRef} className="custom-dropdown-container">
      {/* Header of the dropdown, clicking it toggles the dropdown visibility */}
      <div
        className="custom-dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || "Choose your Sector"}
      </div>
      {/* Dropdown options are rendered if the dropdown is open */}
      {isOpen && (
        <div className="custom-dropdown-options">
          {/* Map through options and render each as a clickable option */}
          {options.map((option) => (
            <div
              key={option.value}
              className="custom-dropdown-option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
=======
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
>>>>>>> bd2b330544d00e00b2b8189d1c0f6363aa0a4bc9
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
