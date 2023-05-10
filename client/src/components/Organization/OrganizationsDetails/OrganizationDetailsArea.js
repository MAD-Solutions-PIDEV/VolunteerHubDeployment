import { projectDetailsArea } from "data/projectsArea";
import React, { useState, useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import OrganizationService from "services/organizationService";

const {
  thumb,
  flag,
  tagline,
  country,
  title,
  pledged,
  backers,
  daysLeft,
  raised,
  goal,
  socials,
} = projectDetailsArea;

const OrganizationDetailsArea = ({ organization }) => {
  const [isMember, setIsMember] = useState(false);
  const [members, setMembers] = useState(organization.members.length);

  const user = JSON.parse(localStorage.getItem("user"));

  const shouldShowJoinButton = !user || user.id !== organization.owner;

  const daysSinceCreation = OrganizationService.getDaysSinceCreation(
    organization.createdAt
  );
  useEffect(() => {
    if (user) {
      OrganizationService.checkMembership(user.id, organization._id).then(
        (response) => {
          setIsMember(response.data.isMember);
        }
      );
    }
  }, [user, organization._id]);

  const handleJoinClick = () => {
    if (isMember) {
      OrganizationService.removeMember(organization._id, user.id).then(
        (response) => {
          setIsMember(false);
          setMembers(members - 1);
        }
      );
    } else {
      OrganizationService.addMember(organization._id, user.id).then(
        (response) => {
          setIsMember(true);
          setMembers(members + 1);
        }
      );
    }
  };

  return (
    <section className="project-details-area pt-120 pb-190">
      <Container>
        <Row>
          <Col lg={7}>
            <div className="project-details-thumb">
              <Image
                src={`http://localhost:4000/uploads/${organization.logo}`}
                alt=""
                style={{ width: "400px", height: "auto" }}
              />
            </div>
          </Col>
          <Col lg={5}>
            <div className="project-details-content">
              <h3 className="title">{organization.name}</h3>
              <div className="project-details-item">
                <div className="item text-center">
                  <h5 className="title">${pledged}</h5>
                  <span>Pledged</span>
                </div>
                <div className="item text-center">
                  <h5 className="title">{members}</h5>
                  <span>Members</span>
                </div>
                <div className="item text-center">
                  <h5 className="title">{daysSinceCreation}</h5>
                  <span>Days Since joined</span>
                </div>
              </div>

              {shouldShowJoinButton ? (
                <div className="project-btn mt-25">
                  {user ? (
                    <a className="main-btn" href="#" onClick={handleJoinClick}>
                      {isMember ? "Unjoin" : "Join Us"}
                    </a>
                  ) : (
                    <a className="main-btn" href="/login">
                      Join Us
                    </a>
                  )}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OrganizationDetailsArea;
