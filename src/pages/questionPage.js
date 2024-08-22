import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  SKIP_QUESTION_BUTTON_ID,
  CORRECT_ANSWER_BUTTON_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    if (currentQuestion.correct === key){
      answerElement.id = CORRECT_ANSWER_BUTTON_ID;
    }
    
    answersListElement.appendChild(answerElement);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
    
  document
  .getElementById(SKIP_QUESTION_BUTTON_ID)
  .addEventListener('click', skipQuestion);
    
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  if (quizData.currentQuestionIndex < quizData.questions.length) {
    initQuestionPage();
  } else {
    displayQuizEnd();
  }
};

const skipQuestion = () => {
  document.getElementById(CORRECT_ANSWER_BUTTON_ID).style.color = 'green';
};

const displayQuizEnd = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '<h1>Quiz Complete! Thank you for playing!</h1>';
}
