/*
This page will contain the landig page for the website
Reqs
    - User login
    - General Information about the app
        - features
            - Describe two main aspects fo the app nutriciton and fitness
    - Maybe some user interaction
*/

import React from "react";
import "../App.css";
//import "../Home.css";

function Home() {
  // Sets Up the Menu Button
  /*
  For Now this is a tempory button that will allow access to 
    User Home
    Fitness Home
    Nutrition Home
    Landing Page
  Eventually this will be for contact, info, and about
  */
  console.log("HOME");
  return (
    <div
      className="main"
      style={{
        color: "blue",
        width: "fit-content",
        margin: "auto",
      }}
    >
      <h1>Total Fitness</h1>
      <strong style={{ color: "black" }}>
        {" "}
        The Complete Fitness Application
      </strong>
      <h1>Access the page you are working on with the menu</h1>
      <div className="body">
        When You Start Working on Your page do the following
        <ol>
          <li>Pull the latest Version from git</li>
          <li>Create a branch titled with the page you are working on</li>
          <li>Make sure you are on that branch before you start working</li>
          <li>When you push make sure to add someone to review your request</li>
        </ol>
      </div>
    </div>
  );
}
export default Home;
