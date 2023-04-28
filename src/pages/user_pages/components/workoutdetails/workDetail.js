import { useState } from 'react';
import { Button, Card, CardContent, Dialog, DialogTitle, TextField, Typography } from '@material-ui/core';

function Workouts({ onWorkoutClick }) {
  const exercises = {
    Chest: [
      {
        name: 'Push-ups',
        description: 'A basic bodyweight exercise that strengthens the chest, shoulders, triceps, and core.',
        sets: 3,
        reps: 10
      },
      {
        name: 'Bench press',
        description: 'A compound exercise that primarily targets the chest, as well as the triceps and shoulders.',
        sets: 3,
        reps: 8
      }
    ],
    Legs: [
      {
        name: 'Squats',
        description: 'A compound exercise that strengthens the legs, glutes, and core.',
        sets: 3,
        reps: 10
      },
      {
        name: 'Lunges',
        description: 'A unilateral exercise that strengthens the legs, glutes, and core. Can be performed with or without weights.',
        sets: 3,
        reps: 12
      }
    ],
    Abs: [
      {
        name: 'Sit-ups',
        description: 'A classic exercise that strengthens the abs.',
        sets: 3,
        reps: 10
      },
      {
        name: 'Plank',
        description: 'An isometric exercise that strengthens the core and improves posture. Can be performed in various variations, such as side planks and plank jacks.',
        sets: 3,
        reps: 30
      }
    ],
    Back: [
      {
        name: 'Pull-ups',
        description: 'An upper body exercise that targets the back, biceps, and shoulders. Can be performed using a pull-up bar or assisted machine.',
        sets: 3,
        reps: 8
      },
      {
        name: 'Deadlifts',
        description: 'A compound exercise that strengthens the posterior chain, including the lower back, glutes, and hamstrings. Can be performed using a barbell, dumbbells, or kettlebells.',
        sets: 3,
        reps: 8
      }
    ],
    Arms: [
      {
        name: 'Bicep Curls',
        description: 'An isolation exercise that targets the biceps. Can be performed using dumbbells, barbells, or resistance bands.',
        sets: 3,
        reps: 12
      }
    ]
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
                  {exercise.description}
                </Typography>
                <Typography color="textSecondary">
              Sets: {exercise.sets} Reps: {exercise.reps}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
))}
  </div>
);
          
}
export default Workouts;