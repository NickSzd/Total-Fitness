// https://mui.com/x/react-date-pickers/date-picker/

import { DatePicker } from "@mui/x-date-pickers";
import { Grid } from "@mui/joy";

function UserCalendar({ selectedDate, setSelectedDate }) {
  return (
    <Grid container justifyContent="center">
    <DatePicker
      value={selectedDate}
      onChange={(newDate) => setSelectedDate(newDate)}
    />
    </Grid>
  );
}

export default UserCalendar;
