import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import NewsPage from "components/VolunteerNews/NewsPage"
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";

const News = () => {
  return (
    <Layout>
      <Header />
      <PageTitle title="News" />
      <NewsPage className="news-2-area news-page-area" newsTwo newsPage />
    </Layout>
  );
};

export default News;
