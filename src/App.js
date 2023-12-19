import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import your CSS file

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    agreeToTerms: false,
  });

  const [inputFocused, setInputFocused] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleSave = async () => {
    setSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // API call
    try {
      const response = await axios.post(
        "http://localhost:5000/api/save-user",
        formData
      );
      console.log(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }

    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="form-box">
        <div>
          <label className={`input-label ${inputFocused ? "focused" : ""}`}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className={`${inputFocused ? "focused-border" : ""} ${
                isSubmitted ? "submitted" : ""
              }`}
            />
          </label>
          <br />
          <label className={`input-label ${inputFocused ? "focused" : ""}`}>
            Sectors:
            <select
              name="sector"
              value={formData.sector}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className={`${inputFocused ? "focused-border" : ""} ${
                isSubmitted ? "submitted" : ""
              }`}
            >
              <option value="sector1">Sector 1</option>
              <option value="sector2">Sector 2</option>
            </select>
          </label>
          <br />
          <label>
            Agree to Terms:
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className={`${inputFocused ? "focused-border" : ""} ${
                isSubmitted ? "submitted" : ""
              }`}
            />
          </label>
          <br />
          <button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>

          {isSubmitted && (
            <div className="modal">
              <div className="modal-content">
                <p>Submitted Successfully!</p>
                <button onClick={() => setSubmitted(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="right-box">
        <p>“Creativity is intelligence having fun”</p>
      </div>
    </div>
  );
};

export default App;
