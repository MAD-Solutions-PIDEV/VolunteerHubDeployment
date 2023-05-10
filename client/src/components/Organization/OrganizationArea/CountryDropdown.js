import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import AddressService from "../../../services/addressService";

const CountryDropdown = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      const countryList = await AddressService.getCountriesList();
      setCountries(countryList);
    }

    fetchCountries();
  }, []);

  const handleCountrySelect = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);

    if (onSelect) {
      onSelect(selectedCountry);
    }
  };
  const selectStyle = {
    width: "100%",
    height: "70px",
    background: "#f7f7f9",
    borderRadius: "0px",
    border: "0",
    paddingLeft: "30px",
    color: "#838694",
    fontWeight: "400",
    fontSize: "16px",
    textTransform: "capitalize",
    marginTop: "20px",
  };
  return (
    <form controlId="formCountry" className="">
      <select
        as="select"
        value={selectedCountry}
        onChange={handleCountrySelect}
        style={selectStyle}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </form>
  );
};

export default CountryDropdown;
