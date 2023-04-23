// https://mui.com/joy-ui/react-table/

import { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import { db } from "../../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import UserCalendar from "./userCalendar";

function NutritionTable() {
  const [nutrition, setNutrition] = useState([{}]);
  useEffect(() => {
    const getNutrition = async () => {
      try {
        const data = (await getDocs(collection(db, "nutrition"))).docs.map(
          (doc) => ({
            ...doc.data(),
            id: doc.id,
          })
        );
        setNutrition(data);
      } catch (err) {
        console.log(err);
      }
    };
    getNutrition();
  }, []);

  return (
    <>
      <UserCalendar />
      <Table variant="soft">
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
          {nutrition
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
      </Table>
    </>
  );
}
export default NutritionTable;
