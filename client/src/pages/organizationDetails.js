import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import OrganizationDetailsArea from "components/Organization/OrganizationsDetails/OrganizationDetailsArea";
import OrganizationDetailsContent from "components/Organization/OrganizationsDetails/OrganizationDetailsContent";
import PageTitle from "components/Reuseable/PageTitle";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const SingleOrganization = () => {
  const location = useLocation();
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axios.get(
          `https://volunteerhub-backend.onrender.com/organizations/org/${id}`
        );
        setOrganization(response.data);
        console.log(organization);
      } catch (error) {
        console.log(error);
      }
    };
    if (!location.state) {
      fetchOrganization();
    } else {
      setOrganization(location.state);
    }
  }, [id, location.state]);

  useEffect(() => {
    if (organization) {
      document.title = organization.name;
    }
  }, [organization]);

  if (!organization) {
    return (
      <Layout>
        <p>Loading organization details...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <PageTitle title="Details" page="Organizations" />
      <OrganizationDetailsArea organization={organization} />
      <OrganizationDetailsContent organization={organization} />
    </Layout>
  );
};

export default SingleOrganization;
