import CtaOrganizationArea from "components/Organization/OrganizationArea/ctaOrg";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
import OrganizationMainArea from "components/Organization/OrganizationArea/OrganizationMainArea";
import React from "react";

const OrganizationsList = () => {
  document.title = "Organizations List";

  return (
    <Layout>
      <Header />
      <PageTitle title="Organizations" parent="" />
      <OrganizationMainArea
        className="about-team-main-area team-page-area"
        count={6}
      />
      <CtaOrganizationArea />
    </Layout>
  );
};

export default OrganizationsList;
