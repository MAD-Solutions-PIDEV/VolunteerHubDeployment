import { comments } from "data/newsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BlogAuthor from "./BlogAuthor";
import BlogDetailsMain from "./BlogDetailsMain";
import BlogDetailsSidebar from "./BlogDetailsSidebar";
import CommentForm from "./CommentForm";
import CommentOne from "./CommentOne";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const BlogDetails = () => {

  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/news/${id}`);
        setNews(response.data.news);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchNews();
  }, [id]);





  if (!news) {
    return <div>Loading...</div>;
  }

  console.log(JSON.stringify(news.commentNews));
  /*for (var i = 0; i < news.commentNews.length; i++) {
    const [comment, setComment] = useState(null);    
      const fetchComment = async () => {
        try {
          const response = await axios.get(`/comment/${news.commentNews._id}`);
          setComment(response.data.comment);
        } catch (error) {
          console.error(error);
        }
      };

    



    console.log(i)
  }*/

  return (
    <section className="blog-details">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <BlogDetailsMain news={news} />

        {/*   <CommentOne comments={comments} news={news} /> */} 

          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default BlogDetails;
