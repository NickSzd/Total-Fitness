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
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;



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
        <div className="profileHeader">
          <div
            className="profilePicture"
            style={{
              fontWeight: "Bold",
              fontSize: "24",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AccountCircle sx={{ ...Style.accountBox, fontSize: "150px" }} />
          </div>
          <div className="profileOptions">
            <div
              className="profileUserName"
              id="profileUserName"

              style={{
                float: "",
                fontWeight: "Bold",
                fontSize: "24",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
            </div>
            <br></br>
            <div
              className="profileUserEmail"
              id="profileUserEmail"
              style={{
                fontWeight: "Bold",
                fontSize: "24",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
            </div>
            <br></br>
            <div
              className="profileUserBlurb"
              id="profileUserBlurb"
              style={{
                fontWeight: "Bold",
                fontSize: "24",
                display: "flex",
                justifyContent: "center",
                alignItems: "right",
              }}
            >
              {" "}
            </div>
            <script>
              {
                // This is really fuckign dumb but I can't figure out another way to do this
                onAuthStateChanged(auth, (user) => {
                  if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/auth.user
                    const uid = user.uid;
                    console.log("emailll ", user.email);
                    console.log(user.email);
                    const userName = user.displayName;
                    console.log("display Name: ", user.displayName);
                    const userEmail = user.email;
                    const userBlurb = "Light Weight";

                    var nameOutput = document.getElementById("profileUserName");
                    var emailOutput =
                      document.getElementById("profileUserEmail");
                    var blurbOutput =
                      document.getElementById("profileUserBlurb");

                    nameOutput.innerText = user.displayName.style.fontSize =
                      "x-large";
                    emailOutput.innerText = user.email;
                    blurbOutput.innerText = "userBlurb";
                  } else {
                    // User is signed out
                    console.log(user.email);
                    const userName = "DEFAULT NAME";
                    const userEmail = "DEFAULT EMAIL";
                    const userBlurb = "Light Weight";

                    var nameOutput = document.getElementById("profileUserName");
                    var emailOutput =
                      document.getElementById("profileUserEmail");
                    var blurbOutput =
                      document.getElementById("profileUserBlurb");
                    nameOutput.style.fontFamily = "Arial";

                    nameOutput.innerText = userName;
                    emailOutput.innerText = userEmail;
                    blurbOutput.innerText = userBlurb;
                  }
                })
              }
            </script>
            <br></br>
            <div
              className="buttonDiv"
              id="buttonDiv"
              style={{
                fontWeight: "Bold",
                fontSize: "24",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="contained" onClick={openProfileForm}>
                Edit Profile
              </Button>

            </div>

            <hr></hr>
            <div
              className="achievementDiv"
              id="achievementDiv"
              style={{
                fontWeight: "Bold",
                fontSize: "24",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Achievements</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="right-div" style={{ border: "1px solid grey" }}>
        <div className="profileBody">
          <h1>Your Data</h1>
          <div className="profileData">
            <h1>Profile Data</h1>
          </div>
          <div className="profileMetrics">
            <h1>Profile Metrics</h1>
            {/* 
              - activityLevel
              - currweigth
              - gender
              - height
              - mainGoal
            */}
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
