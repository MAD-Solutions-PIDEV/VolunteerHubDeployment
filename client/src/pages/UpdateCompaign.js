import React from 'react';
import UpdateCampaignForm from 'components/CampaignArea/UpdateCampaign';
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
const UpdateCampaignPage = () => {
  return (
    
 <Layout>
<Header />
<PageTitle title="Update Campaign" />
      <UpdateCampaignForm/>
  </Layout>
  );
};


export default UpdateCampaignPage;
