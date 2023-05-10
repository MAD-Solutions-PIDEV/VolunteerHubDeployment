import UpdateInfoArea from "components/UpdateUserInfo/UpdateInfoArea";
import UpdateMap from "components/UpdateUserInfo/UpdateMap";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
import UpdateFormArea from "components/UpdateUserInfo/UpdateFormArea";
import React from "react";

const Update = () => {
  document.title = "Update your profile";

  return (
    <Layout>
      <Header />
      <PageTitle title="Update your profile" />
      <UpdateFormArea />
      <UpdateInfoArea />
      <UpdateMap />
    </Layout>
  );
};

export default Update;
