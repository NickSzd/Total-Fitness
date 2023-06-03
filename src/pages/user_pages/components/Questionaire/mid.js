import "./gameP1.css"
import "./gameP2.css"
import {useState} from 'react'
function MidGame(handleNext) {
    const [progressText, setProgess] = useState("");
    const [mainQ, setMainQ] = useState("");
    const [firstOpt, setFirstOpt] = useState("");
    const [secondOpt, setSecondOpt] = useState("");
    const [thirdOpt, setThirdOpt] = useState("");
    const [fourthOpt, setFourthOpt] = useState("");
    // const question = document.getElementById("question");
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    //const progressText = document.getElementById("progressText");
    // const storeText = document.getElementById("store");
    const progressBarFull = document.getElementById("progressBarFull"); 
    let currentQuestion = {};
    let acceptingAnswers = false;
    let store = 0;
    let questionCounter = 0;
    let availableQuesions = [];
    // let questionIndex = 0;

    // the general questions you can ask any of the users
    let questions = [
      {
        question: "What is your goals?",
        choice1: "Lose weight",
        choice2: "Maintain weight",
        choice3: "Gain Weight",
        choice4: "Gain Muscle",
        answer: 1
      },
      {
        question: "What is your level of activity?",
        choice1: "not really active",
        choice2: "active",
        choice3: "lightly active",
        choice4: "very active",
        answer: 3
      },
    ]; 
    //QUESTION you ask if the user selects to maintain their own weight
    let maintainQuestion = 
    {
            question: "What's been hard to maintain your weight?",
            choice1: "Lack of time",
            choice2: "Holidays",
            choice3: "Food cravings",
            choice4: "Lack of progress",
            answer: 1
    };
    // Question if you choose losing weight 
    let loseQuestion = 
    {
            question: "What's been hard for you to lose weight?",
            choice1: "Lack of time",
            choice2: "Food cravings",
            choice3: "Difficult to avoid food",
            choice4: "Social Gathering",
            answer: 1
    };
    // Question if you choose to gain weight
    let gainWQuestion = 
    {
            question: "Why do you want to gain weight?",
            choice1: "For sport reasons",
            choice2: "For general fitness",
            choice3: "Being underweight",
            choice4: "You consume less calories than you need to",
            answer: 1
    };
    // Question if you choose to gain muscle
    let gainMQuestion = {
            question: "Why do you want to gain muscle?",
            choice1: "Tone Up - Visible physique with little mass",
            choice2: "Bulk Up - Went large, well defined muscles",
            choice3: "Get Strong - Lift maximum amount of weight(no essence on muscle definition)",
            choice4: "Increases metabolic rate - Increase body's energy requirments to burn fat", 
            answer: 1
    };

    //CONSTANTS
    const CORRECT_BONUS = 10;
    const MAX_QUESTIONS = 3;

    const startGame = () => {
      questionCounter = 0;
      store = 0;
      availableQuesions = [...questions];
      getNewQuestion(0);
    };

    function getNewQuestion(num){
        if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            //localStorage.setItem("mostRecentstore", store);
            handleNext();
            return;
            //go to the end page
            //return window.location.assign("end.html");
        }
        questionCounter++;
        setProgess(`Question ${questionCounter}/${MAX_QUESTIONS}`);
        //Update the progress bar
        //progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

        if(num === 0){
            currentQuestion = availableQuesions[0];
        }else if(num === 1){
            currentQuestion = loseQuestion;
        }else if(num === 2){
            currentQuestion = maintainQuestion;
        }else if(num === 3){
            currentQuestion = gainWQuestion;
        }else{
            currentQuestion = gainMQuestion;
        }
        setMainQ(currentQuestion.question);

        let i = 0;
        choices.forEach(choice => {
            const number = choice.dataset["number"];
            if(i === 0){
              setFirstOpt(currentQuestion["choice" + number]);
            }
            else if(i === 1){
              setSecondOpt(currentQuestion["choice" + number]);
            }
            else if(i === 2){
              setThirdOpt(currentQuestion["choice" + number]);
            }
            else{
              setFourthOpt(currentQuestion["choice" + number]);
            }
            i += 1;
            //choice.innerText = currentQuestion["choice" + number];
        });
        if(num === 0){
            availableQuesions.splice(0, 1);
        }
        acceptingAnswers = true;
    };

    choices.forEach(choice => {
      choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = "correct";
        let num = 0;
        if(mainQ === questions[0].question){
            num = selectedAnswer;
        }
        if (classToApply === "correct") {
          incrementstore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        console.log("selectedChoice", selectedChoice.parentElement.classList)
        setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion(num);
        }, 500);
      });
    });

  const incrementstore = (num) => {
    store += num;
    //storeText.innerText = store;
  };
  startGame();

  return (
    <body>
      <div className="container">
        <div id="game" className="justify-center flex-column">
          <div id="hud">
            <div id="hud-item">
              <p className="hud-prefix">
                Question {progressText}
              </p>
              <div id="progressBar">
                <div id="progressBarFull" />
              </div>
            </div>
            <div id="hud-item">
              <p className="hud-prefix"></p>
              <h1 className="hud-main-text" id="store"></h1>
            </div>
          </div>
          <h2 id="question">{mainQ}</h2>
          <div className="border">
            <div className="choice-container">
              <p className="choice-prefix">1</p>
              <p className="choice-text" data-number={1}>
                {firstOpt}
              </p>
            </div>
            <div className="choice-container">
              <p className="choice-prefix">2</p>
              <p className="choice-text" data-number={2}>
                {secondOpt}
              </p>
            </div>
            <div className="choice-container">
              <p className="choice-prefix">3</p>
              <p className="choice-text" data-number={3}>
                {thirdOpt}
              </p>
            </div>
            <div className="choice-container">
              <p className="choice-prefix">4</p>
              <p className="choice-text" data-number={4}>
                {fourthOpt}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <script src="part1Qs.js"></script> */}
    </body>
  );
}
export default MidGame;
