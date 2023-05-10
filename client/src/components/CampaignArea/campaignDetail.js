import { comments } from "data/newsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CommentOne from "components/NewsArea/BlogDetails/CommentOne";
import CampaignDetailsMain from "components/CampaignArea/campaignDetailsMain";
const CampaignDetail = () => {
  return (
    <section className="blog-details">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <CampaignDetailsMain />
           <br></br>
           
           
          </Col>
        
        </Row>
      </Container>
    </section>
  );
};

export default CampaignDetail;
