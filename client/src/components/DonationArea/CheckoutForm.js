import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./DonationForm";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
const stripePromise = loadStripe("pk_test_51MuaySCoH0bMJevV3NNMsI0CdLsKepPmIJySgcTPuXRCiIjjriLvqCk8E1eVdDWoY3huhY3oE8NPl62JpkuO7QmD00PqdyonSt");


const StripeWrapper = () => {
  return (
    <Layout>
    <Header />
    <PageTitle title="Donation Form"  />
    <Elements stripe={stripePromise}>
      <PaymentForm/>
    </Elements>
    </Layout>
  );
};

export default StripeWrapper;
