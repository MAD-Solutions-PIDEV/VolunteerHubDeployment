import React from "react";
import { useState } from "react";
import { acceptMission, refuseMission } from "../services/missionService";
import "./MissionControle.css";
function MissionControle(props) {
  const [newStatus, setNewStatus] = useState(props.status);
  const handleStatusChange = (event) => {
    var newStatus = event.target.value;

    switch (newStatus) {
      case 'accepted':
        return acceptMission(props.id)
          .then(response => {
          })
          .catch(error => {
            console.error(error);
          });
      case 'refused':
        return refuseMission(props.id)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
          default:
            break;
        

    };
  }

  return (
   <div >

      <select className="mission-select" defaultValue={newStatus} onChange={handleStatusChange}>
        <option value="inactive" >Inactive</option>
        <option value="accepted">Accepted</option>
        <option value="refused">Refused</option>
       
      </select>
    </div>

  );
}

export default MissionControle;