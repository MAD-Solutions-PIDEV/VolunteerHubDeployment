import React from "react";

const AuthRedirectPage = () => {
  // Parse the query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);

  // Retrieve the token string from the query parameters
  // Retrieve the encoded data from the query parameters
  const encodedData = queryParams.get("data");

  if (encodedData) {
    // Decode the JSON string and extract the user and token information
    const data = JSON.parse(decodeURIComponent(encodedData));
    const { user, token } = data;

    // Save the user and token to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    // Redirect to the dashboard page
    //navigate("https://volunteerhub.onrender.com/");
    window.location.href = "https://volunteerhub.onrender.com/";
  }

  return <div>Redirecting...</div>;
};

export default AuthRedirectPage;
