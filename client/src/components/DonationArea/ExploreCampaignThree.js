import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleExploreCampaign from "./SingleExploreCampaign";
import { getAllCompaigns } from "services/campaignService";

const ExploreCampaignThree = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getAllCompaigns()
      .then((res) => {
        setCampaigns(res.data);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);
  const filtredcampaigns = campaigns.filter(
    (campaign) => campaign.status === "accepted" 
  );
  return (
    <section className="explore-projects-3-area explore-v2-page pt-90 pb-120">
      <Container>
        <div className="explore-margin">
          <Row className="justify-content-center">
          {(filtredcampaigns|| []).map((campaign) => (
              <Col lg={6} md={6} sm={6} key={campaign._id}>
                <SingleExploreCampaign campaign={campaign} />
                
              </Col>
            ))}
          
          </Row>
          
        </div>
          <br></br>
                <br></br>
      </Container>
    </section>
  );
};

export default ExploreCampaignThree;
