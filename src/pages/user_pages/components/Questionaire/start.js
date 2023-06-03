import Button from "@mui/material/Button";
import MidGame from "./mid";
import EndGame from "./end";
import {useState} from "react";
import "./gameP1.css"
import "./gameP2.css"

const BegGame = (handleNext) => {
  return(
  <>
    <div class="container">
      <div id="home" class="flex-center flex-column">
        <h1>Registration Information</h1>
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  </>
  );
};
function Start() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
    if (step === 3) {
      handleClose();
    }
  };
  function getContent(step) {
    // eslint-disable-next-line default-case
    switch (step) {
      case 0:
        console.log("printMEEE");
        return <BegGame handleNext={handleNext}/>;
      case 1:
        return <MidGame handleNext={handleNext}/>;
      case 2:
        return <EndGame handleNext={handleNext}/>;
    }
  }
  const handleClose = () => {
      setStep(0);
  };
  return <>{getContent(handleNext)}</>;
}
export default Start;