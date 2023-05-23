import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { db } from "../../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  setDoc,
  doc,
  some,
} from "firebase/firestore";
import { useContext } from "react";
import SharedContext from "./SharedContext";

const PREFIX = "PressableCardBoards";

const classes = {
  card: `${PREFIX}-card`,
};

const Root = styled("div")({
  [`& .${classes.card}`]: {
    aspectRatio: "auto",
    borderRadius: 20,
    margin: "20px",
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
    },
  },
});

function Workouts({ onWorkoutClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState([{}]);
  const ctx = useContext(SharedContext);

  const getExercises = async (muscle) => {
    setIsLoading(true);
    setError(null);

    const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": process.env.API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch exercises.");
      }

      const data = await response.json();
      setExercises(data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const handleExerciseClick = async (exercise) => {
    const confirmAdd = window.confirm(
      `Add ${exercise.name} to the Exercise Plan?`
    );

    if (confirmAdd) {
      try {
        const workoutCollectionRef = collection(db, "workout");
        const querySnapshot = await getDocs(workoutCollectionRef);

        if (querySnapshot.empty) {
          // Create a new workout document with an empty exercises field
          const newWorkoutDocRef = await addDoc(workoutCollectionRef, {
            exercises: [exercise],
          });
          onWorkoutClick(exercise.name);
        } else {
          const workoutDoc = querySnapshot.docs[0]; // Assuming there is only one workout document
          const workoutDocRef = doc(db, "workout", workoutDoc.id);
          const workoutData = workoutDoc.data();
          const exercises = workoutData.exercises || [];

          // Check if the exercise already exists in the workout document
          if (exercises.some((ex) => ex.name === exercise.name)) {
            console.log("Exercise already exists in the workout document.");
            return;
          }

          // Add the new exercise to the exercises field of the workout document
          await setDoc(workoutDocRef, { exercises: [...exercises, exercise] });
          onWorkoutClick(exercise.name);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  useEffect(() => {
    const initializeWorkout = async () => {
      //const userRef = doc(db, "users", uid);
      const workoutCollectionRef = collection(db, "workout");
      const querySnapshot = await getDocs(workoutCollectionRef);

      if (querySnapshot.empty) {
        // Create a new workout document with an empty exercises subcollection
        await addDoc(workoutCollectionRef, { exercises: [] });
      }
    };

    initializeWorkout(ctx.user.uid);
  }, []);
  return (
    <Root>
      <Typography>
        __________________________________________________________
      </Typography>
      <Typography variant="h4" gutterBottom>
        Exercise List
      </Typography>
      <Button onClick={() => getExercises("chest")}>Chest Exercises</Button>
      <Button onClick={() => getExercises("calves")}>calves Exercises</Button>
      <Button onClick={() => getExercises("abdominals")}>
        abdominals Exercises
      </Button>
      <Button onClick={() => getExercises("lower_back")}>Back Exercises</Button>
      <Button onClick={() => getExercises("biceps")}>biceps Exercises</Button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {exercises.map((workout) => (
          <Card
            key={workout.name}
            style={{ margin: "8px", minWidth: "200px" }}
            onClick={() => handleExerciseClick(workout)}
          >
            <CardContent>
              <Typography variant="h6" component="h2">
                {workout.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {workout.instructions}
              </Typography>
              <Typography color="textSecondary">
                equipment: {workout.equipment}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Root>
  );
}

function PressableCardBoards() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [cardboards, setCardboards] = useState([]);
  const handleAddCard = async () => {
    try {
      const workoutCollectionRef = collection(db, "workout");
      const newWorkoutDocRef = await addDoc(workoutCollectionRef, {
        exercises: [],
      });

      setCardboards((prevCardboards) => [...prevCardboards, ""]);
      setOpen(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleEditCard = (index) => {
    setContent(cardboards[index]);
    setOpen(true);
  };

  const handleClose = () => {
    setContent("");
    setOpen(false);
  };

  const handleWorkoutClick = (exerciseName) => {
    setContent((prevContent) => prevContent + `\n- ${exerciseName}`);
    setOpen(true);
  };

  const handleCardChange = (index, newContent) => {
    setCardboards((prevCardboards) => {
      const newCardboards = [...prevCardboards];
      newCardboards[index] = newContent;
      return newCardboards;
    });
  };

  const handleRemoveCard = (event, index) => {
    event.stopPropagation(); // stop propagation if the button clicked is "Remove"
    setCardboards((prevCardboards) =>
      prevCardboards.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <Typography variant="h1" style={{ fontSize: "2rem", lineHeight: "1.5" }}>
        My WorkOut Plans
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddCard}>
        Add Exercise Plans
      </Button>
      {cardboards.map((cardboard, index) => (
        <Card
          key={index}
          style={{
            aspectRatio: "auto",
            borderRadius: 20,
            margin: "20px",
            backgroundColor: "#f0f0f0",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={() => handleEditCard(index)}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              My Exercise {index + 1}
            </Typography>
            <Typography color="textSecondary">Click here to edit</Typography>
            <Typography
              variant="body2"
              component="p"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {cardboard}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={(e) => handleRemoveCard(e, index)}
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{content ? "Edit Exercise" : "Add Exercise"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Exercise Planner/Note"
            multiline
            minRows={10}
            fullWidth
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {open && <Workouts onWorkoutClick={handleWorkoutClick} />}
        </DialogContent>
        <Button
          color="primary"
          onClick={() => {
            handleCardChange(cardboards.length - 1, content);
            handleClose();
          }}
        >
          {content ? "Save Changes" : "Add Card"}
        </Button>
      </Dialog>
    </div>
  );
}

export default PressableCardBoards;
