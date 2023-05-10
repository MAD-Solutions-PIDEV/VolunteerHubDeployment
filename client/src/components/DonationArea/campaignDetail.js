import { comments } from "data/newsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CommentOne from "components/NewsArea/BlogDetails/CommentOne";
import DonationCampaignDetailsMain from "./campaignDetailsMain";
const DonationCampaignDetail = () => {
  return (
    <section className="blog-details">
      <Container>
        <Row className="justify-content-center">
          <Col lg={12}>
            <DonationCampaignDetailsMain />
           <br></br>
            
          
          </Col>
        
        </Row>
      </Container>
    </section>
  );
};

export default DonationCampaignDetail;
