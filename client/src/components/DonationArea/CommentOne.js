import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDonationsByCampaign } from "services/donationService";
import { Image } from "react-bootstrap";

import { useParams } from "react-router";

const CommentOneSingle = ({ donation = {} }) => {
 
  const { amount,username } = donation;

  return (
    <div className="comment-one__single">
      <div className="comment-one__image">
        <Image src={require(`assets/images/tech-logo.jpg`)} alt="tech-logo.jpg" />
      </div>
      <div className="comment-one__content">
        <h3>
          {donation.donor.username}
        </h3>
        <p>Donated: {amount} USD</p>
      </div>
      
    </div>
    
  );
};

const CommentOne = ({ className = "" }) => {

  const {id}=useParams();
  const [donations, setDonations] = useState([]);
  

  useEffect(() => {
    getDonationsByCampaign(id)
      .then((response) => {
        setDonations(response.data);
        console.log(donations)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={`comment-one ${className}`}>
      <h3 className="comment-one__block-title">{donations.length} Donations</h3>
      {donations.map((donation) => (
        <CommentOneSingle donation={donation} key={donation.id} />
      ))}
    </div>
  );
};

export default CommentOne;
