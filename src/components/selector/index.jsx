import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const CustomDropdown = ({
  options,
  handleSelect,
  fetchDataAsync,
  addCustomOptionAsync,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchDataAsync();

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [fetchDataAsync]);

  const handleOptionClick = (option) => {
    handleSelect(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="custom-dropdown-container"
      tabIndex={0} // Keyboard accessibility
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsOpen(!isOpen);
        }
      }}
    >
      <div
        className="custom-dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0} // Keyboard accessibility
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
        }}
      >
        {selectedOption || "Choose your Sector"}
      </div>
      {isOpen && (
        <div className="custom-dropdown-options">
          {options.map((option) => (
            <div
              key={option.value}
              className="custom-dropdown-option"
              onClick={() => handleOptionClick(option.value)}
              tabIndex={0} // Keyboard accessibility
              role="button"
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
