import { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import { db } from "../../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function Nutrition() {
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
        // console.log(nutrition);
      } catch (err) {
        console.log(err);
      }
    };
    getNutrition();
  }, []);

  return (
    <Table variant="soft">
      <thead>
        <tr key="thead">
          <th>Meal</th>
          <th>Calories</th>
          <th>Fat (g)</th>
          <th>Carbs (g)</th>
          <th>Protein (g)</th>
        </tr>
      </thead>
      <tbody>
        {nutrition.map((data) => (
          <tr key={data.id}>
            <td>{data.meal}</td>
            <td>{data.calories}</td>
            <td>{data.fat}</td>
            <td>{data.carbohydrates}</td>
            <td>{data.protein}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default Nutrition;
