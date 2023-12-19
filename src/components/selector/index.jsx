// DynamicSelector.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'

const DynamicSelector = ({ value, onChange, staticOptions }) => {
  const [sectors, setSectors] = useState([]);
  const [customOption, setCustomOption] = useState('');

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sectors');
        setSectors(response.data);
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    };

    fetchSectors();
  }, []);

  // const handleCustomOptionChange = (e) => {
  //   setCustomOption(e.target.value);
  // };

  // const handleAddCustomOption = () => {
  //   if (customOption.trim() !== '' && !sectors.some((sector) => sector.name === customOption)) {
  //     setSectors((prevSectors) => [...prevSectors, { name: customOption, id: Date.now() }]);
  //     setCustomOption('');
  //   }
  // };

  return (
    <div>
      <select name="sector" value={value} onChange={onChange}>
        <option value="">Select a sector</option>
        {staticOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* <input
        type="text"
        placeholder="Add custom sector"
        value={customOption}
        onChange={handleCustomOptionChange}
      />
      <button onClick={handleAddCustomOption}>Add</button> */}
    </div>
  );
};

export default DynamicSelector;
