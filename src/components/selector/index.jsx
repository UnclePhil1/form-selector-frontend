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
  selectedOption,
}) => {
  // State to manage the visibility of the dropdown options
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the dropdown container to detect clicks outside the dropdown
  const dropdownRef = useRef(null);

  // useEffect runs when the component mounts
  useEffect(() => {
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
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Render the component
  return (
    // Ref attached to the dropdown container to detect clicks outside
    <div className="custom-dropdown-container" ref={dropdownRef}>
      {/* Header of the dropdown, clicking it toggles the dropdown visibility */}
      <button
        type="button"
        className="custom-dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
        // Add ARIA attributes
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="customDropdownOptions"
      >
        {selectedOption || "Choose your Sector"}
      </button>
      {/* Dropdown options are rendered if the dropdown is open */}
      {isOpen && (
        <div
          className="custom-dropdown-options"
          id="customDropdownOptions"
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              className={`custom-dropdown-option ${
                selectedOption === option.value ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
              title={option.value}
              // Add ARIA attributes
              role="option"
              aria-selected={selectedOption === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
