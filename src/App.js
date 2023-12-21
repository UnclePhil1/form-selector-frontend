import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomDropdown from "./components/selector/index"; // Adjust the path accordingly
import DynamicOptions from "./components/dynamicOptions/DynamicOptions";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    agreeToTerms: false,
  });

  // State to manage selected sector for the dropdown
  const [selectedOption, setSelectedOption] = useState("");
  const [users, setUsers] = useState([]); // State to store fetched users
  const [editingUser, setEditingUser] = useState(null); // State to store the user being edited
  const [isUserListModalOpen, setUserListModalOpen] = useState(false);

  // Function to toggle the user list modal
  const toggleUserListModal = () => {
    setUserListModalOpen(!isUserListModalOpen);
  };

  // Function to handle sector selection in the dropdown
  const handleSelect = (option) => {
    setSelectedOption(option);
    // Update the sector in the form data
    setFormData((prevData) => ({ ...prevData, sector: option }));
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchDataAsync();
  }, []);

  // Function to fetch user data asynchronously
  const fetchDataAsync = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-user");
      // Set the fetched users to the state
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to add a custom sector option asynchronously
  const addCustomOptionAsync = async (option) => {
    try {
      await axios.post("http://localhost:5000/api/add-sector", {
        name: option,
      });
    } catch (error) {
      console.error("Error adding custom option:", error);
    }
  };

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Update the form data based on input type
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle saving the form data
  const handleSave = async () => {
    try {
      if (editingUser) {
        // If editing, update the existing user
        await axios.put(
          `http://localhost:5000/api/update-user/${editingUser._id}`,
          formData
        );
        toast.success("User Updated Successfully!");

        // Clear editing state after updating the user
        setEditingUser(null);
      } else {
        // If not editing, add a new user
        await axios.post("http://localhost:5000/api/save-user", formData);
        toast.success("User Added Successfully!");
      }

      setFormData({
        name: "",
        sector: "",
        agreeToTerms: false,
      });
      setSelectedOption("");
      fetchDataAsync(); // Fetch updated user list
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error submitting", error);
      // Check if it's a validation error
      if (error.response && error.response.status === 422) {
        toast.error("Validation Error. Please check your input.");
      } else {
        toast.error("Error submitting", error);
      }
    }
  };

  // ... (previous code)

  // Function to handle Editing.
  const handleEdit = (user) => {
    setEditingUser(user);
    setSelectedOption(user.sector);
    setFormData(user);
    toggleUserListModal();
  };

  // Disable the checkbox and button if Name or Sector is not filled
  const isDisabled = !formData.name || !formData.sector;

  // Render the component
  return (
    <div className="container">
      <div className="form-box">
        <h1 className="form-header">Lets get you started.</h1>
        <form>
          {/* Input for Name */}
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
          {/* Dropdown for Sectors */}
          <div className="selector-box">
            <label>Sectors:</label>
            <CustomDropdown
              options={DynamicOptions}
              handleSelect={handleSelect}
              fetchDataAsync={fetchDataAsync}
              addCustomOptionAsync={addCustomOptionAsync}
              selectedOption={selectedOption} // Pass selectedOption here
            />
          </div>
          <br />
          {/* Checkbox for Agree to Terms */}
          <div className="terms-box">
            <label htmlFor="agreeToTerms">Agree to Terms:</label>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              disabled={!selectedOption}
              // Add ARIA attributes
              aria-labelledby="agreeToTermsLabel"
              aria-describedby="agreeToTermsDesc"
            />
            {/* Additional information for screen readers */}
            <span id="agreeToTermsLabel" style={{ display: "none" }}>
              Checkbox to agree to terms
            </span>
            <span id="agreeToTermsDesc" style={{ display: "none" }}>
              Please check this box to agree to the terms
            </span>
          </div>

          <br />
          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isDisabled}
            className={`save-button ${
              isDisabled ? "save-button-disabled" : ""
            }`}
          >
            {editingUser ? "Update User" : "Save"}
          </button>
        </form>
    
        <div className="user-container">
          <h2>User List</h2>
          <button onClick={toggleUserListModal} className="save-button">Open User List</button>
        </div>
        {isUserListModalOpen && (
          <div className="user-list-modal">
            <h2>User List</h2>
            <ul>
              {users.map((user) => (
                <li key={user._id} onClick={() => handleEdit(user)}>
                  {user.name} - {user.sector}
                </li>
              ))}
            </ul>
            <button onClick={toggleUserListModal} className="save-button">Close</button>
          </div>
        )}
      </div>
      <Toaster position="top-center" />
      <div className="side-text">
        <p>"Select the Sectors you are currently involved in."</p>
      </div>
    </div>
  );
};

export default App;
