import { newsArea } from "data/newsArea";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../../Reuseable/Title";
import NewsItem from "./NewsItem";

import axios from "axios";

const { tagline, title } = newsArea;

const NewsArea = ({ className = "", newsTwo = false, newsPage = false }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://volunteerhub-backend.onrender.com/news"
        );
        setNewsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log("news : " + JSON.stringify(newsData));
  console.log("type n:" + typeof newsData); // Check the type of newses prop
  console.log("type n2:" + typeof newsData.news); // Check the type of newses prop

  const newses = newsData.news;

  return (
    <section className={`news-area ${className}`}>
      <Container>
        {!newsPage && (
          <Row className="justify-content-center">
            <Col lg={6}>
              <Title title={title} tagline={tagline} className="text-center" />
            </Col>
          </Row>
        )}
        <Row className={"no-gutters"}>
          {newsData &&
            newses &&
            newses
              .slice(0, newsPage ? undefined : newsTwo ? 3 : 4)
              .map((news, index) => (
                <NewsItem
                  key={news.id}
                  news={news}
                  index={index}
                  newsTwo={newsTwo}
                />
              ))}
        </Row>
      </Container>
    </section>
  );
};

export default NewsArea;
