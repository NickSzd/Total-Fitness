// https://mui.com/joy-ui/react-table/

import { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import { db } from "../../../config/firebase";
import { getDocs, collection, where, query, Timestamp, serverTimestamp } from "firebase/firestore";
import UserCalendar from "./userCalendar";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

function NutritionTable() {
  dayjs.extend(utc);
  const [nutrition, setNutrition] = useState([{}]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const getNutrition = async () => {
      const nutritionRef = collection(db, "nutrition");
      const q = query(
        nutritionRef,
        where("day", ">=", selectedDate.startOf('day').toDate()),
        where("day", "<", selectedDate.endOf('day').add(1, "second").toDate())
      );
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
        const data = (await getDocs(q)).docs.map(
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
  }, [selectedDate]);

  return (
    <>
      <UserCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
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
