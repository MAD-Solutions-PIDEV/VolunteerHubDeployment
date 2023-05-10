import axios from "axios";
const API_URL = "https://volunteerhub-backend.onrender.com/address/";

const getAddressesByCountry = async (country) => {
  const response = await axios.get(`${API_URL}/country/${country}`);
  return response.data;
};

const getAddressesByState = async (state) => {
  const response = await axios.get(`${API_URL}/state/${state}`);
  return response.data;
};

const getAddressById = async (id) => {
  try {
    const response = await axios.get(API_URL + id);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCountriesList = async () => {
  const addresses = await axios.get(`${API_URL}all`);
  //console.log(addresses.data);
  const countries = [];
  addresses.data.forEach((address) => {
    if (!countries.includes(address.country)) {
      countries.push(address.country);
    }
  });
  //console.log(countries);
  return countries;
};

// addresses.forEach((address) => {
//     if (!countries.includes(address.country)) {
//       countries.push(address.country);
//     }
//   });
//   return countries;

const AddressService = {
  getAddressById,
  getAddressesByCountry,
  getAddressesByState,
  getCountriesList,
};

export default AddressService;
