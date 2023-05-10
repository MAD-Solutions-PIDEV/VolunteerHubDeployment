import { getAllCompaigns } from "services/campaignService";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import CampaignItem from "./campaignItem";

const CampaignsArea = ({ className = "", newsTwo = false, newsPage = false }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getAllCompaigns()
      .then((res) => {
        setCampaigns(res.data);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const { tagline, title } = campaigns;
  console.log(campaigns);
 

  return (
    <section className={`campaigns-area ${className}`}>
      <Container>
        {!newsPage && (
          <Row className="justify-content-center">
            <Col lg={6}>
              <Title title={title} tagline={tagline} className="text-center" />
            </Col>
          </Row>
        )}
        <Row className={newsTwo ? "" : "no-gutters"}>
        {(campaigns || [])
            .slice(0, newsPage ? undefined : newsTwo ? 3 : 4)
            .map((campaign, index) => (
              <CampaignItem
                key={campaign._id}
                campaign={campaign}
                index={index}
                campaignTwo={newsTwo}
              />
            ))}
        </Row>
        <button  className="main-btn main-btn-2" onClick={() => handleUpdateCampaign()}><i className="flaticon-next" ></i>Create New Campaign</button>
     
      </Container>
      <br></br>
    </section>
  );
};
function handleUpdateCampaign() {
  // Navigate to the campaign details page for the specified ID
  window.location.href = `/newcampaign`;

}
export default CampaignsArea;
