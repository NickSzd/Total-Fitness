// to install
// npm install dayz --save --force

import Dayz from "dayz";
import React from "react";
import moment from "moment";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
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
import { db } from "../../../config/firebase";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import "dayz/dist/dayz.css";
import Sheet from "@mui/joy/Sheet";
import "../../../calendar.css";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/material/Box";
import { useCollection } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import SharedContext from "./SharedContext";
function UserCalendar() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState(new Dayz.EventsCollection([]));
  const [workoutList, setworkoutList] = useState({});
  const [details, setDetails] = useState({});
  const ctx = useContext(SharedContext);
  const userRef = doc(db, "users", ctx.user.uid);
  const [value, loading, error] = useCollection(
    collection(userRef, "workout"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const date = moment();
  const highlight = (day) => {
    return day.date() === date.date() ? "today" : false;
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    const data = value.docs.map((doc, index) => ({
      ...doc.data(),
    }));
    const schedule = [];

    try {
      data.forEach((data) => {
        data.schedule.forEach((date) => {
          schedule.push({
            content: data.content,
            range: moment.range(date.toDate(), date.toDate()),
            exercises: data.exercises,
          });
        });
      });

      const newDetails = {};

      const newEvents = new Dayz.EventsCollection(schedule);

      newEvents.forEach((event) => {
        newDetails[`${event.key}`] = {
          content: event.attributes.content,
          exercises: event.attributes.exercises,
        };
      });
      setEvents(newEvents);
      setworkoutList(newDetails);
    } catch (err) {
      console.log(err);
    }
  }, [loading, value]);

  const handleClick = (key) => {
    setDetails(workoutList[`${key}`]);
    setOpen(true);
  };

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          {!loading ? (
            <Typography
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              {details.content ? details.content : null}
            </Typography>
          ) : null}
          {details.exercises
            ? Object.entries(details.exercises).map(([key, value], index) => (
                <React.Fragment key={key}>
                  <Typography level="h5">
                    {index + 1}: {value.name}
                  </Typography>
                  <Typography level="p">Sets: {value.sets} </Typography>
                  <Typography level="p"> Reps: {value.reps}</Typography>
                </React.Fragment>
              ))
            : null}
        </Sheet>
      </Modal>
      <Typography
        level="h1"
        sx={{ display: "flex", justifyContent: "flex-end", pr: "20px" }}
      >
        {date.format("MMM Do")}
      </Typography>
      {!loading ? (
        <Dayz
          display="month"
          date={date}
          events={events}
          highlightDays={highlight}
          onEventClick={(e, l) => {
            handleClick(l.key);
          }}
        />
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

export default UserCalendar;
