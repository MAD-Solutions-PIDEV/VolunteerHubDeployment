import UpdateInfoArea from "components/UpdateUserInfo/UpdateInfoArea";
import UpdateMap from "components/UpdateUserInfo/UpdateMap";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
import UpdateFormArea from "components/UpdateUserInfo/UpdateFormArea";
import React from "react";
import UpdateHostArea from "components/UpdateHost/UpdateHostArea";

const UpdateHost = () => {
  document.title = "Update your profile";
  return (
    <Layout>
      <Header />
      <PageTitle title="Update your profile" />
      <UpdateHostArea />
 
    </Layout>
  );
};

export default UpdateHost;