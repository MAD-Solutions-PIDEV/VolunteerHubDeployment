import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import HostArea from "components/DisplayHostArea/HostArea";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";
import { Title } from "chart.js";

const Hosts = () => {
  document.title = "Hosts List";
  return (
    <Layout>
      
      <Header />
      <PageTitle title="Hosts List" 

      />
    
      <HostArea />

    </Layout>
    
  );
};

export default Hosts;
