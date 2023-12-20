import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const CustomDropdown = ({
  options,
  handleSelect,
  fetchDataAsync,
  addCustomOptionAsync,
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
    <div ref={dropdownRef} className="custom-dropdown-container">
      {/* Header of the dropdown, clicking it toggles the dropdown visibility */}
      <div
        className="custom-dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button" // Keyboard accessibility
        tabIndex={0} // Keyboard accessibility
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
        }}
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
              tabIndex={0} // Keyboard accessibility
              role="button" // Keyboard accessibility
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleOptionClick(option.value);
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
