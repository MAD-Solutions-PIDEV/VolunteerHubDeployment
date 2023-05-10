import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import CampaignsArea from "components/CampaignArea/AllCampaigns";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";

const Campaigns = () => {
  return (
    <Layout>
      <Header />
      <PageTitle title="My Campaigns" />
      <CampaignsArea className="news-2-area news-page-area" newsTwo={true} newsPage={true} />
    </Layout>
  );
};

export default Campaigns;
