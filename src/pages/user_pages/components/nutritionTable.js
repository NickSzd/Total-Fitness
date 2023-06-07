// https://mui.com/joy-ui/react-table/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../../config/firebase";
import {
  getDocs,
  collection,
  where,
  query,
  getDoc,
  doc,
  deleteDoc,
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

function NutritionTable({ selectedDate, setPieData }) {
  const ctx = useContext(SharedContext);
  const history = useNavigate();
  dayjs.extend(utc);
  const [nutrition, setNutrition] = useState([{}]);
  const [totals, setTotals] = useState({
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
  });
  const userRef = doc(db, "users", ctx.user.uid);
  const nutritionRef = collection(userRef, "nutrition");
  const q = query(
    nutritionRef,
    where("day", ">=", selectedDate.startOf("day").toDate()),
    where("day", "<", selectedDate.endOf("day").add(1, "second").toDate())
  );
  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  async function deletfood(id) {
    //console.log(id);
    const nutritionDoc = doc(nutritionRef, id);
    await deleteDoc(nutritionDoc);
  }

  useEffect(() => {
    if (loading) {
      return;
    }

    const newTotal = {
      calories: 0,
      fat: 0,
      carbohydrates: 0,
      protein: 0,
    };

    const nutrition = value.docs.map((doc) => {
      // console.log("hello1",doc.id);
      newTotal.calories = parseFloat(
        (doc.data().calories + newTotal.calories).toFixed(2)
      );
      newTotal.fat = parseFloat((doc.data().fat + newTotal.fat).toFixed(2));
      newTotal.carbohydrates = parseFloat(
        (doc.data().carbohydrates + newTotal.carbohydrates).toFixed(2)
      );
      newTotal.protein = parseFloat(
        (doc.data().protein + newTotal.protein).toFixed(2)
      );
      return { id: doc.id, ...doc.data() };
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
    setNutrition(nutrition);
    setPieData(newPieData);
  }, [ctx.user.uid, history, loading, setPieData, value]);

  return (
    <>
      {!loading ? (
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
                      <td>
                        <Button
                          sx={{ ml: 9 }}
                          variant="contained"
                          disableElevation
                          onClick={() => {
                            deletfood(data.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
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
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="lg" />
        </Box>
      )}
    </>
  );
}
export default NutritionTable;
