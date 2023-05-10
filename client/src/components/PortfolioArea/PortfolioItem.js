import React from "react";
import { Image } from "react-bootstrap";

const PortfolioItem = ({ portfolio = {}, className = "" }) => {
  
  const { image } = portfolio;
  return (
    <div className={`portfolio-item${className}`}>
      <Image src={require(`assets/images/${image}`)} alt="" />
      <div className="portfolio-overlay">
        <a className="image-popup">
          <i className="flaticon-add"></i>
        </a>
      </div>
    </div>
  );
};

export default PortfolioItem;
