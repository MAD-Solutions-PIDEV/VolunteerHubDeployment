import ExploreCategoryThree from "components/CategoryArea/ExploreCategoryThree";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import ExploreProjectsThree from "components/ProjectsArea/ExploreProjectsThree";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";


const Category = () => {
  document.title = "Mission Categories";
  return (
    <Layout>
      <Header />
      <PageTitle title="Mission Categories" />
      <ExploreCategoryThree />
    </Layout>
  );
};

export default Category;