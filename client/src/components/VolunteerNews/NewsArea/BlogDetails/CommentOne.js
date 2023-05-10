import { Col, Container, Image, ProgressBar, Row } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";

const CommentOneSingle = ({ comment = {} }) => {
  const { image, name, date, text } = comment;

  return (
    <div className="comment-one__single">
      <div className="comment-one__image">
        <Image src={require(`assets/images/${image}`)} alt="" />
      </div>
      <div className="comment-one__content">
        <h3>
          {name} <span className="comment-one__date"> {date}</span>
        </h3>
        <p>{text}</p>
      </div>
      <div className="blog-btn">
        <a href="#" className="main-btn">
          Reply
        </a>
      </div>
    </div>
  );
};

const CommentOne = ({ comments = [], className = "", news }) => {
  const [commentData, setCommentData] = useState({
    text: "",
    user: "",
    news: "",
  });
  async function handleSubmit(event) {
    const userId = "643f432da18638e948bb1b36";
    const newsId = news._id;
    if (event) {
      event.preventDefault();
    }
    const message = event.target.message.value;

    await axios
      .post(
        "https://volunteerhub-backend.onrender.com/commentNews/addComment/",
        {
          userId: userId,
          newsId: newsId,
          text: message,
        }
      )
      .then((response) => {
        // Handle success
        console.log("Comment added successfully", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding comment", error);
      });
  }

  return (
    <div className={`comment-one ${className}`}>
      <h3 className="comment-one__block-title">{comments.length} Comments</h3>
      {comments.map((comment) => (
        <CommentOneSingle comment={comment} key={comment.id} />
      ))}
      <div className="comment-form me-1">
        <h3 className="comment-one__block-title">Leave a Comment</h3>
        <form
          style={{
            padding: "0rem 0rem",
            display: "flex",
            alignItems: "stretch",
          }}
          onSubmit={handleSubmit}
          className="contact-one__form"
        >
          <Row>
            <Col lg={12}>
              <div className="input-box">
                <textarea
                  placeholder="Write Comment"
                  name="message"
                  value={commentData.text}
                  onChange={(event) =>
                    setCommentData({ ...commentData, text: event.target.value })
                  }
                ></textarea>
              </div>
            </Col>
            <Col lg={12} className="text-left">
              <div className="input-box">
                <button type="submit" className="main-btn">
                  Submit comment
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default CommentOne;
