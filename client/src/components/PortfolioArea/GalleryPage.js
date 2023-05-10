import Header from "components/Header/Header";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GalleryPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [nfts, setNfts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    console.log(userId);
    if (userId) {
      // Fetch list of events
      fetch(`https://volunteerhub-backend.onrender.com/getNFT/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setNfts(data);
        })
        .catch((error) => console.error(error));
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="gallery-page-area">
        <Container>
          <Row>
            {nfts.map((nft) => (
              <Col key={nft._id} lg={4} md={6} sm={6}>
                <div className={`portfolio-item`}>
                  <img src={nft.image} alt="" href={nft.url} />
                  <div className="portfolio-overlay">
                    <a className="image-popup" href={nft.url} target="_blank">
                      <i className="flaticon-add"></i>
                    </a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GalleryPage;
