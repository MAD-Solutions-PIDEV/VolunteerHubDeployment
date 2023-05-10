import ExploreCampaignThree from "components/DonationArea/ExploreCampaignThree";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";

import PageTitle from "components/Reuseable/PageTitle";
import React from "react";

const DonationCampaign = () => {
  return (
    <Layout>
      <Header />
      <PageTitle title="Campaigns" />
      <ExploreCampaignThree />
    </Layout>
  );
};

export default DonationCampaign;