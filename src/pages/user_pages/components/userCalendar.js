// https://mui.com/x/react-date-pickers/date-picker/

import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

const dayjs = require('dayjs');

function UserCalendar({selectedDate, setSelectedDate}) {
  return <DatePicker value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)}/>;
}

export default UserCalendar;
