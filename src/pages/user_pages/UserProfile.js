import { AccountCircle } from "@mui/icons-material";
import { Style } from "@mui/icons-material";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { display } from "@mui/system";
import React, { useEffect, useState } from "react";
import "../../UserProfile.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserDataTable from "./components/userDataTable";
import { db } from "../../config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

const auth = getAuth();
//const user = auth.currentUser;

function UserProfile() {
  const [open, SetOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newBlurb, setNewBlurb] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const uid = user.uid;
        const userName = user.displayName;
        const userEmail = user.email;
        const userBlurb = "Light Weight";

        // console.log("emailll ", user.email);
        // console.log(user.email);
        //console.log("display Name: ", user.displayName);

        var nameOutput = document.getElementById("profileUserName");
        var emailOutput = document.getElementById("profileUserEmail");
        var blurbOutput = document.getElementById("profileUserBlurb");

        nameOutput.innerText = userName;
        emailOutput.innerText = userEmail;
        blurbOutput.innerText = userBlurb;
      } else {
        setCurrentUser(null);
        const userName = "DEFAULT NAME";
        const userEmail = "DEFAULT EMAIL";
        const userBlurb = "Light Weight";

        var nameOutput = document.getElementById("profileUserName");
        var emailOutput = document.getElementById("profileUserEmail");
        var blurbOutput = document.getElementById("profileUserBlurb");

        nameOutput.style.fontFamily = "Arial";
        nameOutput.innerText = userName;
        emailOutput.innerText = userEmail;
        blurbOutput.innerText = userBlurb;
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpen = () => {
    SetOpen(true);
  };
  const handleClose = () => {
    window.location.reload();
    SetOpen(false);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting Revisions");
    console.log(newUserName, newWeight); //newBlurb

    const userRef = doc(db, "users", currentUser.uid);

    await updateDoc(userRef, {
      userName: newUserName,
      currWeight: newWeight,
      //blurb: newBlurb,
    });

    setNewUserName("");
    setNewWeight("");
    //setNewBlurb("");
    handleClose();
  };
  const handleUserNameChange = (event) => {
    setNewUserName(event.target.value);
  };

  const handleWeightChange = (event) => {
    setNewWeight(event.target.value);
  };

  // const handleBlurbChange = (event) => {
  //   setNewBlurb(event.target.value);
  // };

  return (
    <div>
      <div id="formContainer"></div>
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
                <Button variant="outlined" onClick={handleOpen}>
                  Edit Profile
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogContent>
                    <form onSubmit={handleFormSubmit}>
                      <TextField
                        label="User Name"
                        value={newUserName}
                        onChange={handleUserNameChange}
                        fullWidth
                      />
                      <TextField
                        label="Weight"
                        type="number"
                        value={newWeight}
                        onChange={handleWeightChange}
                        fullWidth
                      />
                      {/* <TextField
                        label="Blurb"
                        value={newBlurb}
                        onChange={handleBlurbChange}
                        fullWidth
                      /> */}
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                      </DialogActions>
                    </form>
                  </DialogContent>
                </Dialog>
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
            <div className="profileData">
              <h1>Profile Data</h1>
              <UserDataTable />
              {/* 
              - activityLevel
              - currweigth
              - gender
              - height
              - mainGoal
            */}
            </div>
            <div className="profileMetrics">
              <h1>Profile Metrics</h1>
            </div>
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
