import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import Stack from  "@mui/material/Stack"
import Divider from '@mui/material/Divider';
import './my-styles.css';
import {auth, db} from "../config/firebase.js";
import {collection, doc, setDoc, updateDoc} from "firebase/firestore";

function RegistrationPart2(){
  const history = useNavigate();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    gender: '',
    currWeight: '',
    goalWeight: '',
    heightFeet: '', 
    heightInch: '',

  });

  const handleGoalSelect = (selectedGoal) => {
    setGoal(selectedGoal);
    setStep(step + 1);
  };

  const handleActivityLevelSelect = (selectedActivityLevel) => {
    setActivityLevel(selectedActivityLevel);
    setStep(step + 1);
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setStep(step + 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleFormSubmit(){
        // event.preventDefault();
        const user = auth.currentUser;
        await updateDoc(doc(collection(db, "users"), user.uid),{
            userName: formData.userName,
            gender: formData.gender,
            currWeight: formData.currWeight,
            goalWeight: formData.goalWeight,
            heightFeet: formData.heightFeet,
            heightInch: formData.heightInch,
            mainGoal: goal,
            whyGoal: difficulty,
            activityLevel: activityLevel,
        }).then( () => {
        window.location.href = "userHome";
        history("/userHome");
      });
        //const data = new FormData(event.currentTarget);
    // Perform database registration and redirection logic here
    // var firstName = document.getElementById("firstName").value;
    // var lastName = document.getElementById("lastName").value;
    // var email = document.getElementById("email").value;
    // var password = document.getElementById("password").value;

    // Register User
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(async (userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;

    //     await setDoc(doc(collection(db, "users"),user.uid), {
    //       userID : user.uid,
    //       email : email,
    //       firstName: firstName,
    //       lastName: lastName,

    //     })
        
    // window.location.href = "userHome";
    // history("/userHome")

    // return userCredential.updateProfile({dis})
    //ADD REDIRECT TO USER HOME PAGE

    // .catch((error) => {
    // console.log("Error Creating User");
    // const errorCode = error.code;
    // const errorMessage = error.message;

    // console.log("Error code: "+ errorCode);
    // console.log("Error Message: "+ errorMessage);
    // ..
  };

  const defaultStyling ={
    width: 500,
    mt: 23,
    ml: 58,
    justifycontent:"center", 
  };
  return (
    <div>
      {step === 1 && (
        <Stack sx={defaultStyling} divider={<Divider orientation="horizontal" flexItem />}spacing={1}>
          <Typography variant="h5" align='center' color='lightblue'>Welcome to Total Fitness</Typography>
          <Typography variant="body1" align='center' color='primary'>Choose your goal:</Typography>
          <Button variant="contained" color="primary" onClick={() => handleGoalSelect('Lose weight')}>
            Lose weight
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleGoalSelect('Maintain weight')}>
            Maintain weight
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleGoalSelect('Gain weight')}>
            Gain weight
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleGoalSelect('Gain muscle')}>
            Gain muscle
          </Button>
        </Stack>
      )}
      {step === 2 && (
        <Stack sx={defaultStyling} divider={<Divider orientation="horizontal" flexItem />}spacing={1}>
          <Typography variant="h5" align='center' color='lightblue' >What is your level of activity?</Typography>
          <Button variant="contained" color="primary" onClick={() => handleActivityLevelSelect('Not really active')}>
            Not really active
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleActivityLevelSelect('Active')}>
            Active
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleActivityLevelSelect('Lightly active')}>
            Lightly active
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleActivityLevelSelect('Very active')}>
            Very active
          </Button>
        </Stack>
      )}
      {step === 3 && goal === 'Lose weight' && (
        <Stack sx={defaultStyling} divider={<Divider orientation="horizontal" flexItem />}spacing={1}>
          <Typography variant="h5" align='center' color='lightblue'>What's been hard for you to lose weight?</Typography>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Lack of time')}>
            Lack of time
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Food cravings')}>
            Food cravings
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Difficult to avoid food')}>
            Difficult to avoid food
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Social gathering')}>
            Social gathering
          </Button>
        </Stack>
      )}
      {step === 3 && goal === 'Maintain weight' && (
        <Stack sx={defaultStyling} divider={<Divider orientation="horizontal" flexItem />}spacing={1}>
          <Typography variant="h5" align='center' color='lightblue'>What's been hard to maintain your weight?</Typography>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Lack of time')}>
            Lack of time
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Holidays')}>
            Holidays
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Food cravings')}>
            Food cravings
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Lack of progress')}>
            Lack of progress
          </Button>
        </Stack>
      )}
      {step === 3 && goal === 'Gain weight' && (
        <Stack sx={defaultStyling} divider={<Divider orientation="horizontal" flexItem />}spacing={1}>
          <Typography variant="h5" align='center' color='lightblue'>Why do you want to gain weight?</Typography>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('For sport reasons')}>
            For sport reasons
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('For general fitness')}>
            For general fitness
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Being underweight')}>
            Being underweight
          </Button>
        </Stack>
      )}
      {step === 3 && goal === 'Gain muscle' && (
        <Stack sx={defaultStyling} divider={<Divider orientation="horizontal" flexItem />}spacing={1}>
          <Typography variant="h5" align='center' color='lightblue'>Why do you want to gain muscle?</Typography>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Tone Up - Visible physique with little mass')}>
            Tone Up - Visible physique with little mass
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Bulk Up - Well-defined muscles')}>
            Bulk Up - Well-defined muscles
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('Get Strong - Lift maximum weight')}>
            Get Strong - Lift maximum weight
          </Button>
        </Stack>
      )}
      {step === 4 && (
        <Stack sx={defaultStyling} divider={<Divider orientation="horizontal" flexItem />}spacing={1}>
        <Typography variant="h5"  align='center' color='lightblue'>User Information</Typography>
        <form onSubmit={handleFormSubmit} align='center'>
          <TextField
            name="userName"
            label="UserName"
            value={formData.userName}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <FormGroup row="true">
            <FormControlLabel
              control={
                <Checkbox
                  name="gender"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                  value="male"
                />
              }
              label="Male"
              sx={{ml:21}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="gender"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                  value="female"
                />
              }
              label="Female"
            />
          </FormGroup>
          <TextField
            name="currWeight"
            label="Current Weight"
            type="number"
            value={formData.currWeight}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="goalWeight"
            label="Goal Weight"
            type="number"
            value={formData.goalWeight}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="heightFeet"
            label="Height - Feet "
            type="number"
            value={formData.heightFeet}
            onChange={handleInputChange}
            // sx = {{ml:13}}
            required
          />
          <TextField
            name="heightInch"
            label="Height - Inches"
            type="number"
            value={formData.heightInch}
            onChange={handleInputChange}
            // sx = {{ml:13}}
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ml:1, mt:5}}> 
            Register
          </Button>
        </form>
      </Stack>
      )}
    </div>
  );
};

export default RegistrationPart2;