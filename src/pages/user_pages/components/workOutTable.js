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
import ScheduleWorkout from "./form/scheduleWorkout";
import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import moment from "moment";
import { Timestamp } from "firebase/firestore";

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

function Workouts({ onWorkoutClick, selected, setSelected }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState([]);
  const isSelected = (name) =>
    selected.findIndex((w) => w.name === name) !== -1;
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
      data.forEach((workout) => {
        workout.reps = 10;
        workout.sets = 3;
      });
      setExercises(data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const handleClick = (event, workout) => {
    const selectedIndex = selected.findIndex((w) => w.name === workout.name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, workout);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChange = (event, workout) => {
    const { value, name } = event.target;
    const selectedIndex = selected.findIndex((w) => w.name === workout.name);
    setSelected((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[selectedIndex][name] = Number(value);
      return updatedSelected;
    });
  };

  return (
    <Root>
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
      {exercises.length > 1 && (
        <Sheet
          variant="outlined"
          sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}
        >
          <Table
            aria-labelledby="tableTitle"
            hoverRow
            sx={{
              "--TableCell-headBackground": "transparent",
              "--TableCell-selectedBackground": (theme) =>
                theme.vars.palette.primary.softBg,
              "& thead th:nth-child(1)": {
                width: "40px",
              },
              "& thead th:nth-child(2)": {
                width: "30%",
              },
              "& tr > *:nth-child(n+3)": { textAlign: "right" },
            }}
          >
            <thead>
              <tr>
                <th></th>
                <th>Workout</th>
                <th>Equipment</th>
                <th>Sets </th>
                <th>Reps </th>
              </tr>
            </thead>
            <tbody>
              {exercises.length > 1 &&
                exercises.map((workout, index) => {
                  const isItemSelected = isSelected(workout.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <tr
                      style={
                        isItemSelected
                          ? {
                              "--TableCell-dataBackground":
                                "var(--TableCell-selectedBackground)",
                              "--TableCell-headBackground":
                                "var(--TableCell-selectedBackground)",
                            }
                          : {}
                      }
                    >
                      <th scope="row">
                        <Checkbox
                          onClick={(event) => handleClick(event, workout)}
                          checked={isItemSelected}
                          slotProps={{
                            input: {
                              "aria-labelledby": labelId,
                            },
                          }}
                          sx={{ verticalAlign: "top" }}
                        />
                      </th>
                      <td>{workout.name}</td>
                      <td>{workout.equipment}</td>
                      <td>
                        {isItemSelected ? (
                          <Input
                            required
                            size="sm"
                            variant="plain"
                            type="number"
                            name="sets"
                            onChange={(event) => {
                              handleChange(event, workout);
                            }}
                            value={
                              selected[
                                selected.findIndex(
                                  (w) => w.name === workout.name
                                )
                              ].sets
                            }
                            sx={{ "& input": { textAlign: "right" } }}
                          />
                        ) : (
                          workout.sets
                        )}
                      </td>
                      <td>
                        {isItemSelected ? (
                          <Input
                            required
                            size="sm"
                            variant="plain"
                            type="number"
                            name="reps"
                            value={
                              selected[
                                selected.findIndex(
                                  (w) => w.name === workout.name
                                )
                              ].reps
                            }
                            onChange={(event) => {
                              handleChange(event, workout);
                            }}
                            sx={{ "& input": { textAlign: "right" } }}
                          />
                        ) : (
                          workout.reps
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Sheet>
      )}

      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Root>
  );
}

function getContent(
  step,
  name,
  setName,
  days,
  setDays,
  frequency,
  setFrequency,
  selected,
  setSelected
) {
  // eslint-disable-next-line default-case
  switch (step) {
    case 0:
      return <NameWorkout setName={setName} name={name} />;
    case 1:
      return <Workouts selected={selected} setSelected={setSelected} />;
    case 2:
      return (
        <ScheduleWorkout
          days={days}
          setDays={setDays}
          frequency={frequency}
          setFrequency={setFrequency}
        />
      );
  }
}

function PressableCardBoards() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [editMode, setEditMode] = useState("");
  const ctx = useContext(SharedContext);
  const userRef = doc(db, "users", ctx.user.uid);
  const [step, setStep] = useState(0);
  const steps = ["Name", "Workouts", "Schedule"];
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("One Week");
  const [days, setDays] = useState([]);
  const [value, loading, error] = useCollection(
    collection(userRef, "workout"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const handleEditCard = (data) => {
    setSelected(data.exercises);
    setName(data.content);
    data.schedule.forEach((data) => days.push(moment(data.toDate()).day()));
    setOpen(true);
  };

  const handleClose = () => {
    setEditMode("");
    setSelected([]);
    setOpen(false);
    setStep(0);
    setDays([]);
    setName("");
    setFrequency("One Week");
  };

  const finalizeSchedule = () => {
    const schedule = [];
    let weeks = 0;
    const daysInWeek = 7;
    // eslint-disable-next-line default-case
    switch (frequency) {
      case "One Week":
        weeks = 1;
        break;
      case "Two Weeks":
        weeks = 2;
        break;
      case "Three Weeks":
        weeks = 3;
        break;
      case "A Month":
        weeks = 4;
        break;
    }
    for (const value of days) {
      for (let i = 0; i < weeks; i++) {
        schedule.push(
          Timestamp.fromMillis(
            moment().day() >=
              moment()
                .day(i * daysInWeek + value)
                .day()
              ? moment()
                  .day(i * daysInWeek + value + 7)
                  .valueOf()
              : moment()
                  .day(i * daysInWeek + value)
                  .valueOf()
          )
        );
      }
    }
    return schedule;
  };

  const handleCardChange = async () => {
    const schedule = finalizeSchedule();
    if (editMode) {
      const workoutRef = collection(userRef, "workout");
      const workoutDoc = doc(workoutRef, editMode);
      await updateDoc(workoutDoc, {
        exercises: selected,
        content: name,
        schedule: schedule,
      });
    } else {
      await addDoc(collection(userRef, "workout"), {
        exercises: selected,
        content: name,
        schedule: schedule,
      });
    }
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
    if (step === steps.length - 1) {
      handleCardChange();
      handleClose();
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
            }}
            onClick={() => {
              setEditMode(doc.id);
              handleEditCard(doc.data());
            }}
          >
            <CardContent>
              <Typography level="h4">{doc.data().content}</Typography>

              {doc.data().exercises.map((exercise) => (
                <>
                  <Typography
                    level="body2"
                    component="p"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {exercise.name}
                  </Typography>
                </>
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

      <Modal open={open} onClose={() => handleClose()} disableScrollLock>
        <ModalOverflow>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 1000 }}
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              {editMode ? "Edit Exercise" : "Add Exercise"}
              <Divider />
            </Typography>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleNextStep();
              }}
            >
              {getContent(
                step,
                name,
                setName,
                days,
                setDays,
                frequency,
                setFrequency,
                selected,
                setSelected
              )}
              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                >
                  <Box>
                    <Button
                      color="primary"
                      onClick={() => {
                        step === 0
                          ? handleClose()
                          : setStep((prevStep) => prevStep - 1);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={
                        (days.length < 1 && step === steps.length - 1) ||
                        (step === 1 && selected.length < 1)
                      }
                    >
                      {editMode && step === steps.length - 1
                        ? "Save Changes"
                        : !editMode && step === steps.length - 1
                        ? "Add"
                        : "Next"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </div>
  );
}

export default PressableCardBoards;
