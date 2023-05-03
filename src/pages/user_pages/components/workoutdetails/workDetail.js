import { useState } from 'react';
import { Button, Card, CardContent, Dialog, DialogTitle, TextField, Typography } from '@material-ui/core';

function Workouts({ onWorkoutClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState([{}]);

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
      setExercises(data);

      //const data = await response.json();
      /*
        name:
        type:
        msucle:
        equipment:
        difficulty:
        instructions:
      */ 
    
    } 
    catch (error) {
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
    // you can add more detail in a card.
    <div>
      <Typography>
        __________________________________________________________
      </Typography>
      <Typography variant="h4" gutterBottom>
        Exercise List
      </Typography>
      <Button onClick={() => getExercises('chest')}>Chest Exercises</Button>
      <Button onClick={() => getExercises('calves')}>calves Exercises</Button>
      <Button onClick={() => getExercises('abdominals')}>abdominals Exercises</Button>
      <Button onClick={() => getExercises('lower_back')}>Back Exercises</Button>
      <Button onClick={() => getExercises('biceps')}>biceps Exercises</Button>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {exercises.map((workout) => (
        <Card key={workout.name} style={{ margin: '8px', minWidth: '200px' }} onClick={() => handleExerciseClick(workout)}>
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
    </div>
  );
}

export default Workouts;