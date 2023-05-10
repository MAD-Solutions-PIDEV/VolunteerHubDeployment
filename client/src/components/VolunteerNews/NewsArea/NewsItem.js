import React from "react";
import { Col, Image } from "react-bootstrap";
import Link from "../../Reuseable/Link";

const NewsItem = ({ news = {}, index = 0, newsTwo = false }) => {
  const { _id, imageNews, description, title, createdAt, author } = news;
  const date = new Date(createdAt);
  const formattedDate = date.toISOString().slice(0, 10);
  const description2 = description.slice(0, 70) + "...";
  let title2 = title;
  if (title.length > 15) {
    title2 = title.slice(0, 15) + "...";
  }

  return (
    <Col lg={newsTwo ? 4 : 3} md={newsTwo ? 7 : 6}>
      <div className={`news-item mt-30${""}`}>
        <div className="news-thumb">
          {author == "Admin" && (
            <Image
              src={require(`https://volunteerhub-backend.onrender.com/uploads/images/${imageNews}`)}
              alt="news"
              style={{ width: "300px", height: "200px" }}
            />
          )}
          {author == "United nations" && (
            <Image
              src={imageNews}
              alt="news"
              style={{ width: "300px", height: "200px" }}
            />
          )}
          {author == "BBC" && (
            <Image
              srcset={imageNews}
              alt="news"
              style={{ width: "300px", height: "200px" }}
            />
          )}
        </div>
        <div className="news-content">
          <span>{formattedDate}</span>
          <ul>
            <li>
              <i className="fa fa-user-circle"></i>
              &nbsp; {author}
            </li>
            <li>
              <i></i>
            </li>
          </ul>
          {description2}
          <h3 className="title">{title2}</h3>
          <Link href={`/news/${_id}`}>
            <i className="flaticon-next"></i>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default NewsItem;
