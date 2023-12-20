import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomDropdown from "./components/selector/index";
import DynamicOptions from "./components/dynamicOptions/DynamicOptions";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    sector: "",
    agreeToTerms: false,
  });

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option) => {
    setSelectedOption(option);
    setFormData((prevData) => ({ ...prevData, sector: option.value }));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-user");

      if (response.data) {
        const { _id, name, sector, agreeToTerms } = response.data;
        setFormData({ id: _id, name, sector, agreeToTerms });
        setSelectedOption({ value: sector, label: sector });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const addCustomOptionAsync = async (option) => {
    try {
      await axios.post("http://localhost:5000/api/add-sector", { name: option.label });
    } catch (error) {
      console.error("Error adding custom option:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.sector || !formData.agreeToTerms) {
      alert("All fields are mandatory");
      return;
    }

    try {
      const endpoint = formData.id ? "update-user" : "save-user";
      const response = await axios.post(`http://localhost:5000/api/${endpoint}`, formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const isDisabled = !formData.name || !formData.sector;

  return (
    <div className="container">
      <div className="form-box">
        <h1 className="form-header">Let's get you started.</h1>
        <form>
          <div className="name-box">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="Your Name"
            />
          </div>
          <br />
          <div className="selector-box">
            <label>Sectors:</label>
            <CustomDropdown
              options={DynamicOptions}
              handleSelect={handleSelect}
              fetchDataAsync={fetchUserData}
              addCustomOptionAsync={addCustomOptionAsync}
              selectedOption={selectedOption}
            />
          </div>
          <br />
          <div className="terms-box">
            <label>Agree to Terms:</label>
            <input
             type="checkbox"
             name="agreeToTerms"
             checked={formData.agreeToTerms}
             onChange={handleInputChange}
             disabled={!selectedOption} // Set the disabled attribute
            />
          </div>
          <br />
          <button
            onClick={handleSave}
            disabled={isDisabled}
            className={`save-button ${isDisabled ? "save-button-disabled" : ""}`}
          >
            Save
          </button>
        </form>
      </div>
      <div className="side-text">
        <p>"Select the Sectors you are currently involved in."</p>
      </div>
    </div>
  );
};

export default App;
