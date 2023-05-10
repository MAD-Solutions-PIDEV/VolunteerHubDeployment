import React from "react";
import { useState } from "react";
import { acceptCompaign,refuseCompaign } from "services/campaignService";
function CampaignControle(props) {
 console.log(props);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;

    switch (newStatus) {
      
      case 'refused':
        return refuseCompaign(props.id)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          },window.location.reload());

          case 'accepted':
            return acceptCompaign(props.id)
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
      <option >choice option</option>
        <option value="accepted">Accept</option>
        <option value="refused">Refuse</option>
       
      </select>
    </div>

  );
}

export default CampaignControle;