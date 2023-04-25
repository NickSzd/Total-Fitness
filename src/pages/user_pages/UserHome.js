/*
About page

This page will have information about us the frameworks we used
and otehr technical feature sof the app
ie
"Our revolutionary app uses the XY api to accomplish ABC"
*/

import React, { useState } from "react";
import "../../UserPage.css";
import { Style } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import NutritionTable from "./components/nutritionTable";
import PieChartComponent from "./components/pieChart"
import PieCaloriesComponent from "./components/pieCalories"

function UserHome() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="profile-header">
        <AccountCircle sx={{ ...Style.accountBox, fontSize: "250px" }} />
        <div className="user-name">
          <h3>Username</h3>

          <div className="user-bio">
            <p className="bio">
              {" "}
              I want to improve my shirt size, so I want to go to gym.{" "}
            </p>
            <div className="user-mail">
              <p>xlismysize@ucsc.edu</p>
              <div className="change-profile-btn">
                <button>
                  <i></i> change profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="nav">
          <ul>
            <li
              onClick={() => tabs(0)}
              className={activeTab === 0 ? "active user-goal" : "user-goal"}
            >
              Goal
            </li>
            <li
              onClick={() => tabs(1)}
              className={
                activeTab === 1 ? "active user-nutrition" : "user-nutrition"
              }
            >
              Nutrition
            </li>
            <li
              onClick={() => tabs(2)}
              className={
                activeTab === 2 ? "active user-workout" : "user-workout"
              }
            >
              Workout
            </li>
            <li
              onClick={() => tabs(3)}
              className={
                activeTab === 3 ? "active user-calendar" : "user-calendar"
              }
            >
              Calendar
            </li>
            <li
              onClick={() => tabs(4)}
              className={
                activeTab === 4 ? "active user-summary" : "user-summary"
              }
            >
              Summary
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === 0 && (
              <div>
                <PieChartComponent />
                <PieCaloriesComponent />
              </div>
            )}
            {activeTab === 1 && (
              <NutritionTable />
            )}
            {activeTab === 2 && (
              <div className="daily-preview-workout">
                <p>situp 1 EA</p>
              </div>
            )}
            {activeTab === 3 && (
              <div className="daily-preview-calendar">
                <p>november</p>
              </div>
            )}
            {activeTab === 4 && (
              <div className="daily-preview-summary">
                <p>u fucked</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
