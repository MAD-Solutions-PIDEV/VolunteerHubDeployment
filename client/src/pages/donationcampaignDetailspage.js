import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";
import DonationCampaignDetail from "components/DonationArea/campaignDetail";

const DonationCampaignDetailspage = () => {
  return (
    <Layout>
      <Header />
      <PageTitle title="Campaign Detail" />
      <DonationCampaignDetail />
    </Layout>
  );
};

export default DonationCampaignDetailspage;
