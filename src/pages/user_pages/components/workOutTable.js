import { makeStyles } from '@material-ui/core/styles';
import React,{ useState } from 'react';
import { Card, CardContent, Grid, Button, TextField} from '@material-ui/core';
import Draggable from 'react-draggable';

const useStyles = makeStyles({
  card: {
    aspectRatio: '1/1', 
    borderRadius: 20, 
    maxWidth: '60%', 
    margin: 'auto', 
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', 
    cursor: 'pointer', 
    transition: 'all 0.2s ease-in-out', 
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', 
    },
  },
  grid: {
    marginTop: 20,
  },
  cardboard: {
    position: 'relative',
    backgroundColor: '#fff',
    width: '200px',
    height: '150px',
    border: '1px solid #000',
    padding: '10px',
    zIndex: '999',
  },
});

function PressableCardBoards() {
    const classes = useStyles();
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardboardPosition, setCardboardPosition] = useState(null);
    const [showCardboard, setShowCardboard] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    function handleSearchInputChange(event) {
        setSearchTerm(event.target.value);
    }

    function handleCardClick(index) {
      setSelectedCard(index);
    }
  
    function handlePreviousClick() {
        setSelectedCard(null);
        setShowCardboard(false);
      }
    
      function handleAddClick() {
        setCardboardPosition({ x: 0, y: 0 });
        setShowCardboard(true);
      }
    
      function handleRemoveClick() {
        setShowCardboard(false);
        setCardboardPosition({ x: 0, y: 0 });
      }
    
      if (selectedCard === null) {
        return (
          <div>
            <Grid container spacing={3} className={classes.grid}>
              <Grid item xs={6}>
                <Card className={classes.card} onClick={() => handleCardClick(0)}>
                  <CardContent>Chest</CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card className={classes.card} onClick={() => handleCardClick(1)}>
                  <CardContent>Bicep</CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card className={classes.card} onClick={() => handleCardClick(2)}>
                  <CardContent>Leg</CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card className={classes.card} onClick={() => handleCardClick(3)}>
                  <CardContent>Back</CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        );
      } else {
        return (
          <div>
            <TextField
                label="Add"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchInputChange}
                style={{ marginBottom: 20 }}
            />

            <h2>Please add the workout!!</h2>
            <Button onClick={handleAddClick} variant="contained" color="primary">
              Add
            </Button>
            <Button onClick={handlePreviousClick}>Previous</Button>
            {showCardboard && (
              <Draggable
                bounds="parent"
                position={cardboardPosition}
                onStop={(event, data) => {
                  setCardboardPosition({ x: data.x, y: data.y });
                }}
              >
                <div className={classes.cardboard}>
                  Curl
                  Set: 5 Rep: 100
                  <div>
                  <Button onClick={handleRemoveClick} variant="contained" color="secondary">
                    Remove
                  </Button>
                  </div>
                </div>
              </Draggable>
            )}
          </div>
        );
      }
    }
export default PressableCardBoards;

    
    
    
    
    
    