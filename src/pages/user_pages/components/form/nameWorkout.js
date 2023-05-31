import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";

function NameWorkout({ setName, name }) {
  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input sx={{ mb: 1 }} required onChange={handleChange} value={name}/>
      </FormControl>
    </Stack>
  );
}

export default NameWorkout;
