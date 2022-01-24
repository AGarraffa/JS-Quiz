// pulling elements from the DOM
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var questionEl = document.getElementById('question');
var answerEl = document.querySelectorAll('.answer');
var hiddenEl = document.querySelectorAll('.hidden');
var congratsEl = document.getElementById('congrats');
var highScores = document.getElementById('high-scores');
var splashEl = document.getElementById('splash');

// Global variables
// users score
var score = 0;
// refers to the number of questions in the quiz
var counter = 0;
// timer for the clock
var timeLeft = 60;
// the array for the shuffled questions
var shuffledQuestions = [];
// two arrays used for pulling random answers. This is working with exactly 4 possible answers per question
var numAnswers = [0, 1, 2, 3];
var ranAnswers = [];
// sets currentName to be a string
var currentName = "";

// questions array. Most questions were pulled from w3schools javascript quiz
// < and > were causing issues with the way I checked for a correct answer so I had to alter/remove any question where those symbols were possible answers
const questions = [
    {
      question: "Who invented JavaScript?",
      answers: [
        "Douglas Crockford",
        "Sheryl Sandberg",
        "Brendan Eich",
        "Some guy"
      ],
      correctAnswer: "Brendan Eich"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: [
        "Node.js",
        "TypeScript",
        "npm",
        "Some thing"
    ],
      correctAnswer: "npm"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: [
        "Angular",
        "jQuery",
        "RequireJS",
        "ESLint"
      ],
      correctAnswer: "ESLint"
    },

    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: [
        "js",
        "script",
        "javascript",
        "scripting"
      ],
      correctAnswer: "script"
    },

    {
      question: "What is the correct way to set a variable equal to the following DOM element: <p id = 'demo'>This is a demonstration.</p>?",
      answers: [
        "document.getElementById('demo')",
        "document.getElementById('p')",
        "document.getElementByName('p')",
        "#demo.innerHTML",
      ],
      correctAnswer: "document.getElementById('demo')",
    },

    {
      question: "Where is the correct place to insert a JavaScript?",
      answers: [
        "The body section",
        "The head section",
        "above the head section",
        "either in the head or the body sections"
      ],
      correctAnswer: "either in the head or the body sections"
    },

    {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      answers: [
        "script src='xxx.js'",
        "script href='xxx'.js'",
        "script name='xxx.js'",
        "script link='xxx.js'"
      ],
      correctAnswer: "script src='xxx.js'"
    },

    {
      question: "How do you write 'Hello World' in an alert box?",
      answers: [
        "msg('Hello World');",
        "msgBox('Hello World');",
        "alertBox('Hello World');",
        "alert('Hello World');"
      ],
      correctAnswer: "alert('Hello World');"
    },

    {
      question: "How do you create a function in JavaScript?",
      answers: [
        "function = myFunction()",
        "function: myFunction()",
        "function myFunction()",
        "myFunction()"
      ],
      correctAnswer: "function myFunction()"
    },

    {
      question: "How to write an IF statement in JavaScript?",
      answers: [
        "if i = 5",
        "if (i === 5)",
        "if (i === 5) then",
        "if i = 5 then"
      ],
      correctAnswer: "if (i === 5)"
    },

    {
      question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
      answers: [
        "if (i <> 5)",
        "if i <> 5",
        "if (i != 5)",
        "if (i =! 5)"
      ],
      correctAnswer: "if (i != 5)"
    },

    {
      question: "How can you add a comment in a JavaScript?",
      answers: [
        "<!-- This is a comment -->",
        "This is a comment",
        "//This is a comment",
        "##This is a comment"
      ],
      correctAnswer: "//This is a comment"
    },

    {
      question: "What is the correct way to write a JavaScript array?",
      answers: [
        "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue)'",
        "var colors = (1: 'red', 2: 'green', 3: 'blue')",
        "var colors = ['red', 'green', 'blue']",
        "var colors = 'red', 'green', blue'"
      ],
      correctAnswer: "var colors = ['red', 'green', 'blue']"
    },

    {
      question: "How do you round the number 7.25, to the nearest integer?",
      answers: [
        "round(7.25)",
        "Math.round(7.25)",
        "Math.rnd(7.25)",
        "rnd(7.25)"
      ],
      correctAnswer: "Math.round(7.25)"
    },

  {
    question: "How can you detect the client's browser name?",
    answers: [
      "navigator: appName",
      "client.navName",
      "browser.name",
      "navigator: browser.name"
    ],
    correctAnswer: "navigator: appName"
  },

  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      "onmouseclick",
      "onchange",
      "onclick",
      "onmouseover",
    ],
    correctAnswer: "onclick"
  },

  {
    question: "How do you declare a JavaScript variable?",
    answers: [
      "v carName",
      "var carName",
      "variable carName",
      "carName = "
    ],
    correctAnswer: "var carName"
  },

  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      "X",
      "*",
      "=",
      "-"
    ],
    correctAnswer: "="
  },

  {
    question: "What will the following code return: Boolean(10 > 9)",
    answers: [
      "NaN",
      "true",
      "false",
      "undefined"
    ],
    correctAnswer: "true"
  },

  ];


// Random number function
  function randomNum(max) {
    return Math.floor(Math.random() * max);
  }


// starts the game
function start(){
    console.log('start function')
    //Hides the start button when the game begins. make sure to change the style at game over
    startEl.setAttribute('style', 'display: none') 
    splashEl.setAttribute('style', 'display: none');
    // resets the score
    score = 0;

    // sets the counter to 0 to start the game
    counter = 0;
    randomQuestion();
    displayQuestion();


    countdown();
    console.log(shuffledQuestions[0].question)

}

// function that displays the question
function displayQuestion() {

    console.log('displayQuestion function')
    console.log(`There are ${questions.length} questions total`)


      ranAnswers = shuffle(numAnswers);
      questionEl.textContent = shuffledQuestions[counter].question;
      console.log(`the counter is set at ${counter}`)
      
      // applies text to each of the answer buttons in random order as well as an event listener to check if the answer was correct
      for (i = 0; i < hiddenEl.length; i++) {
          hiddenEl[i].style.display = "block";
          answerEl[i].textContent = shuffledQuestions[counter].answers[ranAnswers[i]];
          answerEl[i].addEventListener('click', scoreCheck);
      
        };

};


// Timer function. Start on button press
function countdown() {
    
    console.log('countdown function')
    

    // currently the game doesn't end if you answer all the questions. I'm trying to figure out the best way to do that but until then I've just shortened the quiz time as a bandaid solution.
    timeLeft = 25;

    timerEl.textContent = "Time Left: " + timeLeft
    timerEl.style.fontSize = "xx-large";
    var timeInterval = setInterval(function(){

        //displays time left on screen
        timeLeft--;
        timerEl.textContent = "Time Left: " + timeLeft; 

        //when the time runs out, clear clock and then run the scoring functions
        if (timeLeft <= 0)  {
            clearInterval(timeInterval); 
            startEl.style.display = "block"
            timerEl.textContent = ""
            endGame();
        }

        
    }, 1000);

}


// shuffler function used for both questions and answers
// from https://tobiasljungstrom.net/blog/2019-07-26-array-of-sequential-numbers-in-js/
function shuffle(array) {

    console.log('shuffle function')
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    };
  
    return array;
  };



  //randomizes the question list
function randomQuestion() {
  
    console.log('randomQuestion function')
    shuffledQuestions = shuffle(questions);
    return shuffledQuestions;

  };


function scoreCheck(event) {

  console.log('scoreCheck function')
  if (event.srcElement.innerHTML === shuffledQuestions[counter].correctAnswer) {
      congratsEl.textContent = "Correct!";
      score++;
  }

  else {
    congratsEl.textContent = "Wrong!"
    timeLeft -= 5;
    }

  counter++;

  displayQuestion();
  console.log(`Your score is ${score}`);
  console.log(`The final count was ${counter}.`);

};

// renders high score to the page
function scoreRender() {

  console.log('scoreRender function')
  
  var ul = document.getElementById("high-scores");
  ul.innerHTML = '';

  if (hiScores.length > 0) {  
  hiScores.sort((a, b) => {
    return b.score - a.score;
  });
  
  for (let index = 0; (index < hiScores.length) && (index < 10); index++) {
    
    var li = document.createElement("li");
    
    li.appendChild(document.createTextNode(`${index + 1}: ${hiScores[index].score}   ${hiScores[index].name}`));
    ul.appendChild(li);
  }

  }
}


// ends game
function endGame() {
  
  console.log('endGame function')

  congratsEl.textContent = "Game over! Your final score was: " + score + ".";
      
  enterName();

  console.log(`The current player is: ${currentName}`);
  console.log(`The current score is: ${score}`)

  questionEl.textContent = "";

  // clears the answer buttons
  for (i = 0; i < hiddenEl.length; i++) {
    hiddenEl[i].style.display = "none";
  };


  let currentUser = {
      name: currentName,
      score: score
    }
  console.log(`The current player is: ${currentUser}`);

  hiScores.push(currentUser);

  window.localStorage.setItem("scoreList", JSON.stringify(hiScores));
  console.log(localStorage.getItem('scoreList'));
  scoreRender();
}

// a function for entering name
function enterName() {

  console.log('enterName function');
  currentName = prompt("Enter your name:");

  if (currentName === "") {
    alert('No name entered, please try again');
    enterName();
  }
  
}

// loads the hiScores from memory
var hiScores = JSON.parse(localStorage.getItem("scoreList"));
console.log(hiScores)

// checks to see if what was loaded is empty, if so assign to an empty array
if (hiScores === null) {
  var hiScores = [];
  console.log("no hi scores")
  console.log(hiScores)
}

else {
  // pulls hiScores from memory
  var hiScores = JSON.parse(localStorage.getItem("scoreList"));
  console.log(hiScores)
  }



scoreRender();
startEl.addEventListener('click', start);
