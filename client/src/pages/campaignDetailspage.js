import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";
import CampaignDetail from "components/CampaignArea/campaignDetail";

const CampaignDetailspage = () => {
  return (
    <Layout>
      <Header />
      <PageTitle title="News" />
      <CampaignDetail />
    </Layout>
  );
};

export default CampaignDetailspage;
