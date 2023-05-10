import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import OrganizationFormArea from "components/Organization/OrganizationCreation/OrganizationForm";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";
import { Navigate } from "react-router-dom";

const OrganizationForm = () => {
  document.title = "Add Organization";
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return (
      <Layout>
        <Header />
        <PageTitle title="Add Organization" />
        <OrganizationFormArea />
      </Layout>
    );
  } else return <Navigate to="/login" replace />;
};

export default OrganizationForm;
