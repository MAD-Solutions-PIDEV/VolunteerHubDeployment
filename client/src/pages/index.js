import BannerSlider from "components/BannerSlider/BannerSlider";
import BrandArea from "components/BrandArea/BrandArea";
import Categories from "components/Categories/Categories";
import CtaArea from "components/CtaArea/CtaArea";
import FunFacts from "components/FunFacts/FunFacts";
import GuideArea from "components/GuideArea/GuideArea";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import EventArea from "components/EventArea/EventArea";
import ProjectsArea from "components/ProjectsArea/ProjectsArea";
import TeamArea from "components/TeamArea/TeamArea";
import TeamMainArea from "components/TeamArea/TeamMainArea";
import HomeExploreCampaign from "components/DonationArea/HomeExploreCampaign";
import React from "react";
import ClientArea from "components/ClientArea/ClientArea";

const Home = () => {
  return (
    <Layout>
      <Header />
      <BannerSlider />
      <ClientArea />
      <HomeExploreCampaign/>
      <Categories />
      <CtaArea />
     
     
     
      
      <TeamArea />
      <TeamMainArea />
    
    </Layout>
  );
};

export default Home;
