import { comments } from "data/newsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BlogAuthor from "./BlogAuthor";
import BlogDetailsMain from "./BlogDetailsMain";
import BlogDetailsSidebar from "./BlogDetailsSidebar";
import CommentForm from "./CommentForm";
import CommentOne from "./CommentOne";

const BlogDetails = () => {
  return (
    <section className="blog-details">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <BlogDetailsMain />
           
            <CommentOne comments={comments} />
           
          </Col>
        
        </Row>
      </Container>
    </section>
  );
};

export default BlogDetails;
