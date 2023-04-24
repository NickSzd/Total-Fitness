// https://mui.com/joy-ui/react-table/

import { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import Sheet from '@mui/joy/Sheet';
import { db } from "../../../config/firebase";
import { getDocs, collection, where, query } from "firebase/firestore";
import UserCalendar from "./userCalendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

function NutritionTable() {
  dayjs.extend(utc);
  const [nutrition, setNutrition] = useState([{}]);
  const [totals, setTotals] = useState({
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
  });
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const getNutrition = async () => {
      const nutritionRef = collection(db, "nutrition");
      const q = query(
        nutritionRef,
        where("day", ">=", selectedDate.startOf("day").toDate()),
        where("day", "<", selectedDate.endOf("day").add(1, "second").toDate())
      );
      try {
        const data = (await getDocs(q)).docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        totals.calories = 0;
        totals.fat = 0;
        totals.carbohydrates = 0;
        totals.protein = 0;
        const newTotal = totals;
        data.forEach((macro) => {
          newTotal.calories += macro.calories;
          newTotal.fat += macro.fat;
          newTotal.carbohydrates += macro.carbohydrates;
          newTotal.protein += macro.protein;
        });
        setTotals(newTotal);
        setNutrition(data);
      } catch (err) {
        console.log(err);
      }
    };
    getNutrition();
  }, [selectedDate, totals]);

  return (
    <>
      <UserCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Sheet sx={{ height: 'auto', overflow: 'auto' }}>
      <Table stickyHeader hoverRow >
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
