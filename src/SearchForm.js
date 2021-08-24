import React, { useState } from 'react';

const SearchForm = ({ filterLocations }) => {
  const initialFormData = {
    number: "",
    name: "",
    city: "",
    state: "",
    country: "",
    postcode: ""
  }
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    filterLocations(formData);
  }

  const clearForm = () => {
    setFormData({ ...initialFormData });
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="number">Street Number: </label>
          <input type="text" name="number" value={formData.number} onChange={handleChange}></input>
          <label htmlFor="name"> Street Name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}></input>
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input type="text" name="city" value={formData.city} onChange={handleChange}></input>
          <label htmlFor="state"> State: </label>
          <input type="text" name="state" value={formData.state} onChange={handleChange}></input>
        </div>
        <div>
          <label htmlFor="country">Country: </label>
          <input type="text" name="country" value={formData.country} onChange={handleChange}></input>
          <label htmlFor="postcode"> Postcode: </label>
          <input type="text" name="postcode" value={formData.postcode} onChange={handleChange}></input>
        </div>
        <div>
          <button className="btn" id="searchBtn" type="submit">Search</button>
          <button className="btn" id="clearBtn" onClick={clearForm}>Clear</button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm;