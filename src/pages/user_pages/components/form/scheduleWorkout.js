import Box from "@mui/joy/Box";
import { useEffect, useState } from "react";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";
import Menu from "@mui/joy/Menu";
import Button from "@mui/joy/Button";
import MenuItem from "@mui/joy/MenuItem";

function ScheduleWorkout({ frequency, setFrequency, days, setDays }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFrequency = (event) => {
    setFrequency(event.currentTarget.innerText);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Sheet
        variant="outlined"
        sx={{
          width: 360,
          p: 2,
          borderRadius: "sm",
          bgcolor: "background.body",
        }}
      >
        <Typography id="rank" level="body2" fontWeight="lg" sx={{ mb: 1.5 }}>
          Choose Day
        </Typography>
        <Box role="group" aria-labelledby="rank">
          <List
            orientation="horizontal"
            wrap
            sx={{
              "--List-gap": "8px",
              "--ListItem-radius": "20px",
              "--ListItem-minHeight": "32px",
            }}
          >
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((item, index) => (
              <ListItem key={item}>
                {days.includes(index) && (
                  <Done
                    fontSize="md"
                    color="primary"
                    sx={{ ml: -0.5, mr: 0.5, zIndex: 2, pointerEvents: "none" }}
                  />
                )}

                <Checkbox
                  size="sm"
                  disableIcon
                  overlay
                  label={item}
                  checked={days.includes(index)}
                  variant={days.includes(index) ? "soft" : "outlined"}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setDays((val) => [...val, index]);
                    } else {
                      setDays((val) => val.filter((i) => i !== index));
                    }
                  }}
                  slotProps={{
                    action: ({ checked }) => ({
                      sx: checked
                        ? {
                            border: "1px solid",
                            borderColor: "primary.500",
                          }
                        : {},
                    }),
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Typography
          id="rank"
          level="body2"
          fontWeight="lg"
          sx={{ mt: 1.5, mb: 1.5 }}
        >
          Frequency
        </Typography>
        <Button
          id="basic-demo-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          color="neutral"
          onClick={handleOpen}
        >
          {frequency}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          aria-labelledby="basic-demo-button"
          sx={{ zIndex: 1500 }}
        >
          <MenuItem
            onClick={(event) => {
              handleFrequency(event);
            }}
          >
            One Week
          </MenuItem>
          <MenuItem
            onClick={(event) => {
              handleFrequency(event);
            }}
          >
            Two Weeks
          </MenuItem>
          <MenuItem
            onClick={(event) => {
              handleFrequency(event);
            }}
          >
            Three Weeks
          </MenuItem>
          <MenuItem
            onClick={(event) => {
              handleFrequency(event);
            }}
          >
            A Month
          </MenuItem>
        </Menu>
      </Sheet>
    </Box>
  );
}

export default ScheduleWorkout;
