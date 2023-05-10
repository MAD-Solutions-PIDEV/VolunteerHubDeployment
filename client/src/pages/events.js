import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import ExploreProjectsThree from "components/ProjectsArea/ExploreProjectsThree";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";

const Events = () => {
  return (
    <Layout>
      <Header />
      <PageTitle title="Upcoming events..." />
      <ExploreProjectsThree />
    </Layout>
  );
};

export default Events;
