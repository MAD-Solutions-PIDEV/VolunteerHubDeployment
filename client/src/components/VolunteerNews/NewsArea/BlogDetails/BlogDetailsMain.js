import { blogDetailsMain } from "data/newsArea";
import React, { Fragment } from "react";
import { Image } from "react-bootstrap";

const { image, date, admin, comments, title, text1, text2, tags, socials } =
  blogDetailsMain;

const BlogDetailsMain = ({ news }) => {
  const date = new Date(news.createdAt);
  const formattedDate = date.toISOString().slice(0, 10);
  return (
    <div className="blog-details__main">
      <div className="blog-details__image">
        {/* {news.author == "Admin" && (
          <Image
            src={require(`https://volunteerhub-backend.onrender.com/uploads/images/${news.imageNews}`)}
            alt="thumb"
            style={{ width: "600px", height: "400px" }}
          />
        )} */}
        {news.author == "United nations" && (
          <Image
            src={news.imageNews}
            alt="thumb"
            style={{ width: "600px", height: "400px" }}
          />
        )}
        {news.author == "BBC" && (
          <Image
            srcset={news.imageNews}
            alt="thumb"
            style={{ width: "600px", height: "400px" }}
          />
        )}
      </div>
      <div className="blog-details__content">
        <span>{formattedDate}</span>
        <div className="blog-one__meta">
          <a href="#">
            <i className="fa fa-user-o"></i> {news.author}
          </a>
          <a href="#">
            <i className="fa fa-comments-o"></i> {comments} comments
          </a>
        </div>
        <h3>{news.title}</h3>
        <p>{news.description}</p>
      </div>
      <div className="blog-details__meta"></div>
    </div>
  );
};

export default BlogDetailsMain;
