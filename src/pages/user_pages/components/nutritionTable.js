// https://mui.com/joy-ui/react-table/

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
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DatePicker } from "@mui/x-date-pickers";
import { Grid } from "@mui/joy";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

function NutritionTable({ selectedDate, setPieData }) {
  const history = useNavigate();
  dayjs.extend(utc);
  const [nutrition, setNutrition] = useState([{}]);
  const [totals, setTotals] = useState({
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
  });

  useEffect(() => {
    const getNutrition = async (user) => {
      const userRef = doc(db, "users", user);
      const nutritionRef = collection(userRef, "nutrition");
      const q = query(
        nutritionRef,
        where("day", ">=", selectedDate.startOf("day").toDate()),
        where("day", "<", selectedDate.endOf("day").add(1, "second").toDate())
      );
      try {
        const nutritionData = (await getDocs(q)).docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        totals.calories = 0;
        totals.fat = 0;
        totals.carbohydrates = 0;
        totals.protein = 0;
        const newTotal = totals;
        nutritionData.forEach((macro) => {
          newTotal.calories += macro.calories;
          newTotal.fat += macro.fat;
          newTotal.carbohydrates += macro.carbohydrates;
          newTotal.protein += macro.protein;
        });
        const newPieData = [
          { name: "Fat", value: 0, fill: "#8884d8" },
          { name: "Carbohydrate", value: 0, fill: "#82ca9d" },
          { name: "Protein", value: 0, fill: "#ffc658" },
        ];
        newPieData[0].value = newTotal.fat;
        newPieData[1].value = newTotal.carbohydrates;
        newPieData[2].value = newTotal.protein;
        setTotals(newTotal);
        setNutrition(nutritionData);
        setPieData(newPieData);
      } catch (err) {
        console.log(err);
      }
    };
    const auth = getAuth();
    const loggedInUser = auth.currentUser;
    if (!loggedInUser) {
      history("/Login", { replace: true });
    } else {
      getNutrition(loggedInUser.uid);
    }
  }, [history, selectedDate, setPieData, totals]);

  return (
    <>
      <Sheet sx={{ height: "auto", overflow: "auto" }}>
        <Table stickyHeader hoverRow>
          <thead>
            <tr>
              <th>Meal</th>
              <th>Calories</th>
              <th>Fat (g)</th>
              <th>Carbs (g)</th>
              <th>Protein (g)</th>
            </tr>
          </thead>
          <tbody>
            {nutrition[0] && Object.keys(nutrition[0].length > 0)
              ? nutrition.map((data) => (
                  <tr key={data.id + data.meal}>
                    <td>{data.meal}</td>
                    <td>{data.calories}</td>
                    <td>{data.fat}</td>
                    <td>{data.carbohydrates}</td>
                    <td>{data.protein}</td>
                  </tr>
                ))
              : null}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Totals</th>
              <td>{totals.calories}</td>
              <td>{totals.fat}</td>
              <td>{totals.carbohydrates}</td>
              <td>{totals.protein}</td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
    </>
  );
}
export default NutritionTable;
