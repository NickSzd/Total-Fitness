import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import Stack from  "@mui/material/Stack"
import Divider from '@mui/material/Divider';
import './my-styles.css';

function RegistrationPart2(){
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    weight: '',
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform database registration and redirection logic here
  };
  const defaultStyling ={
    //border: '1px solid blue',
    //backgroundColor: 'rgba(20,20,20,0.4)', 
    width: 500,
    //left: 600,
    mt: 23,
    ml: 58,
    justifycontent:"center", 
    //alignItems:"center"
  }
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
        <Typography variant="h5">Registration Form</Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
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
          <FormGroup>
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
            name="weight"
            label="Weight"
            type="number"
            value={formData.weight}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </Stack>
      )}
    </div>
  );
};

export default RegistrationPart2;