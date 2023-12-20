import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomDropdown from "./components/selector/index";
import dynamicOptions from "./components/dynamicoptions/index";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    agreeToTerms: false,
  });

  const [selectedOption, setSelectedOption] = useState("");
  const [isNameExists, setIsNameExists] = useState(false);

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const fetchDataAsync = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-user");
      const userData = response.data;

      if (userData) {
        setFormData(userData);
        setSelectedOption(userData.sector);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  const addCustomOptionAsync = async (option) => {
    try {
      await axios.post("http://localhost:5000/api/add-sector", {
        name: option,
      });
      fetchDataAsync();
    } catch (error) {
      toast.error("Error adding custom option:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsNameExists(false);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setFormData((prevData) => ({ ...prevData, sector: option }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.sector || !formData.agreeToTerms) {
      toast.error("All fields are mandatory");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/save-user",
        formData
      );

      console.log("Server Response:", response.data);

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

  const isDisabled = !formData.name || !formData.sector;

  return (
    <div className="main-container">
      <div className="form-container">
        <h1 className="form-heading">Let's get you started.</h1>

        <form>
          <div className="name-input-container">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`custom-input ${isNameExists ? "input-error" : ""}`}
              placeholder="Your Name"
            />
            {isNameExists && (
              <span className="error-message">Name already exists</span>
            )}
          </div>

          <div className="sector-selector-container">
            <label htmlFor="sector">Sectors:</label>
            <CustomDropdown
              options={dynamicOptions}
              handleSelect={handleSelect}
              fetchDataAsync={fetchDataAsync}
              addCustomOptionAsync={addCustomOptionAsync}
              selectedOption={selectedOption}
            />
          </div>

          <div className="terms-checkbox-container">
            <label htmlFor="agreeToTerms">Agree to Terms:</label>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              disabled={!selectedOption}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={isDisabled}
            className={`save-button ${isDisabled ? "save-button-disabled" : ""}`}
          >
            Save
          </button>
        </form>
      </div>

      <div className="side-text-container">
        <p>"Select the Sectors you are currently involved in."</p>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default App;
