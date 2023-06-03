const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const storeText = document.getElementById("store");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let store = 0;
let questionCounter = 0;
let availableQuesions = [];
let questionIndex = 0;

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
        answer: 1
};
// Question if you choose to gain muscle
let gainMQuestion = {
        question: "Why do you want to gain muscle?",
        choice1: "Tone Up - Visible physique with little mass",
        choice2: "Bulk Up - Went large, well defined muscles",
        choice3: "Get Strong - Lift maximum amount of weight(no essence on muscle definition)",
        answer: 1
};

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  store = 0;
  availableQuesions = [...questions];
  getNewQuestion(0);
};

function getNewQuestion(num){
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentstore", store);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    if(num == 0){
        currentQuestion = availableQuesions[0];
    }else if(num == 1){
        currentQuestion = loseQuestion;
    }else if(num == 2){
        currentQuestion = maintainQuestion;
    }else if(num == 3){
        currentQuestion = gainWQuestion;
    }else{
        currentQuestion = gainMQuestion;
    }
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    if(num == 0){
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
    if(question.innerText == questions[0].question){
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

incrementstore = (num) => {
  store += num;
  //storeText.innerText = store;
};
startGame();