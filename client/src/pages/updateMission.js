import UpdateInfoArea from "components/UpdateUserInfo/UpdateInfoArea";
import UpdateMap from "components/UpdateUserInfo/UpdateMap";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
import UpdateFormArea from "components/UpdateUserInfo/UpdateFormArea";
import React from "react";
import UpdateMissionArea from "components/UpdateMission/UpdateMissionArea";

const UpdateMission = () => {
  document.title = "Update Mission Information";

  return (
    <Layout>
      <Header />
      <PageTitle title="Update Mission Information" />
      <UpdateMissionArea />
 
    </Layout>
  );
};

export default UpdateMission;