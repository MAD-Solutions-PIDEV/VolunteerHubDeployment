import { organizationDetailsTabBtns } from "data/organization";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import OrganizationDetailsSettings from "./OrganizationDetailsSettings";
import OrganizationDetailsSidebar from "./OrganizationDetailsSidebar";
import OrganizationDetailsStory from "./OrganizationDetailsStory";
import OrganizationDetailsEvents from "./OrganizationDetailsEvents";
import OrganizationDetailsCampaigns from "./OrganizationDetailsCampaigns";

const OrganizationDetailsContent = ({ organization }) => {
  const [current, setCurrent] = useState("pills-home");
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [checkOrganizationOwner, setCheckOrganizationOwner] = useState(false);
  //console.log(organizationDetailsTabBtns);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setCheckOrganizationOwner(
      loggedUser !== null && organization.owner === loggedUser.id
    );
  }, [localStorage.getItem("user"), organization.owner]);

  const getClassName = (id = "") => {
    const active = current === id;
    return `tab-pane animated${active ? " fadeIn show active" : ""}`;
  };
  let filteredTabBtns = organizationDetailsTabBtns.filter((tabBtn) => {
    if (
      tabBtn.id === "pills-4" &&
      (!loggedUser || loggedUser.id !== organization.owner)
    ) {
      return false;
    } else {
      return true;
    }
  });

  return (
    <section className="project-details-content-area pb-110">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="tab-btns">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                {filteredTabBtns.map(({ id, name }) => (
                  <li key={id} className="nav-item" role="presentation">
                    <a
                      onClick={() => setCurrent(id)}
                      className={`nav-link cursor-pointer${
                        id === current ? " active" : ""
                      }`}
                      role="tab"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <OrganizationDetailsStory
                getClassName={getClassName}
                organization={organization}
              />
              <OrganizationDetailsEvents
                getClassName={getClassName}
                organization={organization}
              />
              <OrganizationDetailsCampaigns
                getClassName={getClassName}
                organization={organization}
              />

              <OrganizationDetailsSettings
                getClassName={getClassName}
                organization={organization}
              />
            </div>
          </Col>
          <Col lg={4} md={7} sm={9}>
            <OrganizationDetailsSidebar organization={organization} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OrganizationDetailsContent;
