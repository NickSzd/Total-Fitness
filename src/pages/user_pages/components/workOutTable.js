import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
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
import Stepper from "@mui/material/Stepper";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import ModalOverflow from "@mui/joy/ModalOverflow";
import NameWorkout from "./form/nameWorkout";
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
      <Divider />
      <Typography variant="body2" gutterBottom sx={{ color: "black" }}>
        Exercise List
      </Typography>
      <Button
        sx={{ m: 1 }}
        variant="soft"
        onClick={() => getExercises("chest")}
      >
        Chest Exercises
      </Button>
      <Button
        sx={{ m: 1 }}
        variant="soft"
        onClick={() => getExercises("calves")}
      >
        Calves Exercises
      </Button>
      <Button
        sx={{ m: 1 }}
        variant="soft"
        onClick={() => getExercises("abdominals")}
      >
        Abdominal Exercises
      </Button>
      <Button
        sx={{ m: 1 }}
        variant="soft"
        onClick={() => getExercises("lower_back")}
      >
        Back Exercises
      </Button>
      <Button
        sx={{ m: 1 }}
        variant="soft"
        onClick={() => getExercises("biceps")}
      >
        Bicep Exercises
      </Button>

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

function getContent(step) {
  switch (step) {
    case 0:
      return <NameWorkout />;
    case 1:
      return <Workouts />;
    // case 2:
    //   return <ItemForm />;
    // case 3:
    //   return <PriceForm />;
    // case 4:
    //   return <ImageForm />;
  }
}

function PressableCardBoards() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [savedExercises, setSavedExercises] = useState([]);
  const [editMode, setEditMode] = useState("");
  const ctx = useContext(SharedContext);
  const userRef = doc(db, "users", ctx.user.uid);
  const [step, setStep] = useState(0);
  const steps = ["Name", "Workouts", "Schedule"];

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

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
    if (step === steps.length - 1) {
      handleCardChange();
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
      <Typography
        variant="h1"
        style={{ fontSize: "2rem", lineHeight: "1.5", color: "black" }}
      >
        My Workout Plans
      </Typography>
      <Button
        variant="soft"
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

      <Modal open={open} onClose={() => setOpen(false)} disableScrollLock>
        <ModalOverflow>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 1000 }}
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              {editMode ? "Edit Exercise" : "Add Exercise"}
            </Typography>

            <Typography level="body1">{content}</Typography>

            <Workouts
              onWorkoutClick={handleWorkoutClick}
              savedExercises={savedExercises}
              setSavedExercises={setSavedExercises}
            />
            {getContent(step)}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input autoFocus required />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input required />
                </FormControl>
                {/* <Button type="submit">Submit</Button> */}
                <Button
                  color="primary"
                  onClick={(e) => {
                    handleCardChange();
                    handleClose();
                  }}
                >
                  {editMode ? "Save Changes" : "Add Card"}
                </Button>
              </Stack>
            </form>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </div>
  );
}

export default PressableCardBoards;
