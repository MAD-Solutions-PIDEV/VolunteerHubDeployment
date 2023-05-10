import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import OrganizationService from "services/organizationService";
import OrganizationItem from "components/Organization/OrganizationArea/OrganizationItem";

const TeamMainArea = ({ className = "", count = 3 }) => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    async function fetchOrganizations() {
      const organizationsList =
        await OrganizationService.getListOfActiveOrganizations();
      setOrganizations(organizationsList);
    }
    fetchOrganizations();
  }, []);

  return (
    <div className={`team-main-area ${className}`}>
      <Container>
        <Row className="justify-content-center">
          {organizations.slice(0, count).map((org) => (
            <OrganizationItem key={org._id} organization={org} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TeamMainArea;
