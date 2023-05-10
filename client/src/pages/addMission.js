import UpdateInfoArea from "components/UpdateUserInfo/UpdateInfoArea";
import UpdateMap from "components/UpdateUserInfo/UpdateMap";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";
import AddMissionArea from "components/AddMission/AddMissionArea";

const AddMission = () => {
  document.title = "Add Mission";
  return (
    <Layout>
      <Header />
      <PageTitle title="Add Mission" />
      <AddMissionArea />
 
    </Layout>
  );
};

export default AddMission;