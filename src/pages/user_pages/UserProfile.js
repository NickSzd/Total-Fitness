/*
About page

This page will have information about us the frameworks we used
and otehr technical feature sof the app
ie
"Our revolutionary app uses the XY api to accomplish ABC"
*/
import { AccountCircle } from "@mui/icons-material";
import { Style } from "@mui/icons-material";
import { Button } from "@mui/material";

import React from "react";
import "../../UserProfile.css";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
console.log(user);
if (user) {
  console.log(user.email);
  const userName = user.displayName;
  const userEmail = user.email;
  const userBlurb = "Light Weight";

  var nameOutput = document.getElementById("profileUserName");
  var emailOutput = document.getElementById("profileUserEmail");
  var blurbOutput = document.getElementById("profileUserBlurb");

  nameOutput.innerText = userName;
  emailOutput.innerText = userEmail;
  blurbOutput.innerText = userBlurb;
}

function openProfileForm() {
  document.getElementById("profileForm").style.display = "block";
}
function closeProfileForm() {
  document.getElementById("profileForm").style.display = "none";
}

function UserProfile() {
  return (
    <div className="profileDiv">
      <div className="left-div">
        left
        <div className="profileHeader">
          <div className="profilePicture">
            <AccountCircle sx={{ ...Style.accountBox, fontSize: "150px" }} />
          </div>
          <div className="profileOptions">
            <div className="profileUserName" id="profileUserName">
              <h1>Name</h1>
            </div>
            <div className="profileUserEmail" id="profileUserEmail">
              <h1>Email</h1>
            </div>
            <div className="profileUserBlurb" id="profileUserBlurb">
              <h1>Blurb</h1>
            </div>
            <Button variant="contained" onClick={openProfileForm}>
              Edit Profile
            </Button>
            <hr></hr>
            <h1>Achievements</h1>
            {/* <div className="profileForm" id="myProfileForm">
              <form>
                <h3>Edit Your Data</h3>
                <input
                  type="text"
                  id="FirstName"
                  placeholder="First Name"
                  name="firstName"
                />
                <input
                  type="text"
                  id="LastName"
                  placeholder="Last Name"
                  name="lastName"
                />
                <input
                  type="email"
                  id="userEmail"
                  placeholder="Your Email"
                  name="userEmail"
                />
                <input
                  type="integer"
                  id="heightFeet"
                  placeholder="Hight in Feet"
                  name="heightFeet"
                />
                <input
                  type="integer"
                  id="heightInches"
                  placeholder="Hight Inches"
                  name="heightInches"
                />
                <input
                  type="float"
                  id="userWeight"
                  placeholder="Weight in Lbs"
                  name="userWeight"
                />
                <button type="submit" className="button">
                  Save Changes
                </button>
                <button
                  type="submit"
                  className="button"
                  onClick={closeProfileForm}
                >
                  Ignore Changes
                </button>
              </form>
            </div> */}
          </div>
        </div>
      </div>
      <div className="right-div">
        right
        <div className="profileBody">
          <h1>Profile Body</h1>
          <div className="profileData">
            <h1>Profile Data</h1>
          </div>
          <div className="profileMetrics">
            <h1>Profile Metrics</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

// const About = () => {
//   return (
//     <div>
//       <h1>About Page</h1>
//     </div>
//   );
// };

export default UserProfile;
