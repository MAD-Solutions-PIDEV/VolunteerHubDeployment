import React, { useState } from "react";
import { updateUser } from "../services/userService";
import FormUserUpdate from "./FormUserUpdate";
import { useParams } from "react-router-dom";
function UpdateUser() {
    

  const { id } = useParams(); 
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleUpdate = () => {
    const updatedUser = {
      email,
      firstName,
      lastName,
      phone,
    };

    updateUser(id, updatedUser)
      .then((response) => {
        console.log(response);
        // optionally, update the user state or display a success message
      })
      .catch((error) => {
        console.error(error);
        // display an error message
      });
  };

  return (
    <div>
      <FormUserUpdate id={id} handleUpdate={handleUpdate} />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
}

export default UpdateUser;
