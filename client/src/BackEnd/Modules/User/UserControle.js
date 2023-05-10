import React from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import { blockUser, validateUser, deleteUser } from "../services/userService";
function UserStatus(props) {
  const [status, setStatus] = useState(props.status);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;

    switch (newStatus) {
      case 'active':
        return validateUser(props.id)
          .then(response => {
            console.log(response);
           
          },window.location.reload())
          .catch(error => {
            console.error(error);
          });
      case 'inactive':
        return deleteUser(props.id)
          .then(response => {
            console.log(response);
          },window.location.reload())
          .catch(error => {
            console.error(error);
          });
      case 'blocked':
        return blockUser(props.id)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          },window.location.reload());
      default:
        return null;
        

    };
  }

  return (
    <div>

      <select value={props.status} onChange={handleStatusChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="blocked">Blocked</option>
      </select>
    </div>

  );
}

export default UserStatus;