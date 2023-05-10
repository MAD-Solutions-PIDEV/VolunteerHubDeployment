import ExchangeMissionsThree from "components/ExchangeArea/ExchangeMissionsThree";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import ExploreProjectsThree from "components/ProjectsArea/ExploreProjectsThree";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";

const Exchange = () => {
  document.title = "Missions";

  return (
    <Layout>
      <Header />
      <PageTitle title="Missions " />
      <ExchangeMissionsThree />
    </Layout>
  );
};

export default Exchange;
