import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import MissionDetailsArea from "components/MissionArea/MissionDetails/MissionDetailsArea";
import MissionDetailsContent from "components/MissionArea/MissionDetails/MissionDetailsContent";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";

const SingleMission = () => {
  document.title = "Explore Missions";
  return (
    <Layout>
      <Header />
      <PageTitle title="Explore Missions" page="Explore" />
      <MissionDetailsArea />
      <MissionDetailsContent />
    </Layout>
  );
};

export default SingleMission;