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
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
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

function Workouts({ onWorkoutClick, savedExercises, setSavedExercises }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState([]);

  const ctx = useContext(SharedContext);

  const getExercises = async (muscle) => {
    setIsLoading(true);
    setError(null);

    const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": process.env.REACT_APP_API_KEY,
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
      const newSavedExercises = savedExercises;
      newSavedExercises.push(exercise);
      setSavedExercises(newSavedExercises);
      onWorkoutClick(exercise.name);
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
  }, [ctx.user.uid]);
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
        {exercises.length > 1 &&
          exercises.map((workout, index) => (
            <Card
              key={workout.name + index}
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
  const [savedExercises, setSavedExercises] = useState([]);
  const [editMode, setEditMode] = useState("");
  const ctx = useContext(SharedContext);
  const userRef = doc(db, "users", ctx.user.uid);

  const [value, loading, error] = useCollection(
    collection(userRef, "workout"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const handleEditCard = (data) => {
    let exercisesContent = "";
    data.exercises.forEach(
      (exercise) => (exercisesContent += `\n- ${exercise.name}`)
    );
    setSavedExercises(data.exercises);
    setContent(exercisesContent);
    setOpen(true);
  };

  const handleClose = () => {
    setContent("");
    setEditMode("");
    setSavedExercises([]);
    setOpen(false);
  };

  const handleWorkoutClick = (exerciseName) => {
    setContent((prevContent) => prevContent + `\n- ${exerciseName}`);
    setOpen(true);
  };

  const handleCardChange = async () => {
    if (editMode) {
      const workoutRef = collection(userRef, "workout");
      const workoutDoc = doc(workoutRef, editMode);
      await updateDoc(workoutDoc, { exercises: savedExercises });
    } else {
      await addDoc(collection(userRef, "workout"), {
        exercises: savedExercises,
      });
    }
  };

  const handleRemoveCard = async (event, id) => {
    // stop propagation if the button clicked is "Remove"
    event.stopPropagation();
    const workoutRef = collection(userRef, "workout");
    const workoutDoc = doc(workoutRef, id);
    await deleteDoc(workoutDoc);
  };

  return (
    <div>
      <Typography variant="h1" style={{ fontSize: "2rem", lineHeight: "1.5" }}>
        My Workout Plans
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Exercise Plans
      </Button>
      {value &&
        value.docs.map((doc, index) => (
          <Card
            key={doc.id + index}
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
            onClick={() => {
              setEditMode(doc.id);
              handleEditCard(doc.data());
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                My Exercise {index + 1}
              </Typography>
              <Typography color="textSecondary">Click here to edit</Typography>
              {doc.data().exercises.map((exercise) => (
                <Typography
                  variant="body2"
                  component="p"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {exercise.name}
                </Typography>
              ))}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={(e) => {
                  handleRemoveCard(e, doc.id);
                }}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Exercise" : "Add Exercise"}</DialogTitle>
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
          {open && (
            <Workouts
              onWorkoutClick={handleWorkoutClick}
              savedExercises={savedExercises}
              setSavedExercises={setSavedExercises}
            />
          )}
        </DialogContent>
        <Button
          color="primary"
          onClick={(e) => {
            handleCardChange();
            handleClose();
          }}
        >
          {editMode ? "Save Changes" : "Add Card"}
        </Button>
      </Dialog>
    </div>
  );
}

export default PressableCardBoards;
