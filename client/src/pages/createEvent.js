import EventForm from "components/EventArea/EventForm";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";
import { Navigate } from "react-router-dom";

const CreateEvent = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  if(!user){
    return <Navigate to="/login" replace />

 
}
else if(user){
  if(user.roles.includes("ROLE_ORGANIZATION")){
    return (
      <Layout>
        <Header />
        <EventForm />      
      </Layout>
    );
  }
  else {
    return <Navigate to="/" replace />
  }
}
};

export default CreateEvent;
