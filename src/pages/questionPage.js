import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';

let score = 0;
// let selected= null;

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  answersListElement.innerHTML = ''; // clear the answers list previously answered
  // render each answer

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);

    answersListElement.appendChild(answerElement);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
};

// expermenting with the handleAnswerClick function

const handleAnswerClick = (key) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  currentQuestion.selected = key;
  if (currentQuestion.selected === questions.correct) {
    score = score + 1;
  }
  //console.log(score);
}

// export const nextQuestion = () => {
//   quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

//   if (quizData.currentQuestionIndex < quizData.questions.length) {
//     initQuestionPage();
//   } else {
//     showFinalScore();
//   }
//   // initQuestionPage();
// }

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  if (quizData.currentQuestionIndex < quizData.questions.length) {
    initQuestionPage();
  } else {
    showFinalScore();
  }
  // initQuestionPage();
};

const showFinalScore = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = `<h1>Your final score is ${score}</h1>
  <button id="restart-button">Restart</button>`;
  document.getElementById('restart-button').addEventListener('click', () => {
    quizData.currentQuestionIndex = 0;
    score = 0;
    initQuestionPage();
  });

  // const finalScoreElement = document.createElement('h1');
  // finalScoreElement.innerText = `Your final score is ${score}`;
  // userInterface.appendChild(finalScoreElement);
}