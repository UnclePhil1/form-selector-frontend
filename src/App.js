import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomDropdown from "./components/selector/index";
import dynamicOptions from "./components/dynamicoptions/index"; // Adjust the path accordingly
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    agreeToTerms: false,
  });

  // State to manage the selected option in the dropdown
  const [selectedOption, setSelectedOption] = useState("");

  // State to track if the name already exists
  const [isNameExists, setIsNameExists] = useState(false);

  // Fetch user data asynchronously when the component mounts
  useEffect(() => {
    fetchDataAsync();
  }, []);

  // Fetch user data from the server
  const fetchDataAsync = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-user");
      const userData = response.data;

      if (userData) {
        // If user data is available, populate the form
        setFormData(userData);
        // Set the selected option for the dropdown
        setSelectedOption(userData.sector);
      }
    } catch (error) {
      // Check for error if User data can't be fetched.
      console.error("Error fetching user data:", error);

      // Only show the toast if there is an actual error (status code other than 404)
      if (error.response && error.response.status !== 404) {
        toast.error("Error fetching user data");
      }
    }
  };

  // Add a custom option to the dropdown asynchronously
  const addCustomOptionAsync = async (option) => {
    try {
      await axios.post("http://localhost:5000/api/add-sector", {
        name: option,
      });
      fetchDataAsync(); // Refetch data to update options
    } catch (error) {
      toast.error("Error adding custom option:", error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Reset the nameExists state when the name is changed
    setIsNameExists(false);
  };

  // Handle selection in the dropdown
  const handleSelect = (option) => {
    setSelectedOption(option);
    setFormData((prevData) => ({ ...prevData, sector: option }));
  };

  // Handle the save button click
  const handleSave = async () => {
    // Check if required fields are filled
    if (!formData.name || !formData.sector || !formData.agreeToTerms) {
      toast.error("All fields are mandatory");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/save-user",
        formData
      );

      console.log("Server Response:", response.data); // Log the server response

      if (response.data && response.data.success) {
        toast.success("User data saved successfully!");
      } else {
        toast.error("Error saving data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data");
    }
  };

  // Disable the save button if required fields are not filled
  const isDisabled = !formData.name || !formData.sector;

  return (
    // Main container for the whole Page
    <div className="main-container">
      <div className="form-container">
        {/* Header for the Form */}
        <h1 className="form-heading">Let's get you started.</h1>

        {/* Form Container itself */}
        <form>
          {/* Input for the user's name */}
          <div className="name-input-container">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`custom-input ${isNameExists ? "input-error" : ""}`}
              placeholder="Your Name"
            />
            {/* Display an error message if the name already exists */}
            {isNameExists && (
              <span className="error-message">Name already exists</span>
            )}
          </div>

          {/* Dropdown for selecting sectors */}
          <div className="sector-selector-container">
            <label>Sectors:</label>
            <CustomDropdown
              options={dynamicOptions}
              handleSelect={handleSelect}
              fetchDataAsync={fetchDataAsync}
              addCustomOptionAsync={addCustomOptionAsync}
              selectedOption={selectedOption} // Pass the selected option to the dropdown
            />
          </div>

          {/* Checkbox for agreeing to terms */}
          <div className="terms-checkbox-container">
            <label>Agree to Terms:</label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              disabled={!selectedOption}
            />
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={isDisabled}
            className={`save-button ${
              isDisabled ? "save-button-disabled" : ""
            }`}
          >
            Save
          </button>
        </form>
      </div>

      {/* Additional text */}
      <div className="side-text-container">
        <p>"Select the Sectors you are currently involved in."</p>
      </div>
      {/* Toaster */}
      <Toaster position="top-center" />
      {/* Toaster */}
    </div>
  );
};

export default App;
