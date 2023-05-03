import { useState } from 'react';
import { Button, Card, CardContent, Dialog, DialogTitle, TextField, Typography } from '@material-ui/core';

function Workouts({ onWorkoutClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState({});

  const getExercises = async (muscle) => {
    setIsLoading(true);
    setError(null);

    const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
    
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'X-Api-Key': '93CaTdAxk/uE8CzDY6GrRw==OKxj1C2694mFeH4H'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch exercises.');
      }

      const data = await response.json();
      setExercises(data.exercises);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const handleExerciseClick = (exercise) => {
    const confirmAdd = window.confirm(`Add ${exercise.name} to the Exercise Plan?`);
    if (confirmAdd) {
      onWorkoutClick(exercise.name);
    }
  };

  return (
    <div>
      <Typography>
        __________________________________________________________
      </Typography>
      <Typography variant="h4" gutterBottom>
        Exercise List
      </Typography>
      {Object.entries(exercises).map(([workType, exerciseList]) => (
        <div key={workType}>
          <Typography variant="h5" gutterBottom>
            {workType}
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {exerciseList.map(exercise => (
              <Card key={exercise.name} style={{ margin: '8px', minWidth: '200px' }} onClick={() => handleExerciseClick(exercise)}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {exercise.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {exercise.instructions}
                  </Typography>
                  <Typography color="textSecondary">
                    equipment: {exercise.equipment}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Button onClick={() => getExercises('chest')}>Chest Exercises</Button>
      <Button onClick={() => getExercises('calves')}>calves Exercises</Button>
      <Button onClick={() => getExercises('abdominals')}>abdominals Exercises</Button>
      <Button onClick={() => getExercises('lower_back')}>Back Exercises</Button>
      <Button onClick={() => getExercises('biceps')}>biceps Exercises</Button>
    </div>
  );
}

export default Workouts;