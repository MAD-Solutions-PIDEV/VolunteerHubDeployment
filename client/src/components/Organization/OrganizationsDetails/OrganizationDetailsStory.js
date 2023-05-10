import { projectDetailsStory } from "data/projectsArea";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";

const { id } = projectDetailsStory;

const OrganizationDetailsStory = ({ getClassName, organization }) => {
  const sdgsArray = organization.sdg_classification.split(", ");
  const getImageSrc = (sdg) => {
    const lastChar = sdg.charAt(sdg.length - 1);
    const secondLastChar = sdg.charAt(sdg.length - 2);
    if (!isNaN(Number(secondLastChar))) {
      return `http://localhost:4000/uploads/sdgs/SDG${secondLastChar}${lastChar}.png`;
    } else {
      return `http://localhost:4000/uploads/sdgs/SDG${
        Number(lastChar) + 1
      }.png`;
    }
  };
  return (
    <div className={getClassName?.(id)} id={id} role="tabpanel">
      <div className="project-details-content-top">
        <p>{organization.description}</p>
      </div>
      <div className="project-details-item">
        <h5>The issues we are addressing:</h5>
        {organization.issues.map((issue) => (
          <div className="item">
            <i className="flaticon-checkmark"></i>
            <p>{issue}</p>
          </div>
        ))}
      </div>
      <div className="project-details-item mt-4">
        <h5>The SDGs we are focusing on:</h5>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "15px" }}>
          {sdgsArray.map((sdg) => (
            <div className="item">
              <img src={getImageSrc(sdg)} style={{ width: "7rem" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailsStory;
