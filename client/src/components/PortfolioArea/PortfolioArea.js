import { portfolioArea } from "data/portfolioArea";
import React from "react";
import { Container } from "react-bootstrap";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PortfolioItem from "./PortfolioItem";
import Header from "components/Header/Header";
import GalleryPage from "./GalleryPage";

const PortfolioArea = () => {
  return (
    <div className="portfolio-area">
      <Header />
      <GalleryPage />
    </div>
  );
};

export default PortfolioArea;
