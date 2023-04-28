import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CardActions } from '@material-ui/core';
import Workouts from './workoutdetails/workDetail';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  card: {
    aspectRatio: 'auto', 
    borderRadius: 20, 
    margin: '20px',  
    backgroundColor: '#f0f0f0', 
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', 
    cursor: 'pointer', 
    transition: 'all 0.2s ease-in-out', 
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', 
    },
  },
})

function PressableCardBoards() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [cardboards, setCardboards] = useState([]);

  const handleAddCard = () => {
    setCardboards(prevCardboards => [...prevCardboards, '']);
    setOpen(true);
  };

  const handleEditCard = (index) => {
    setContent(cardboards[index]);
    setOpen(true);
  };

  const handleClose = () => {
    setContent('');
    setOpen(false);
  };

  const handleWorkoutClick = (exerciseName) => {
    setContent(prevContent => prevContent + `\n- ${exerciseName}`);
    setOpen(true);
  };

  const handleCardChange = (index, newContent) => {
    setCardboards((prevCardboards) => {
      const newCardboards = [...prevCardboards];
      newCardboards[index] = newContent;
      return newCardboards;
    });
  };

  const handleRemoveCard = (event, index) => {
    event.stopPropagation(); // stop propagation if the button clicked is "Remove"
    setCardboards((prevCardboards) => prevCardboards.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Typography variant="h1" style={{ fontSize: '2rem', lineHeight: '1.5' }} >
        My WorkOut Plans
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddCard}>
        Add Exercise Plans
      </Button>
      {cardboards.map((cardboard, index) => (
        <Card key={index} className={classes.card} onClick={() => handleEditCard(index)}>
          <CardContent>
            <Typography variant="h5" component="h2">
              My Exercise {index + 1}
            </Typography>
            <Typography color="textSecondary">
              Click here to edit
            </Typography>
            <Typography variant="body2" component="p" style={{ whiteSpace: 'pre-wrap' }}>
              {cardboard}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={(e) => handleRemoveCard(e, index)}>
              Remove
            </Button>
          </CardActions>
        </Card>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{content ? 'Edit Exercise' : 'Add Exercise'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Exercise Planner/Note"
            multiline
            minRows ={10}
            fullWidth
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {open && <Workouts onWorkoutClick={handleWorkoutClick} />}
        </DialogContent>
        <Button
          color="primary"
          onClick={() => {
            handleCardChange(cardboards.length - 1, content);
            handleClose();
          }}
        >
          {content ? 'Save Changes' : 'Add Card'}
        </Button>
      </Dialog>
    </div>
  );
}

export default PressableCardBoards;