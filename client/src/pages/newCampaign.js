import React from 'react';
import CampaignForm from 'components/CampaignArea/newCampaignForm';
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
const CampaignPage = () => {
  return (
    
 <Layout>
<Header />
<PageTitle title="Create New Campaign" />
      <CampaignForm/>
  </Layout>
  );
};


export default CampaignPage;
