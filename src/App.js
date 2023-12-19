// App.js
import React, { useState } from "react";
import axios from "axios";
import DynamicSelector from "./components/selector/index";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    agreeToTerms: false,
  });

  const staticOptions = ["Option A", "Option B", "Option C"];

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
      const response = await axios.post(
        "http://localhost:5000/api/save-user",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Disable the checkbox and button if Name or Sector is not filled
  const isDisabled = !formData.name || !formData.sector;

  return (
    <div className="container">
      <div className="form-box">
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
            <DynamicSelector
              value={formData.sector}
              onChange={handleInputChange}
              staticOptions={staticOptions}
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
              disabled={isDisabled} // Set the disabled attribute
            />
          </div>
          <br />
          <button onClick={handleSave} disabled={isDisabled} className={`${isDisabled ? 'save-button-disabled' : 'save-button'}`}>
            Save
          </button>
        </form>
      </div>
      <div className="side-text">
        <p>"Entertaining yourself with a skill."</p>
      </div>
    </div>
  );
};

export default App;
