import ProfileIntroduction from "components/UserProfile/ProfileIntroduction";
import BrandAreaTwo from "components/BrandArea/BrandAreaTwo";
import FunFacts from "components/FunFacts/FunFacts";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import NextBigThing from "components/NextBigThing/NextBigThing";
import PageTitle from "components/Reuseable/PageTitle";
import TeamMainArea from "components/TeamArea/TeamMainArea";
import TestimonialsArea from "components/Testimonials/TestimonialsArea";
import TogetherArea from "components/TogetherArea/TogetherArea";
import React from "react";

import "../components/UserProfile/profile.module.css";

const Profile = () => {
  document.title = "Profile Information";
  return (
    <Layout>
      <Header />
      <secion>
        <PageTitle id="Title" title="Profile Information" parent="pages" />
      </secion>
      <ProfileIntroduction />
    </Layout>
  );
};

export default Profile;
