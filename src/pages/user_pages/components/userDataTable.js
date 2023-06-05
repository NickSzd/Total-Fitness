import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { db } from "../../../config/firebase";
import {
  getDocs,
  collection,
  where,
  query,
  getDoc,
  doc,
  getFirestore,
  DocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DatePicker } from "@mui/x-date-pickers";
import { Grid } from "@mui/joy";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useContext } from "react";
import SharedContext from "./SharedContext";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/material/Box";
import { useCollection } from "react-firebase-hooks/firestore";
import "firebase/compat/firestore";
// import user from "../UserProfile";

const auth = getAuth();

function UserDataTable() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userCollectionRef = doc(collection(db, "users"), user.uid);
        const userDoc = await getDoc(userCollectionRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData(userData);
        }
      }
    };

    fetchData();
  }, []);
  //window.onload = UserDataTable;
  if (!userData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="table" style={{ borderSpacing: "30px" }}>
      <table>
        <thead></thead>
        <tbody>
          {/* <tr>
            <td>Gender {userData.gender}</td>
          </tr> */}
          <tr>
            <td>Weight Goal: {userData.goalWeight}</td>
          </tr>
          <tr>
            <td>Fitness Goal: {userData.mainGoal}</td>
          </tr>
          <tr>
            <td>Current: Weight {userData.currWeight}</td>
          </tr>
          <tr>
            <td>
              Your Height: {userData.heightFeet}' {userData.heightInch}"
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserDataTable;
