/*
About page

This page will have information about us the frameworks we used
and otehr technical feature sof the app
ie
"Our revolutionary app uses the XY api to accomplish ABC"
src/UserPage.css
*/
import React, { useState } from "react";
import "../../UserPage.css";
import { Style } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { db } from "../../config/firebase";
import {
  getDoc,
  collection,
  addDoc,
  setDoc,
  doc,
  some,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import SharedContext from "./components/SharedContext";

//import PieChartComponent from "./components/pieChart";
//import PieCaloriesComponent from "./components/pieCalories";
import PressableCardBoards from "./components/workOutTable";
import NutritionHome from "./NutritionHome";
import UserCalendar from "./components/userCalendar";

const drawerWidth = 240;
const userPages = ["Home", "Fitness", "Nutrition"]; // Holds Items for navbar
const settings = ["Profile", "Account", "Dashboard", "Logout"]; // items for user profile

function UserHome(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mainGoal, setMainGoal] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  /*
  Configures the drawer so that the user can access user pages
  */
 /*
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {userPages.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
*/
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [activeTab, setActiveTab] = useState(1);
  const tabs = (index) => {
    setActiveTab(index);
  };
  console.log("hello1");
  async function GetUsername(){
    const ctx = useContext(SharedContext);
    const userRef = doc(db, "users", ctx.user.uid);
    //const docRef = doc(db, "users").;
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      // console.log("Am I inside");
      // console.log("Document data:", docSnap.data().userName);
      setUserName(docSnap.data().userName);
      setEmail(docSnap.data().email);
      setMainGoal(docSnap.data().mainGoal);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  GetUsername();
  console.log("hello2");
  // const ctx = useContext(SharedContext);
  // const userRef = doc(db, "users", ctx.user.uid);
  // const [value, loading, error] = useCollection(
  //   collection(userRef, "users"),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );
  // console.log(value);
  return (
    <div>
      <div className="profile-header">
        <AccountCircle sx={{ ...Style.accountBox, fontSize: "250px" }} />
        <div className="user-name">
          <h3>UserName: {userName}</h3>
          <div className="user-bio">
            <p className="bio">
              The main goal I want to achieve is {mainGoal}
            </p>
            <div className="user-mail">
              <p>Email: {email}</p>
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
              onClick={() => tabs(1)}
              className={
                activeTab === 1 ? "active user-nutrition" : "user-nutrition"
              }
              style={{ color: "white" }}
            >
              Nutrition
            </li>
            <li
              onClick={() => tabs(2)}
              className={
                activeTab === 2 ? "active user-workout" : "user-workout"
              }
              style={{ color: "white" }}
            >
              Workout
            </li>
            <li
              onClick={() => tabs(3)}
              className={
                activeTab === 3 ? "active user-calendar" : "user-calendar"
              }
              style={{ color: "white" }}
            >
              Calendar
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === 1 && <NutritionHome />}
            {activeTab === 2 && (
              <div>
                <PressableCardBoards />
              </div>
            )}
            {activeTab === 3 && (
              <div className="daily-preview-calendar">
                <UserCalendar />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
