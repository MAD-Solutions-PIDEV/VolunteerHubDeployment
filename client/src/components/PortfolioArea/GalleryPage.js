import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const GalleryPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    // Fetch list of events
    fetch(`https://volunteerhub-backend.onrender.com/getNFT/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setNfts(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="gallery-page-area">
      <Container>
        <Row>
          <Col lg={4} md={6} sm={6}>
            {nfts.map((nft) => (
              <div className={`portfolio-item`}>
                <img src={nft.image} alt="" href={nft.url} />
                <div className="portfolio-overlay">
                  <a className="image-popup">
                    <i className="flaticon-add"></i>
                  </a>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GalleryPage;
