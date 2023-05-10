import React from "react";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrganizationItem = ({ organization }) => {
  const org = organization;
  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  return (
    <Col lg={4} md={7}>
      <div className="team-item mt-30">
        <div className="team-thumb">
          <Image
            src={`https://volunteerhub-backend.onrender.com/uploads/${organization.logo}`}
            alt="orgLogo"
            fluid
            style={imageStyle}
          />
          <div className="share">
            <i className="fa fa-regular fa-info"></i>

            <ul>
              <li key="1">
                <Link
                  to={{
                    pathname: `/organization/details/${organization._id}`,
                  }}
                  state={organization}
                >
                  <i className="fa fa-external-link-alt"></i>
                </Link>
              </li>
              <li key="2">
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-regular fa-globe"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="team-content text-center">
          <h5 className="title">{organization.name}</h5>
          <span>{organization.description}</span>
        </div>
      </div>
    </Col>
  );
};

export default OrganizationItem;
