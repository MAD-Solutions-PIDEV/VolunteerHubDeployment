import { projectDetailsUpdates } from "data/projectsArea";
import React, { useEffect, useState } from "react";
import { Image, Row } from "react-bootstrap";
import OrganizationService from "services/organizationService";
import CampaignCard from "./CampaignCard";

const { id, updates } = projectDetailsUpdates;

const OrganizationDetailsCampaigns = ({ getClassName, organization }) => {
  const [campaigns, setCampaigns] = useState([]); // initialize with null
  useEffect(() => {
    async function fetchCampaigns() {
      const response = await OrganizationService.getCampaignsByOrganization(
        organization._id
      );
      console.log(response.campaigns);
      setCampaigns(response.campaigns);
      console.log(campaigns);
    }
    fetchCampaigns();
  }, [organization._id]);
  const filtredcampaigns = campaigns.filter(
    (campaign) => campaign.status === "accepted"
  );
  if (campaigns === null) {
    return <div>Loading Campaigns...</div>;
  } else if (campaigns && campaigns.length > 0) {
    return (
      <div className={getClassName(id)} id={id}>
        <Row className="justify-content-center">
          {filtredcampaigns.map((camp) => (
            <CampaignCard key={camp._id} campaign={camp} />
          ))}
        </Row>
      </div>
    );
  }
  return (
    <div className={getClassName(id)} id={id}>
      <Row className="justify-content-center">
        <h3 className="mt-100">No Campaigns available!</h3>
      </Row>
    </div>
  );
};

export default OrganizationDetailsCampaigns;
